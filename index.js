const express = require("express")
const bodyparser = require("body-parser")
const session = require("express-session")
const path = require("path")
const exphbs = require("express-handlebars")
const hbs = require("hbs")
const app= express()

const urlencoder = bodyparser.urlencoded({
    extended: false
})


app.use(session({
  secret: "very secret",
  resave: false,
  saveUninitialized: true,
  cookie:{
      maxAge: 14 * 24 * 3600000
  }
}))


const mongoose = require('mongoose');
const { json } = require('body-parser')
var options ={
    useNewUrlParser:true,
    useUnifiedTopology:true
};

app.use(express.static(__dirname + '/'));
app.set('views', path.join(__dirname, 'views/'));
app.engine('hbs', exphbs.create({
    extname: 'hbs'
}).engine);
app.set('view engine', 'hbs');

mongoose.connect('mongodb://localhost/sidemissions', options)
        .then(() =>{ 
          console.log('success'); 
        },err =>{console.log(err);
});

var Schema = mongoose.Schema

const userSchema= new Schema({ 
  email:String,
  password:String,
  firstname: String,
  lastname: String,
  cpNumber:Number
})

const jobSchema= new Schema({ 
  title:String,
  jDesc:String,
  reward:Number,
  duration:String,
  category: String
})

const db=mongoose.connection
const userModel = mongoose.model('user', userSchema)
const jobModel= mongoose.model('job', jobSchema)


app.get("/",async function(req,res){
  var email= await userModel.find({})
  var password= await userModel.find({})
  var name= await userModel.find({})
  var cpNumber= await userModel.find({})

  var uDesc= await userModel.find({})

  var title= await jobModel.find({})
  var jDesc= await jobModel.find({})
  var reward= await jobModel.find({})
  var duration= await jobModel.find({})
  var category = await jobModel.find({})

  res.render("login.hbs",{
    layout: false,
    email: JSON.parse(JSON.stringify(email)),
    password: JSON.parse(JSON.stringify(password)),
    uDesc: JSON.parse(JSON.stringify(uDesc)),
    cpNumber: JSON.parse(JSON.stringify(cpNumber)),

    title: JSON.parse(JSON.stringify(title)),
    jDesc: JSON.parse(JSON.stringify(jDesc)),
    reward: JSON.parse(JSON.stringify(reward)),
    duration: JSON.parse(JSON.stringify(duration)),
    category: JSON.parse(JSON.stringify(category))
  })
  
})
  db.once("open",()=>{ 
    console.log("connection Establish")
  })

app.get("/login", function(req,res){
    res.render("login", {
        layout: false
    })
})

app.get("/register", function(req,res){
    res.render("register", {
        layout: false
    })
})

app.get("/create", function(req,res){
  res.render("create", {
      layout: false
  })
})

app.get("/search",function(req,res){
  let search = new RegExp (req.query.search,'gi')//g=global i=case insensitive
  
  jobModel.find({title: search}, function (err, data) {
    console.log(data)
      res.render("searchresults", {
          layout: false,
          result: JSON.parse(JSON.stringify(data))
      })
  })
})

app.get("/viewpage",function(req,res){
    console.log('viewpage sana')
      res.render("viewpage", {
          layout: false,
        
      })
})

app.post("/register",urlencoder,function(req,res){
    let email = req.body.email
    let password = req.body.pw
    let firstname = req.body.firstname
    let lastname = req.body.lastname
    let cpNumber = req.body.cpNumber

    let doc = new userModel({
      email:email,
      password:password,
      firstname: firstname,
      lastname: lastname,
      cpNumber: cpNumber
    })


  userModel.findOne({'email': req.body.email}, function(err,user) {
    if (!user) {
      console.log('avail')
      doc.save(function(error,user) {
        if(error) 
         return console.error(error)
        else{
          console.log(user+ "added????")
        
          res.redirect("/")
        }
      })
    }else {
       res.render("register.hbs", {
          layout: false,     
          emailerror: "Email already taken"
        })
    }
  })
  
})


app.post("/login",urlencoder,function(req,res){

  userModel.findOne({'email': req.body.email, 'password': req.body.pw}, function(err,user){
    if(user) {
      console.log("Logged In!")
      res.render("index.hbs", {
        layout: false
    })
      // res.redirect("/")
    
    }else {
      console.log("Email and Password does not match")
      res.render("login.hbs", {
        layout: false,
        loginerror: "Email and Password does not match"
      })
    }
      
})
 
})

app.post("/create",urlencoder,function(req,res){
  let title = req.body.title
  let jDesc = req.body.jDesc
  let reward = req.body.reward
  let duration = req.body.duration
  let category = req.body.category

  console.log(req.body)
  let doc = new jobModel({
      title:title,
      jDesc:jDesc,
      reward:reward,
      duration:duration,
      category:category
  })

  console.log(doc)

  doc.save(function(error,title){
      if(error){
          return console.error(error)
      }
      else{
          res.render("create.hbs", {
            layout: false
          })
          console.log(title+ "added")

      }
  }) 
})


app.listen(3000, function(){
  console.log("now listening to port 3000")
})