const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const colorSchema = new Schema({
    nombre:{
        type: String,
        required: true,
        index: {unique: true, dropDups: true}
    }
})

const Color = mongoose.model('color', colorSchema);
module.exports = Color;