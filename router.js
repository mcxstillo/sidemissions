const express = require("express")
const router = express.Router()

const controller = require('./controllers/function')

router.get('/', controller.getHome)
router.get('/register', controller.getRegister)
router.get('/create', controller.getCreate)
router.get('/login', controller.getLogin)
router.get('/search', controller.getSearch)
router.get('/profile', controller.getProfile)
router.get('/filtered', controller.getFilter)
router.get('/index_sesh',controller.getIndexSesh)
router.post('/apply/:_id',controller.postApply) //add sa function

router.get('/viewpage/:_id', controller.getViewPage)
router.get('/signout', controller.getSignOut)
router.get('/categorysearch/:jobCategory', controller.getCatSearch)
router.get('/editprofile', controller.getEditProfile)

router.post('/updateprofile', controller.postUpdateProfile)
router.post('/addskill', controller.postAddSkill)
router.get('/manage_posts', controller.getManagePosts)
router.get('/mission_log', controller.getMissionLog)
router.post('/register', controller.postRegister)

router.post('/login', controller.postLogin)
router.post('/create', controller.postCreate)
router.post('/register', controller.postRegister)
router.post('/deletepost', controller.postDeletePost)

router.get('/applicants/:_id', controller.getViewApplicants)
router.post('/accepteduser', controller.postAcceptApplicant)
router.get('/editjob/:_id',controller.getEditJob)
router.post('/updatejob', controller.postUpdateJob)
router.post('/rating', controller.postRating)

module.exports = router