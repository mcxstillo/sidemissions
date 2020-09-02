const express = require("express")
const bodyparser = require("body-parser")
const session = require("express-session")
const hbs = require("hbs")
const app= express()

const urlencoder = bodyparser.urlencoded({
    extended: false
})

const mongoose = require('mongoose');
const { json } = require('body-parser')
var options ={
    userNewUrlParser:true,
    useUnifiedTopology:true
};
mongoose.connect('mongodb://localhost/sidemissions', options)
        .then(() =>{ console.log('success'); },err =>{console.log(err);
});

var Schema = mongoose.Schema

const userSchema= new Schema({ 
  email:String,
  password:String,
  name:String,
  cpNumber:Number
})

const jobSchema= new Schema({ 
  title:String,
  jDesc:String,
  reward:Number,
  duration:String
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

  res.render("login.hbs",{
    email: JSON.parse(JSON.stringify(email)),
    password: JSON.parse(JSON.stringify(password)),
    uDesc: JSON.parse(JSON.stringify(uDesc)),

    title: JSON.parse(JSON.stringify(title)),
    jDesc: JSON.parse(JSON.stringify(jDesc)),
    reward: JSON.parse(JSON.stringify(reward)),
    duration: JSON.parse(JSON.stringify(duration))
  })
  
})
  db.once("open",()=>{ 
    console.log("connection Establish")
  })

app.post("/register",urlencoder,function(req,res){
    let email = req.body.email
    let password = req.body.pw
    let name = req.body.name
    let cpNumber = req.body.cpNumber

    let doc = new userModel({
      email:email,
      password:password,
      name: name,
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
       return res.render("register.hbs", {
          emailerror: "Email already taken"
        })
    }
  })
  
})


app.post("/login",urlencoder,function(req,res){



  userModel.findOne({'email': req.body.email, 'password': req.body.pw}, function(err,user){
    if(user) {
      console.log("Logged In!")
      res.render("home.hbs")
      // res.redirect("/")
    
    }else {
      console.log("Email and Password does not match")
      return res.render("login.hbs", {
        loginerror: "Email and Password does not match"
      })
    }
      
})
 
})

app.post("/createpost",urlencoder,function(req,res){
  let title = req.body.title
  let jDesc = req.body.jDesc
  let reward = req.body.reward
  let duration = req.body.duration
  let doc = new jobModel({
      title:title,
      jDesc:jDesc,
      reward:reward,
      duration:duration
  })
  doc.save(function(error,title){
      if(error){
          return console.error(error)
      }
      else{
          res.redirect("/")
          console.log(title+ "added")
      }
  })
  
})

app.listen(3000, function(){
  console.log("now listening to port 3000")
})