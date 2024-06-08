const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
const http = require("http").createServer(app);

require('dotenv').config();
const PORT = process.env.PORT || 8050;

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.ConnectionString;

const ColorController = require('./controllers/color');
const PelucheController = require('./controllers/peluche');
const AccesorioController = require('./controllers/accesorio');
const UsuarioController = require('./controllers/usuario');
const AuthController = require('./controllers/auth');
const RankingController = require('./controllers/ranking');

const Middleware = require('./middleware/auth');


const cors = require ("cors"); 
app.use(cors());
app.options('*', cors());

mongoose
    .connect(uri, {})
    .then(() => {
        console.log("connected");
    })
    .catch((err) => console.log(err));



//#region GET  publicos

app.get("/ranking", async (req, res) => {
    try {
        const results = await RankingController.getMasElegidos();
        res.status(200).json(results);
    } catch (error) {
        console.log(`error: ${error}`);
        res.status(500).send("Error. Intente mas tarde.")
    }
})

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

app.get("/colores", async (req, res) => {
    let limit = req.query.limit;
    let offset = req.query.offset;

    try {
        const results = await ColorController.getAllColores(limit, offset);
        res.status(200).json(results);

    } catch (error) {
        res.status(500).send("Error. Intente mas tarde.")
    }
})

app.get("/accesorios", async (req, res) => {
    let limit = req.query.limit;
    let offset = req.query.offset;
    try {
        const results = await AccesorioController.getAllAccesorios(limit, offset);
        res.status(200).json(results);

    } catch (error) {
        res.status(500).send("Error. Intente mas tarde.")
    }
})

//#endregion

//#region GET  privados

app.get("/pedidos", Middleware.verify, async (req, res) => {
    let limit = req.query.limit;
    let offset = req.query.offset;
    let userId = req.token.userId;
    try {
        const results = await UsuarioController.getPedidosByUserId(userId, limit, offset);
        res.status(200).json(results);
    } catch (error) {
        console.log(`error: ${error}`);
        res.status(500).send("Error. Intente mas tarde.")
    }
})

//#endregion

//#region POST publicos

app.post("/auth/login", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    try {
        const result = await AuthController.login(email, password);
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(401).send("Acceso no autorizado")
        }
    } catch (error) {
        console.log(`Error al intentar loguearse. Error: ${error}`)
        res.status(500).send("Error");
    }
})

//#endregion

//#region POST privados

app.post("/pedidos", Middleware.verify, async (req, res) => {
    let modelo = req.body.modelo.toLowerCase();
    let color = req.body.color.toLowerCase();
    let accesorio = req.body.accesorio.toLowerCase();
    let pedido = { modelo: modelo, color: color, accesorio: accesorio };
    let userId = req.token.userId;
    try {
        const result = await UsuarioController.addPedido(userId, pedido);
        if (result) {
            res.status(201).send(result);
        } else {
            res.status(422).send("Datos inválidos.")
        }
    } catch (error) {
        console.log(`Error al crear el pedido. Error: ${error}`)
        res.status(500).send("Error al crear el pedido.");
    }
})

//#endregion

//#region DELETE privados

app.delete("/pedidos", Middleware.verify, async (req, res) => {
    let pedidoId = req.body.pedidoId;
    let userId = req.token.userId;
    try {
        const result = await UsuarioController.removePedido(userId, pedidoId);
        if (result) {
            res.status(200).send(result); 
        } else {
            res.status(422).send("Datos inválidos.")
        }
    } catch (error) {
        console.log(`Error al eliminar el pedido. Error: ${error}`)
        res.status(500).send("Error al eliminar el pedido."); 
    }
})

//#endregion

//#region POST no accesibles - Comentados porque no quiero que sean accesibles incluso con un token

// app.post("/usuarios", async (req, res) => {
//     let email = req.body.email.toLowerCase();
//     let password = req.body.password;
//     try {
//         const result = await UsuarioController.addUsuario(email, password);
//         if (result) {
//             res.status(201).send(result);
//         }
//         else {
//             res.status(409).send("El usuario ya existe");
//         }
//     } catch (error) {
//         console.log(`Error al crear el usuario. Error: ${error}`)
//         res.status(500).send("Error al crear el usuario.");
//     }
// });

// app.post("/peluches", async (req, res) => {
//     let modelo = req.body.modelo.toLowerCase();
//     try {
//         const result = await PelucheController.addPeluche(modelo);
//         if (result) {
//             res.status(201).send("Peluche creado correctamente");
//         }
//     } catch (error) {
//         console.log(`Error al crear el peluche. Error: ${error}`)
//         res.status(500).send("Error al crear el peluche.");
//     }
// });

// app.post("/accesorios", async (req, res) => {
//     let nombre = req.body.nombre.toLowerCase();
//     try {
//         const result = await AccesorioController.addAccesorio(nombre);
//         if (result) {
//             res.status(201).send(result);
//         }
//     } catch (error) {
//         console.log(`Error al crear el accesorio. Error: ${error}`)
//         res.status(500).send("Error al crear el accesorio.");
//     }
// });


// app.post("/colores", async (req, res) => {
//     let nombre = req.body.nombre.toLowerCase();
//     try {
//         const result = await ColorController.addColor(nombre);
//         if (result) {
//             res.status(201).send(result);
//         }
//     } catch (error) {
//         console.log(`Error al crear el color. Error: ${error}`)
//         res.status(500).send("Error al crear el color.");
//     }
// });

//#endregion

app.listen(PORT, () => {
    console.log(`Servidor levantado ${PORT}`)
})

