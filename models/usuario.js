const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const usuarioSchema = new Schema({

    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    esActivo:{
        type: Boolean,
        required: true
    },
    pedidos:{
		type: Array,
		required:false,
		//default: ['user']
	}

})

const Usuario = mongoose.model('usuario', usuarioSchema);
module.exports = Usuario;