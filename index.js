const express = require ("express");
const app = express();
const path = require('path')
const bodyParser = require('body-parser')
const PORT =5000
const { body, validationResult } = require('express-validator');

// configuramos engine template y configuramos la ruta de la carpeta views
app.set('view engine','ejs')
app.set('views',path.resolve(__dirname,'./src/views'))

// configuramos body-parser para recibir los datos que son enviados a una ruta POST
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

//middlerware global para express-validator
app.use((req,res,next) =>{
    res.body = body
    res.validationResult = validationResult
    next()
})

// importamos las rutas que vamos a utilizar
const mainRoutes = require('./src/routes/mainRoutes')
const authRoutes = require('./src/routes/authRoutes')

app.use('/', mainRoutes)
app.use('/auth', authRoutes)

app.listen(PORT , ()=>{
    console.log(`corriendo en http://localhost:${PORT}`)
})