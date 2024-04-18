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

const Middleware = require('./middleware/auth');


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


app.get("/colores", async (req, res) => {
    let limit = req.query.limit;
    let offset = req.query.offset;

    try {
        const results = await PelucheController.getAllColores(limit, offset);
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

//#region POST endpoints

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

app.post("/pedidos", Middleware.verify, async (req, res) => {
    let pedido = req.body;
    let userId = req.token.userId;
    console.log(`userId: ${userId}`)
    try {
        const result = await UsuarioController.addPedido(userId, pedido);
        if (result) {
            res.status(201).send(result); // 201
        } else {
            res.status(422).send("Datos inválidos.")
        }
    } catch (error) {
        console.log(`Error al crear el pedido. Error: ${error}`)
        res.status(500).send("Error al crear el pedido."); //500
    }
})

//#endregion

//#region DELETE endpoints
app.delete("/pedidos", Middleware.verify, async (req, res) => {
    let pedidoId = req.body.pedidoId;
    let userId = req.token.userId;
    try {
        const result = await UsuarioController.removePedido(userId, pedidoId);
        if (result) {
            res.status(201).send(result); // 201
        } else {
            res.status(422).send("Datos inválidos.")
        }
    } catch (error) {
        console.log(`Error al eliminar el pedido. Error: ${error}`)
        res.status(500).send("Error al eliminar el pedido."); //500
    }
})



//#region POST no accesibles

// Comentados porque no quiero que sean accesibles incluso con un token

// app.post("/usuarios", async (req, res) => {
//     let email = req.body.email;
//     let password = req.body.password;
//     try {
//         const result = await UsuarioController.addUsuario(email, password);
//         if (result) {
//             res.status(201).send(result); // 201
//         }
//         else {
//             res.status(409).send("El usuario ya existe"); // 409
//         }
//     } catch (error) {
//         console.log(`Error al crear el usuario. Error: ${error}`)
//         res.status(500).send("Error al crear el usuario."); //500
//     }
// });

// app.post("/peluches", async (req, res) => {
//     let modelo = req.body.modelo;
//     try {
//         const result = await PelucheController.addPeluche(modelo);
//         if (result) {
//             res.status(201).send("Peluche creado correctamente"); // 201
//         }
//     } catch (error) {
//         console.log(`Error al crear el peluche. Error: ${error}`)
//         res.status(500).send("Error al crear el peluche."); //500
//     }
// });

// app.post("/accesorios", async (req, res) => {
//     let nombre = req.body.nombre;
//     try {
//         const result = await AccesorioController.addAccesorio(nombre);
//         if (result) {
//             res.status(201).send(result); // 201
//         }
//     } catch (error) {
//         console.log(`Error al crear el accesorio. Error: ${error}`)
//         res.status(500).send("Error al crear el accesorio."); //500
//     }
// });


// app.post("/colores", async (req, res) => {
//     let nombre = req.body.nombre;
//     try {
//         const result = await ColorController.addColor(nombre);
//         if (result) {
//             res.status(201).send(result); // 201
//         }
//     } catch (error) {
//         console.log(`Error al crear el color. Error: ${error}`)
//         res.status(500).send("Error al crear el color."); //500
//     }
// });

//#endregion

app.listen(PORT, () => {
    console.log(`Servidor levantado ${PORT}`)
})

