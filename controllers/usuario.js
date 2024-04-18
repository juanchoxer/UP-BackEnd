require('mongoose');
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

// PROBAR EL RANKING!!!! LO ESCRIBIR PERO NO LO PROBEEEE
const addPedido = async (userId, pedido) => {
    let existePeluche = await Peluche.findOne({ modelo: pedido.modelo });
    let existeColor = await Color.findOne({ nombre: pedido.color });
    let existeAccesorio = await Accesorio.findOne({ nombre: pedido.accesorio });

    if (existePeluche && existeColor && existeAccesorio) {
        let dbUsuario = await Usuario.findByIdAndUpdate( userId, { $push: { pedidos: pedido } }, { new: true, runValidators: true });
        
        let existeRanking = await Ranking.findOne({ modelo: pedido.modelo });
        if (existeRanking) {
            await existeRanking.update({ $push: { cuenta: cuenta++ } }, { new: true, runValidators: true });
        } else {
            const ranking = new Ranking(
                {
                    modelo: pedido.modelo,
                    esActivo: true,
                    cuenta: 1
                }
            );

            let dbRanking = await ranking.save();
            console.log(dbRanking);
        }


        return { dbUsuario, dbRanking };
    } else {
        console.log(`existePeluche: ${existePeluche} - existeColor: ${existeColor} - existeAccesorio: ${existeAccesorio}`)
        return false;
    }
}

const removePedido = async (userId, pedidoId) => {
    let dbUsuario = await Usuario.findById(userId);
    dbUsuario.pedidos.id(pedidoId).deleteOne();
    return dbUsuario.save();
}

const getPedidosByUserId = async (userId, limit, offset) => {
    let pedidos = await Usuario.findById(userId, 'pedidos').limit(limit).skip(offset);
    return pedidos;
}


module.exports = { addUsuario, addPedido, removePedido, getPedidosByUserId };