require('mongoose');
const Peluche = require('../models/peluche');

const addPeluche = async (nombre) => {  
    console.log(`Intentando crear peluche con nombre: ${nombre}`)
    const peluche = new Peluche(
        {              
            nombre: nombre
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