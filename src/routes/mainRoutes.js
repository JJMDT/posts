const express = require("express");
const router = express.Router();
//importamos el controlador
const mainControllers = require('../controllers/mainControllers')
const postController = require('../controllers/postController')
const {isLoggedIn, isLoggedOut} = require('../middlewares/auth')

//creamos las rutas y su controlador

router.get('/',isLoggedOut, mainControllers.home);
router.get('/contact', mainControllers.contact)
router.get('/profile',isLoggedIn, mainControllers.profile);
router.get('/allPosts', mainControllers.allPosts)
router.get('/post/:id', postController.post)
router.post('/post/:id/add', postController.addComment)




module.exports = router