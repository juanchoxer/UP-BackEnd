require('mongoose');
const Usr = require('../models/user');


const addUser = async (email, password) => {
    let existUser = await Usr.findOne({ email: email });
    if (!existUser) {
        const cryptoPass = require('crypto')
            .createHash('sha256')
            .update(password)
            .digest('hex');

        const usr = new Usr(
            {
                email: email,
                password: cryptoPass,
                isActive: true
            }
        );

        let user = await usr.save();
        console.log(user);
        return { user };
    } else {
        return false;
    }
}

const getAllUsers = async (limit, offset) => {
    const users = await Usr.find({}).limit(limit).skip(offset);
    return users; // verificar que no devuelva los passwords
}

const getUser = async (id) => {
    const user = await Usr.findById(id);
    return user;
}

const editUser = async (user) => {
    const result = await Usr.findByIdAndUpdate(user._id, user, { new: true });
    return result;
}

const editRoles = async (roles, id) => {
    const result = await Usr.findByIdAndUpdate(id, { $set: { roles: roles } }, { new: true });
    return result;
}

const deleteUser = async (id) => {

    const result = await Usr.findByIdAndDelete(id);

    return result;
}

module.exports = { addUser, getAllUsers, getUser, editUser, editRoles, deleteUser }