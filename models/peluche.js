const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const pelucheSchema = new Schema({
    modelo:{
        type: String,
        required: true
         // como hacer que el indice combine dos campos?
    },
    color:{
        type: String,
        required: true
        // como hacer que el indice combine dos campos?
    }
})

const Peluche = mongoose.model('peluche', pelucheSchema);
module.exports = Peluche;