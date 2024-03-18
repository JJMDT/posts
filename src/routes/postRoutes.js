const express = require("express");
const router = express.Router();
//importamos el controlador
const postController = require('../controllers/postController')
const {isLoggedIn, isLoggedOut} = require('../middlewares/auth')


module.exports = router