const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
const http = require("http").createServer(app);

require('dotenv').config();
const PORT = process.env.PORT || 8050;

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.ConnectionString;

const PelucheController = require('./controllers/peluche');
// const UserController = require('./controllers/user');
// const AuthController = require('./controllers/auth');


mongoose
    .connect(uri, {})
    .then(() => {
        console.log("connected");
    })
    .catch((err) => console.log(err));



//#region GET endpoints

app.get("/peluches", async (req, res) => {
    let limit = req.query.limit;
    let offset = req.query.offset;

    try {
        const results = await PelucheController.getAllPeluches(limit, offset);
        res.status(200).json(results);

    } catch (error) {
        res.status(500).send("Error. Intente mas tarde.")
    }
})

app.get("/colores", (req, res) => {
    let colores = [
        { id: 1, nombre: 'Rosa' },
        { id: 2, nombre: 'Amarillo' },
        { id: 3, nombre: 'Verde' },
    ];
    res.json({ 'colores': colores })
})

app.get("/accesorios", (req, res) => {
    let colores = [
        { id: 1, nombre: 'Futbol' },
        { id: 2, nombre: 'Guitarra' },
        { id: 3, nombre: 'Notebook' },
    ];
    res.json({ 'accesorios': colores })
})

app.get("/pedidos/:id", (req, res) => { // ejemplo de getById
    let id = req.params.id;
    console.log(id);
    res.json({ 'request': id })
})

//#endregion

//#region POST endpoints

app.post("/peluches", async (req, res) => {
    let nombre = req.body.nombre;
    try {
        const result = await PelucheController.addPeluche(nombre);
        if (result) {
            res.status(201).send("Peluche creado correctamente"); // 201
        }
    } catch (error) {
        console.log(`Error al crear el peluche. Error: ${error}`)
        res.status(500).send("Error al crear el peluche."); //500
    }
});



app.post("/pedidos", (req, res) => { // ejemplo de post
    let datos = req.body;
    console.log(datos);
    // Crear pedido en base al request
    res.json({ 'respuesta': 'Pedido creado' })
})

app.post("/login", (req, res) => { // ejemplo de post
    let datos = req.body;
    console.log(datos);
    // Loguear comparando contra la base
    res.json({ 'respuesta': 'Login exitoso' })
})


app.listen(PORT, () => {
    console.log(`Servidor levantado ${PORT}`)
})

//#endregion