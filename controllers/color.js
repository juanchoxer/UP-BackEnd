require('mongoose');
const Color = require('../models/color');

const addColor = async (nombre) => {  
    console.log(`Intentando crear color con nombre: ${nombre}`)
    const color = new Color(
        {              
            nombre: nombre
        }
    );
    let dbColor = await color.save(); 
    console.log(dbColor);
    return { dbColor }; 
}   

const getAllColores = async (limit,offset) => {
    const peluches = await Color.find({}).limit(limit).skip(offset);
    return peluches;
}



module.exports = { addColor, getAllColores }