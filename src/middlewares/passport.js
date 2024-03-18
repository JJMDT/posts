const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const pool = require("../database/connect");
const securityPassword =require('../middlewares/securityUtils')

// Definir la estrategia local.login
passport.use(
  "local.login",
  new LocalStrategy(
    {
      usernameField: "user",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, user,password, done) => {
        console.log(req.body)
        const rows = await pool.query('SELECT * FROM users where user = ?', [user])
        if ( rows.length > 0){ //si rows tiene mas de un resultado
            const user = rows[0] //guarda el 1 resultado
            const validPassword = await securityPassword.validatePassword(password,user.password)
            if(validPassword){
                console.log('bienvenido')
                done(null,user,req.flash('bienvenido'))
            }else {
                console.log('password incorrecto')
                done(null,false,req.flash('password incorrecto'))
            }
        } else {
            console.log('no existe el usuario')
            return done(null,false, req.flash('el usuario no existe'))
        }
       
      // Lógica de autenticación aquí
    }
  )
);


passport.serializeUser((user, done) => {
    done(null, user.id_user); // Asegúrate de que el campo sea único para cada usuario
  });
  
  passport.deserializeUser(async (id, done) => {
    try {
      const rows = await pool.query('SELECT * FROM users WHERE id_user = ?', [id]);
      const user = rows[0];
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  });
  
  
