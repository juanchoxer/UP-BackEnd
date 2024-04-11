const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const accesorioSchema = new Schema({
    nombre:{
        type: String,
        required: true,
        index: {unique: true, dropDups: true}
    }
})

const Accesorio = mongoose.model('accesorio', accesorioSchema);
module.exports = Accesorio;