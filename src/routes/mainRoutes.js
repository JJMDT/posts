const express = require("express");
const router = express.Router();
//importamos el controlador
const mainControllers = require('../controllers/mainControllers')

//creamos las rutas y su controlador

router.get('/', mainControllers.home);
router.get('/contact', mainControllers.contact)


module.exports = router