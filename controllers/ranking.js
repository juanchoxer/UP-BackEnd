require('mongoose');
const Ranking = require('../models/ranking');

const getMasElegidos = async () => {
    const masElegidos = await Ranking.aggregate([
        { $match: { esActivo: true } },
        { $addFields: { contadorPedidos: { $size: "$pedidos" } } },
        { $sort: { contadorPedidos: -1 } }, // -1 significa orden descendiente
        { $limit: 3 },
        { $project: { _id: 0, modelo: 1, contadorPedidos: 1 } }
    ]);
    return masElegidos;
}



module.exports = { getMasElegidos }