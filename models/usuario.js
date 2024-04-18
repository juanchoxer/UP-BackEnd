const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const usuarioSchema = new Schema({

    email:{
        type: String,
        required: true,
        index: {unique: true, dropDups: true}
    },
    password:{
        type: String,
        required: true
    },
    esActivo:{
        type: Boolean,
        required: true
    },
    pedidos: [{ 
        modelo:{
            type: String,
            required: true
        },
        color:{
            type: String,
            required: true
        },
        accesorio: {
            type: String,
            required: true
        }
    }]

})

const Usuario = mongoose.model('usuario', usuarioSchema);

module.exports = Usuario;