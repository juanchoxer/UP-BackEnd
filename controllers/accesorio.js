require('mongoose');
const Accesorio = require('../models/accesorio');

const addAccesorio = async (nombre) => {  
    console.log(`Intentando crear accesorio con nombre: ${nombre}`)
    const accesorio = new Accesorio(
        {              
            nombre: nombre
        }
    );

    let dbAccesorio = await accesorio.save(); 
    console.log(dbAccesorio);
    return { dbAccesorio }; 
}   

const getAllAccesorios = async (limit,offset) => {
    const accesorios = await Accesorio.find({}).limit(limit).skip(offset);
    return accesorios;
}



module.exports = { addAccesorio, getAllAccesorios }