const express = require("express");
const app = express();
app.use(express.json());
const http = require ("http").createServer(app);

require('dotenv').config();
const PORT = process.env.PORT || 8050;

//#region GET endpoints

app.get("/peluches",(req,res) => {
    let peluches = [ // ejemplo de formato a devolver, cambiar por bd
        { id: 1, nombre: 'Perro' },
        { id: 2, nombre: 'Conejo' },
        { id: 3, nombre: 'Oso' },
        { id: 4, nombre: 'Mapache' },
        { id: 5, nombre: 'Gato' },
    ];
    res.json({'peluches':peluches})
})

app.get("/colores",(req,res) => {
    let colores = [
        { id: 1, nombre: 'Rosa' },
        { id: 2, nombre: 'Amarillo' },
        { id: 3, nombre: 'Verde' },
    ];
    res.json({'colores':colores})
})

app.get("/accesorios",(req,res) => {
    let colores = [
        { id: 1, nombre: 'Futbol' },
        { id: 2, nombre: 'Guitarra' },
        { id: 3, nombre: 'Notebook' },
    ];
    res.json({'accesorios':colores})
})

app.get("/pedidos/:id", (req,res) => { // ejemplo de getById
    let id = req.params.id;
    console.log(id);
    res.json({'request':id})
})

//#endregion

//#region POST endpoints
app.post ("/pedidos",(req,res) => { // ejemplo de post
    let datos = req.body;
    console.log(datos);
    // Crear pedido en base al request
    res.json({'respuesta':'Pedido creado'})
})

app.post ("/login",(req,res) => { // ejemplo de post
    let datos = req.body;
    console.log(datos);
     // Loguear comparando contra la base
    res.json({'respuesta':'Login exitoso'})
})


app.listen(PORT,() => {
    console.log(`Servidor levantado ${PORT}`)
})

//#endregion