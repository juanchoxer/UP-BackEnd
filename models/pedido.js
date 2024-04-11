const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const pedidoSchema = new Schema({

	userId: {
		type: String,
		required: true,
	},
	peluche: {
		type: String,
		required: true
	},
	color: {
		type: String,
		required: true
	},
	accesorio: {
		type: String,
		required: true
	},
	isActive: {
		type: Boolean,
		required: true
	}

});


const Pedido = mongoose.model('pedido', pedidoSchema);
module.exports = Pedido;