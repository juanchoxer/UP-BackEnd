require('mongoose');
const Pedido = require('../models/pedido');

const addPedido = async (userId, peluche, color, accesorio) => {

    const pedido = new Pedido(
        {
            userId: userId,
            peluche: peluche,
            color: color,
            accesorio: accesorio,
            isActive: true
        }
    );

    let dbPedido = await pedido.save();
    console.log("pedido nuevo");
    console.log(dbPedido);
    return { dbPedido };
}

const getAllPedidos = async (limit, offset) => {
    const pedidos = await Pedido.find({}).limit(limit).skip(offset);
    return pedidos;
}



module.exports = { addPedido, getAllPedidos }