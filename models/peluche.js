const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const pelucheSchema = new Schema({
    modelo:{
        type: String,
        required: true,
        index: {unique: true, dropDups: true}
    }
})

const Peluche = mongoose.model('peluche', pelucheSchema);
module.exports = Peluche;