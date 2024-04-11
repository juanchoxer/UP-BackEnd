const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const userSchema = new Schema({

    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    pedidos:{
		type: Array,
		required:false,
		//default: ['user']
	}

})

const User = mongoose.model('user', userSchema);
module.exports = User;