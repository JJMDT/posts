const securityPassword = require('../middlewares/securityUtils')
const pool = require('../database/connect')
const { body, validationResult } = require('express-validator');




module.exports = {
    login: async(req,res) => {
        res.render('auth/login')
    },
    register: async(req,res) => {
        res.render('auth/register')
    },
    registerPost: async (req, res) => {
        try {
          const errores = validationResult(req);
          if (!errores.isEmpty()) {
           // console.log(req.body);
            const valores = req.body;
            const validaciones = errores.array();
            return res.render('auth/register', { validaciones, valores });
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
            const existingUser = await pool.query('SELECT * FROM users WHERE email = ? OR user = ?', [trimmedValues.email, trimmedValues.user]);
      
            if (existingUser && existingUser.length > 0) {
              console.log('Ese usuario o email ya está registrado');
              return res.redirect('register'); // Puedes redirigir a una página de error de registro
            }
      
            const newPassword = await securityPassword.encryptPassword(password);
            const newUser = {
              name,
              lastname,
              email,
              user,
              password: newPassword,
            };
      
            const result = await pool.query('INSERT INTO users SET ?', [newUser]);
      
           // console.log('Usuario registrado con clave codificada', newUser);
            res.redirect('login');
          } catch (error) {
            console.log(error);
            res.redirect('register');
          }
        } catch (validationError) {
          console.log('Error de validación:', validationError);
          res.redirect('register');
        }
      },
      
    loginPost: async(req,res) => {
        console.log("usuario que inicia sesion", req.body)
        res.send('esta logueado')
    }
}