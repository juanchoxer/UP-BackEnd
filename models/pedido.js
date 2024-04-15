const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const pedidoSchema = new Schema({

	userId: {
		type: Schema.Types.ObjectId,
        ref: 'Usuario',
		required: true,
	},
	peluche: {
        type: Schema.Types.ObjectId,
        ref: 'Peluche',
        required: true
    },
	accesorio: {
		type: Schema.Types.ObjectId,
		ref: 'Accesorio',
		required: false
	},
	isActive: {
		type: Boolean,
		required: true
	}

});


const Pedido = mongoose.model('pedido', pedidoSchema);
module.exports = Pedido;