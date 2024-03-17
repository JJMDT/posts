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
    async (req, user, password, done) => {
      console.log(req.body);
      try {
        const rows = await pool.query('SELECT * FROM users WHERE user = ?', [user]);
        if (rows.length > 0) {
          const userFromDb = rows[0];
          const validPassword = await securityPassword.validatePassword(password, userFromDb.password);
          if (validPassword) {
            console.log('bienvenido');
            // Establecer el usuario autenticado en la sesión
            req.session.user = userFromDb;
            done(null, userFromDb);
          } else {
            console.log('password incorrecto');
            done(null, false, req.flash('error', 'Contraseña incorrecta'));
          }
        } else {
          console.log('no existe el usuario');
          done(null, false, req.flash('error', 'Usuario no encontrado'));
        }
      } catch (error) {
        console.error('Error al consultar la base de datos:', error);
        done(error); // Manejar el error de la base de datos adecuadamente
      }
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
  
  
