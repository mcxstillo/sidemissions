const express = require("express")
const bodyparser = require("body-parser")
const session = require("express-session")
const path = require("path")
const exphbs = require("express-handlebars")
const hbs = require("hbs")
const app= express()
const {userModel} = require("./models/user.js")
const {jobModel} = require("./models/job.js")

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

// const userSchema= new Schema({ 
//   email:String,
//   password:String,
//   firstname: String,
//   lastname: String,
//   cpNumber:String
// })

// const jobSchema= new Schema({ 
//   title:String,
//   jDesc:String,
//   reward:Number,
//   duration:String,
//   category: String
// })

const db=mongoose.connection
// const userModel = mongoose.model('user', userSchema)
// const jobModel= mongoose.model('job', jobSchema)


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

  
  if(req.session.user){
    // console.log(req.session.user)
    res.render("index_sesh.hbs",{
      layout: false, 
      firstName: req.session.user.firstName
    })
  }else{
    res.render("index.hbs",{
      layout: false
    })}
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
  if(req.session.user){
    res.render("create", {
      layout: false
  })
  }
})

app.get("/search",function(req,res){
  let search = new RegExp (req.query.search,'gi')//g=global i=case insensitive
  
  if(req.session.user){
    jobModel.find({jobTitle: search},function (err, data) {
      // console.log(data)
        res.render("searchresults", {
          layout: false,
          searchquery: req.query.search,
          firstName: req.session.user.firstName,
          result: JSON.parse(JSON.stringify(data))
      })
    }).populate("jobCreator")
  }else{
    res.render('index.hbs',{
      layout: false
    })
  }
  

  
})

app.get('/filtered',function(req,res){
  let search = new RegExp (req.query.search,'gi');
  let filters = {jobTitle: search};
  
  if (!!req.query.min && !!req.query.max)
      filters['chargeRate'] = {
          $gte: Number.parseInt(req.query.min),
          $lte: Number.parseInt(req.query.max)
      };
  if (!!req.query.jobDuration) 
    filters['jobDuration'] = req.query.jobDuration;
  if (!!req.query.jobCategory) 
    filters['jobCategory'] = req.query.jobCategory;

    if(req.session.user){
  jobModel.find(filters,function (err, data) {
    console.log(data)
      res.render("searchresults", {
          layout: false,
          searchquery: req.query.search,
          firstName: req.session.user.firstName,
          result: JSON.parse(JSON.stringify(data))
      })
  })
  }else{
    res.render('index.hbs',{
      layout: false
    })
  }
})

app.get("/viewpage/:_id",function(req,res){

  if(req.session.user){
      jobModel.findOne({_id:req.params._id},function (err, data) {
        // console.log(data.jobCreator.firstName)
          res.render("viewpage", {
              layout: false,
              firstName: req.session.user.firstName,
              jobCreatorfirstName: data.jobCreator.firstName,
              jobCreatorlastName: data.jobCreator.lastName,
              jobCreatorContactNum: data.jobCreator.contactNum,
              jobCreatorEmail: data.jobCreator.email,
              result: JSON.parse(JSON.stringify(data))
          })
          // console.log(result);


      }).populate("jobCreator")


      // jobModel.find({jobTitle: search},function (err, data) {
      //   // console.log(data)
      //     res.render("searchresults", {
      //       layout: false,
      //       searchquery: req.query.search,
      //       firstName: req.session.user.firstName,
      //       result: JSON.parse(JSON.stringify(data))
      //   })
      // }).populate("jobCreator")


    }else{
      res.render('index.hbs',{
        layout: false
      })
    }
})

app.get("/signout",function(req,res){
  console.log('signout')
  req.session.destroy();
  res.redirect("/")
})

app.get("/categorysearch/:jobCategory",function(req,res){
  console.log(JSON.stringify(req.params.jobCategory))
  if(req.session.user){
  jobModel.find({jobCategory: req.params.jobCategory},function (err, data) {
  
      res.render("searchresults", {
        layout: false,
        firstName: req.session.user.firstName,
        result: JSON.parse(JSON.stringify(data))
    })
  }).populate("jobCreator")
  }else{
    res.render('index.hbs',{
      layout: false
    })
  }

})

app.get("/profile",function(req,res){

  if(req.session.user){
    userModel.findOne({'_id': req.session.user._id},function (err, data) {
        res.render("profile", {
          layout: false,
          firstName: req.session.user.firstName,
          lastName: req.session.user.lastName,
          // userDesc: req.session.user.userDesc,
          email: req.session.user.email,
          contactNum: req.session.user.contactNum,
          result: JSON.parse(JSON.stringify(data))
      })
    })

    }else{
      res.render('index.hbs',{
        layout: false
      })
    } 

})

app.post("/register",urlencoder,function(req,res){
    let email = req.body.email
    let password = req.body.password
    let firstName = req.body.firstName
    let lastName = req.body.lastName
    let contactNum = req.body.contactNum

    let doc = new userModel({
      email:email,
      password:password,
      firstName: firstName,
      lastName: lastName,
      contactNum: contactNum
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

  userModel.findOne({'email': req.body.email, 'password': req.body.password}, function(err,user){
    if(user) {
      req.session.user=user
      console.log("Logged In!")
      res.render("index_sesh.hbs", {
        layout: false,
        firstName: req.session.user.firstName
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
  let jobTitle = req.body.jobTitle
  let jobDesc = req.body.jobDesc
  let chargeRate = req.body.chargeRate
  let jobDuration = req.body.jobDuration
  let jobCategory = req.body.jobCategory
  let jobSkills = req.body.jobSkills

  // console.log(req.body)

// console.log(JSON.stringify(req.body.jobSkills))
  
  let doc = new jobModel({
    jobTitle:jobTitle,
    jobCreator: req.session.user,
    jobDesc:jobDesc,
    chargeRate:chargeRate,
    jobDuration:jobDuration,
    jobCategory:jobCategory,
    jobSkills: jobSkills.split(',')
  })

  
  // console.log(doc)
  // console.log(jobCreator)

  doc.save(function(error,title){
      if(error){
          return console.error(error)
      }
      else{
          res.render("create.hbs", {
            layout: false,
            
          })
          console.log(title+ "added")
      }
  }) 

  
})


app.listen(3000, function(){
  console.log("now listening to port 3000")
})