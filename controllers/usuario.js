const mongoose = require('mongoose');
const Usuario = require('../models/usuario');
const Peluche = require('../models/peluche');
const Color = require('../models/color');
const Ranking = require('../models/ranking');
const Accesorio = require('../models/accesorio');


const addUsuario = async (email, password) => {
    let existUser = await Usuario.findOne({ email: email });
    if (!existUser) {
        const cryptoPass = require('crypto').createHash('sha256').update(password).digest('hex');

        const usuario = new Usuario(
            {
                email: email,
                password: cryptoPass,
                esActivo: true
            }
        );

        let dbUsuario = await usuario.save();
        console.log(dbUsuario);
        return { dbUsuario };
    } else {
        return false;
    }
}

const addPedido = async (userId, pedido) => {
    let existePeluche = await Peluche.findOne({ modelo: pedido.modelo });
    let existeColor = await Color.findOne({ nombre: pedido.color });
    let existeAccesorio = await Accesorio.findOne({ nombre: pedido.accesorio });

    if (existePeluche && existeColor && existeAccesorio) {

        const pedidoId = new mongoose.Types.ObjectId();
        pedido._id = pedidoId;   
        await Usuario.findByIdAndUpdate( userId, { $push: { pedidos: pedido } }, { new: true, runValidators: true });        
        
        let resultado = await Ranking.findOneAndUpdate(
            { modelo: pedido.modelo, esActivo: true }, 
            { $push: { pedidos: [{ pedidoId: pedido._id }] } },
            { new: true, runValidators: true, upsert: true }
        );

        return pedido._id;

    } else {
        console.log(`Algo no existe - existePeluche: ${existePeluche} - existeColor: ${existeColor} - existeAccesorio: ${existeAccesorio}`)
        return false;
    }
}

const removePedido = async (userId, pedidoId) => {
    let dbUsuario = await Usuario.findById(userId);

    let dbPedido = dbUsuario.pedidos.id(pedidoId);
    let pedidoModelo = dbPedido.modelo;
    let rankingPedidoId = dbPedido.id;

    dbPedido.deleteOne();

    let dbRanking = await Ranking.findOne({ modelo: pedidoModelo });
    let dbPedidoRanking = dbRanking.pedidos.pull({pedidoId: rankingPedidoId});

    dbUsuario.save();
    dbRanking.save();

    return dbPedido;
}

const getPedidosByUserId = async (userId, limit, offset) => {
    let usuario = await Usuario.findById(userId).limit(1);
    let end = Number(limit)+Number(offset);
    let pedidos = usuario.pedidos.slice(offset, end);
    return pedidos;
}


module.exports = { addUsuario, addPedido, removePedido, getPedidosByUserId };