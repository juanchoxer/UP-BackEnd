require('dotenv').config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

require('mongoose');
const User = require('../models/usuario');
const jwt = require('jsonwebtoken');


const login = async (email, password) => {

    const cryptoPass = require('crypto')
        .createHash('sha256')
        .update(password)
        .digest('hex');

    const result = await User.findOne({ email: email, esActivo: true, password: cryptoPass })

    console.log(`resultado del findOut con email y clave: ${result}`)
    if (result) {
        const token = jwt.sign({ userId: result._id },JWT_SECRET_KEY, { expiresIn: '1h' });
        return token;
    }
    return null;

}

module.exports = { login }