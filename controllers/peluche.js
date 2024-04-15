require('mongoose');
const Peluche = require('../models/peluche');

const addPeluche = async (modelo, color) => {  
    console.log(`Intentando crear peluche con modelo ${modelo} y color ${color}`)
    const peluche = new Peluche(
        {              
            modelo: modelo,
            color: color
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