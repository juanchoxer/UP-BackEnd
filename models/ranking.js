const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const rankingSchema = new Schema({

    modelo:{
        type: String,
        required: true,
        index: {unique: true, dropDups: true}
    },
    esActivo:{
        type: Boolean,
        required: true
    },
    pedidos: [{ 
        pedidoId:{
            type: String,
            required: true
        }
    }]

})

const Ranking = mongoose.model('ranking', rankingSchema);

module.exports = Ranking;