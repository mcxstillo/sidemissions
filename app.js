const express = require("express")
const bodyparser = require("body-parser")
const session = require("express-session")
const path = require("path")
const exphbs = require("express-handlebars")
const hbs = require("hbs")
const app= express()
const {userModel} = require("./models/user.js")
const {jobModel} = require("./models/job.js")

// const urlencoder = bodyparser.urlencoded({
//     extended: true
// })

//newly added paalis na lang if may nagtopak (added for update profile)
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    extended: true
}))

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


app.use('/', require("./router"))

app.listen(3000, function(){
  console.log("now listening to port 3000")
})
