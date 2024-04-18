require('mongoose');
const Peluche = require('../models/peluche');

const addPeluche = async (modelo) => { 
    const peluche = new Peluche(
        {              
            modelo: modelo
        }
    );

    let dbPeluche = await peluche.save(); 
    console.log("peluche nuevo");
    console.log(dbPeluche);
    return { dbPeluche }; 
}   

const getAllPeluches = async (limit,offset) => {
    const peluches = await Peluche.find({}).limit(limit).skip(offset);
    return peluches;
}



module.exports = { addPeluche, getAllPeluches }