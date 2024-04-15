require('mongoose');
const Usuario = require('../models/usuario');


const addUsuario = async (email, password) => {
    let existUser = await Usuario.findOne({ email: email });
    if (!existUser) {
        const cryptoPass = require('crypto')
            .createHash('sha256')
            .update(password)
            .digest('hex');

        const usuario = new Usuario(
            {
                email: email,
                password: cryptoPass,
                esActivo: true
            }
        );

        let dbUsuario = await usuario.save();
        console.log(dbUsuario);
        return { dbUsuario };
    } else {
        return false;
    }
}

// const getAllUsers = async (limit, offset) => {
//     const users = await Usuario.find({}).limit(limit).skip(offset);
//     return users; // verificar que no devuelva los passwords
// }

// const getUser = async (id) => {
//     const user = await Usuario.findById(id);
//     return user;
// }

// const editUser = async (user) => {
//     const result = await Usuario.findByIdAndUpdate(user._id, user, { new: true });
//     return result;
// }

// const editRoles = async (roles, id) => {
//     const result = await Usuario.findByIdAndUpdate(id, { $set: { roles: roles } }, { new: true });
//     return result;
// }

// const deleteUser = async (id) => {

//     const result = await Usuario.findByIdAndDelete(id);

//     return result;
// }

module.exports = { addUsuario }