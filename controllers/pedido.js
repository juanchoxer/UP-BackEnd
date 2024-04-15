require('mongoose');
const Pedido = require('../models/pedido');

const addPedido = async (userId, peluche, accesorio) => {

    const pedido = new Pedido(
        {
            userId: userId,
            peluche: peluche,
            accesorio: accesorio,
            isActive: true
        }
    );
    let dbPedido = await pedido.save();
    console.log("pedido nuevo");
    return { dbPedido };
}

const getAllPedidos = async (limit, offset) => {
    const pedidos = await Pedido.find({}).limit(limit).skip(offset);
    return pedidos;
}



module.exports = { addPedido, getAllPedidos }