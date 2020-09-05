const mongoose = require("mongoose")

var Schema = mongoose.Schema

const jobSchema= new Schema({ 
  jobTitle:String,
  jobCreator: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
  jobDesc:String,
  jobCategory: String,
  jobDuration:String,
  jobSkills:[String],
  jobStatus:String,
  jobApplicants:[{type: mongoose.Schema.Types.ObjectId, ref: 'user'}],
  postDate: Date,
  chargeRate:Number,
  approvedUser: {type: mongoose.Schema.Types.ObjectId, ref: 'user'}
})

const jobModel = mongoose.model('job', jobSchema)

module.exports = {
  jobModel
}