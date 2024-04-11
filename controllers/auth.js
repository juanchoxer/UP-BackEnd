require('dotenv').config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

require('mongoose');
const User = require('../models/user');
const jwt = require('jsonwebtoken');


const login = async (email, password) => {

    const cryptoPass = require('crypto')
        .createHash('sha256')
        .update(password)
        .digest('hex');

    console.log(`email ${email}  y paswword  ${cryptoPass}`)
    const result = await User.findOne({ email: email, isActive: true, password: cryptoPass })

    if (result) {
        jwt.sign('payload',JWT_SECRET_KEY,'options');
        const token = jwt.sign({ foo: 'bar' }, JWT_SECRET_KEY);
        return token;
    }
    return null;

}

module.exports = { login }