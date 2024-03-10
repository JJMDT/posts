const express = require("express");
const router = express.Router();
//importamos el controlador
const mainControllers = require('../controllers/mainControllers')
const {isLoggedIn, isLoggedOut} = require('../middlewares/auth')

//creamos las rutas y su controlador

router.get('/',isLoggedOut, mainControllers.home);
router.get('/contact', mainControllers.contact)
router.get('/profile',isLoggedIn, mainControllers.profile);
router.get('/allPosts', mainControllers.allPosts)



module.exports = router