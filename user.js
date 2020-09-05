const mongoose = require("mongoose")

var Schema = mongoose.Schema

const userSchema= new Schema({ 
  email:String,
  password:String,
  firstName: String,
  lastName: String,
  contactNum:String,
  userDesc:String,
  skills:[String],
  upvote: Number,
  downvote:Number
})

const userModel = mongoose.model('user', userSchema)

module.exports = {
  userModel
}
    