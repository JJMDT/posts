const express = require('express');
const router = express.Router();
// importamos el controlador
const authControllers = require('../controllers/authControllers')
const { body, validationResult } = require('express-validator');


//creamos las rutas
router.get('/login', authControllers.login)
router.get('/register', authControllers.register)

router.post('/register',[
    body('name','ingrese name valido')
    .exists()
    .isLength({min:1}),

    body('lastname','ingrese lastname valido')
    .exists()
    .isLength({min:1}),

    body('email','ingrese un email valido')
    .exists()
    .isEmail(),


    body('user','ingrese un nombre de usuario')
    .exists()
    .isLength({min:1}),


    body('password','ingrese un password que incluya almenos 4 caracteres y un numero')
    .exists()
    .isLength({min:4})

],authControllers.registerPost)
router.post('/login', authControllers.loginPost)
module.exports = router