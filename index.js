const express = require ("express");
const session = require('express-session')
const path = require('path')
const bodyParser = require('body-parser')
const { body, validationResult } = require('express-validator');
const flash = require('connect-flash')
const mysqlStore = require('express-mysql-session')(session)
const morgan = require('morgan')
const passport = require('passport')
const dateStyle = require('./src/middlewares/dateTime')
const {database} = require('./src/database/keys'); 
const sessionStore = new mysqlStore(database)


//inicializacion
const app = express();
require('./src/middlewares/passport')
// configuramos engine template y configuramos la ruta de la carpeta views
app.set('view engine','ejs')
app.set('views',path.resolve(__dirname,'./src/views'))
//app.set('views', path.join(__dirname, 'views'));


//middlewares
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret:'post',
    resave:false,
    saveUninitialized:false,
    store: sessionStore
    
}))

app.use(flash())
app.use(morgan('dev'));
// configuramos body-parser para recibir los datos que son enviados a una ruta POST
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
//app.use(dateStyle)

//configuracion de passport

app.use(passport.initialize())
app.use(passport.session())


//variables globales
app.use((req,res,next) => {
    app.locals.success = req.flash('success');
    app.locals.user = req.user
  //  const idUser = req.user.id_user

    next();
})


//middlerware global para express-validator
app.use((req, res, next) => {
    app.locals.success = req.flash('success');
    req.flash('success', null); // Limpiar el mensaje flash
    next();
});

// importamos las rutas que vamos a utilizar
const mainRoutes = require('./src/routes/mainRoutes')
const authRoutes = require('./src/routes/authRoutes')
const adminRoutes = require('./src/routes/adminRoutes')
const postRoutes = require('./src/routes/postRoutes')

app.use('/', mainRoutes) //todas las rutas que comiences con /
app.use('/auth', authRoutes) //todas las rutas que comiencen con auth/
app.use('/admin', adminRoutes); //todas las rutas que comiencen con admin/
app.use('/post', postRoutes); //todas las rutas que comiencen con post/


// settings server
const PORT =5000

app.listen(PORT , ()=>{
    console.log(`corriendo en http://localhost:${PORT}`)
})