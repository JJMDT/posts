const securityPassword = require("../middlewares/securityUtils");
const pool = require("../database/connect");
const { body, validationResult } = require("express-validator");
const { error } = require("console");
const passport = require('passport')


module.exports = {
  login: async (req, res) => {
    res.render("auth/login");
  },
  register: async (req, res) => {
    res.render("auth/register");
  },

  registerPost: async (req, res) => {
    try {
      const errores = validationResult(req);
      if (!errores.isEmpty()) {
        // console.log(req.body);
        const valores = req.body;
        const validaciones = errores.array();
        return res.render("auth/register", { validaciones, valores });
      }

      const { name, lastname, email, user, password } = req.body;
      const trimmedValues = {
        name: name.trim(),
        lastname: lastname.trim(),
        email: email.trim(),
        user: user.trim(),
        password: password.trim(),
      };
      try {
        const existingUser = await pool.query(
          "SELECT * FROM users WHERE user = ? ",
          [ trimmedValues.user]
        );
        const existingEmail = await pool.query(
            "SELECT * FROM users WHERE email = ? ",
            [ trimmedValues.email]
          );

        if (existingUser && existingUser.length > 0) {
          errores.errors.push({
            param: "user",
            msg: "Este usuario ya esta registrado",
          });
          const valores = req.body;
          return res.render("auth/register", {
            validaciones: errores.array(),
            valores,
          }); // Puedes redirigir a una página de error de registro
        }else if (existingEmail && existingEmail.length > 0) {
                errores.errors.push({
                  param: "email",
                  msg: "Este email ya esta registrado",
                });
                const valores = req.body;
                return res.render("auth/register", {
                  validaciones: errores.array(),
                  valores,
                }); // Puedes redirigir a una página de error de registro
              
        }

        const newPassword = await securityPassword.encryptPassword(password);
        const newUser = {
          name,
          lastname,
          email,
          user,
          password: newPassword,
        };

        const result = await pool.query("INSERT INTO users SET ?", [newUser]);

        console.log('Usuario registrado con clave codificada', newUser);
        req.flash('success', '¡Registro exitoso! Puedes iniciar sesión ahora.');
        res.redirect("login");
      } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
      }
    } catch (validationError) {
      console.log("Error de validación:", validationError);
      res.render("auth/register");
    }
  },


  
  loginPost: async (req, res,next) => {
    //passport.autenticate me redirecciona al archivo donde esta la funcion  local.login
    
    passport.authenticate("local.login",{
        successRedirect: "/profile",
        failureRedirect: "/auth/login",
        failureFlash: true
    })(req, res, next);

  },
  logout: (req,res) => {
    req.logout(function (err) {
        if (err) {
            console.error(err);
        }
        res.redirect('/auth/login');
    });
}
};
