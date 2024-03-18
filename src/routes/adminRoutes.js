const express = require('express')
const router = express.Router()
const adminControllers = require('../controllers/adminControllers')
const {isLoggedIn, isLoggedOut} = require('../middlewares/auth')


router.get('/newPost',isLoggedIn, adminControllers.new)
router.post('/newPost', adminControllers.newPost)
router.get('/editPost/:id',isLoggedIn, adminControllers.editPostView)
router.post('/editPost/:id', adminControllers.editPost)
router.get('/deletePost/:id', isLoggedIn, adminControllers.deletePost)

module.exports = router