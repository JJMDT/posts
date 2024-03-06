const mysql = require("mysql");
require("dotenv").config(); //habilita a usar las variables que tenemos en .ENV
const { promisify } = require("util");

//creamos la conexion a la base de datos
const pool = mysql.createPool({
  host: process.env.DBHOST,
  user: process.env.DBUSER,
  password: process.env.DBPASSWORD,
  database: process.env.DBSCHEMA,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

pool.getConnection((error, connect) => {
  if (error) console.log("error en la conexion a la bbdd ", error);
  if (connect) {
    connect.release();
    console.log("conexion a la bbdd exitosa");
    return;
  }
});

// promisify te deja usar promesas
pool.query= promisify(pool.query)

module.exports = pool
