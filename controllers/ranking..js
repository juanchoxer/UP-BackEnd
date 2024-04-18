require('mongoose');
const Ranking = require('../models/ranking');

// PROBAR!!! Y LLAMAR EN VEZ DE LO DE USUARIO ADDPEDIDO
const addRanking = async (modelo) => { 
    let existeRanking = await Ranking.findOne({ modelo: pedido.modelo });
    if (existeRanking) {
       let dbRanking = await existeRanking.update({ $push: { cuenta: cuenta++ } }, { new: true, runValidators: true });
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
    return( dbRanking );
}   

// COMPLETAR Y LLAMAR!!
const getMasElegidos = async (limit,offset) => {
    //const peluches = await Peluche.find({}).limit(limit).skip(offset);
    //return peluches;
}



module.exports = { addPeluche, getAllPeluches }