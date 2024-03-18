const bcrypt = require('bcryptjs')
const securityUtils = {}

// funcion para encriptar password del usuario

securityUtils.encryptPassword = async(password) => {
    //generamos un SALT para aumentar la seguridad del hash
    const salt = await bcrypt.genSalt(10)
    // Generar el hash utilizando la contraseña y el salt que creamos
    const hashPassword = await bcrypt.hash(password,salt)
    return hashPassword
}

//funcion para comparar si el password es correcto

securityUtils.validatePassword = async(password,savedPassword) => {
    try {
        // comparamos el password dado con el que tenemos guardado
        return await bcrypt.compare(password,savedPassword)

    } catch (error) {
        //si hay un error lo mostramos
        console.log(error)
        
    }
}
module.exports = securityUtils