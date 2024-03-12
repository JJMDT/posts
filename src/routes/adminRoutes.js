const express = require('express')
const router = express.Router()
const adminControllers = require('../controllers/adminControllers')
const {isLoggedIn, isLoggedOut} = require('../middlewares/auth')


router.get('/newPost',isLoggedIn, adminControllers.new)
router.post('/newPost', adminControllers.newPost)

module.exports = router