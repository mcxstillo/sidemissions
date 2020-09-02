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
  uDesc:String
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
  var uDesc= await userModel.find({})

  var title= await jobModel.find({})
  var jDesc= await jobModel.find({})
  var reward= await jobModel.find({})
  var duration= await jobModel.find({})

  res.render("index.hbs",{
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
 
    let doc = new userModel({
      email:email,
      password:password
    })

  //   userModel.findOne({'email': email}, function(err,email){
  //     if(email) {
  //       console.log('not avail')
  //       res.redirect("/")
  //     }else {
  //       console.log('avail')
  //       doc.save(function(error,email){
  //           if(error){
  //               return console.error(error)
  //           }else{
  //               res.redirect("/")
  //               console.log(email+ "added????")
  //           }
  //       })
  //     }
  // })

  userModel.findOne({'email': req.body.email}, function(err,email) {
    if (!email) {
      console.log('avail')
      doc.save(function(error,email) {
        if(error) 
         return console.error(error)
        else{
          console.log(email+ "added????")
          res.redirect("/")
        }
      })
    }else if (req.body.email == ""||req.body.pw ==""){
      console.log("Please enter a username and password!")
      res.render("index.hbs",{
        emptyerror: "Please enter a username and password!"
      })
    }  else {
       return res.render("index.hbs", {
          emailerror: "Email already taken"
        })
      // console.log('not avail')
      // res.redirect("/")
    }
  })
  
})



app.post("/login",urlencoder,function(req,res){



  userModel.findOne({'email': req.body.email, 'password': req.body.pw}, function(err,user){
    if(user) {
      console.log("Logged In!")
      res.redirect("/")
    
    }else {
      console.log("Email and Password does not match")
      return res.render("index.hbs", {
        error: "Email and Password does not match"
      })
    }
      
})

  // if(!matches(req.body.email,req.body.pw)){
  //   console.log("Email and Password does not match")
  //   return res.render("index.hbs", {
  //     error: "Email and Password does not match"
  //   })
    
  // }else{
      
  // }
  
 
})

//you get an email and if merong pw na nagmmatch with it, pwede
// function matches(email,password) {
//   userModel.findOne({'email': email, 'password': password}, function(err,user){
//       if(user) {
//         console.log(email + ' ' + password + ' ' + "AUTHORIZED USER")
//         return true
//       }else {
//         console.log(email + ' ' + password + ' ' + "NOT AUTHORIZED USER")
//         return false
//       }
        
//   })
// }
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