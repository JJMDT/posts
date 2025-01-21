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
    .notEmpty(),

    body('lastname','ingrese lastname valido')
    .notEmpty(),


    body('email','ingrese un email valido')
    .isEmail(),


    body('user','ingrese un nombre de usuario')
    .notEmpty(),


    body('password','ingrese un password que incluya almenos 4 caracteres y un numero')
    .isLength({min:4}),
    
],authControllers.registerPost);

router.post('/login', authControllers.loginPost);
router.get('/logout', authControllers.logout)


module.exports = router