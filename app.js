const express = require("express")
const bodyparser = require("body-parser")
const session = require("express-session")
const path = require("path")
const moment = require("moment")
const exphbs = require("express-handlebars")
const hbs = require("hbs")
const app= express()
const {userModel} = require("./models/user.js")
const {jobModel} = require("./models/job.js")
require("dotenv").config()

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
    extname: 'hbs', 
    helpers:{
      skillsToStr: function(arr){
        return arr.join(", ");
      },
      formatDate: function(postDate){
        return moment(postDate).format("MMMM DD YYYY");
      },
      appRating: function(upvote,downvote){
    
        var x= upvote / (upvote + downvote) * 100;
        if(x)
        return x.toFixed(2);
        else
        return 0;
      }

    }
}).engine);



app.set('view engine', 'hbs');

mongoose.connect(`mongodb+srv://${process.env.DBUSER}:${process.env.DBPASS}@cluster0.gcjg9.mongodb.net/sidemissions?retryWrites=true&w=majority`, options)
        .then(() =>{ 
          console.log('success'); 
        },err =>{console.log(err);
});


app.use('/', require("./router"))

app.listen(process.env.PORT || 3000, function(){
  console.log("now listening to port 3000")
})
