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
const AccesorioController = require('./controllers/accesorio');
const UsuarioController = require('./controllers/usuario');
const AuthController = require('./controllers/auth');
const PedidoController = require('./controllers/pedido');

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

// app.get("/users", Middleware.verify, async (req, res) => {
//     let limit = req.query.limit;
//     let offset = req.query.offset;
//     try {
//         const results = await UsrController.getAllUsers(limit, offset);
//         res.status(200).json(results);
//     } catch (error) {
//         res.status(500).send("Error. Intente mas tarde.")
//     }
// });

app.get("/pedidos", Middleware.verify, async (req, res) => {
    let limit = req.query.limit;
    let offset = req.query.offset;
    try {
        const results = await PedidoController.getAllPedidos(limit, offset);
        res.status(200).json(results);

    } catch (error) {
        res.status(500).send("Error. Intente mas tarde.")
    }
})

app.get("/pedidos/:id", (req, res) => { // ejemplo de getById
    let id = req.params.id;
    console.log(id);
    res.json({ 'request': id })
})

//#endregion

//#region POST endpoints

app.post("/peluches", async (req, res) => {
    let modelo = req.body.modelo;
    let color = req.body.color;
    try {
        const result = await PelucheController.addPeluche(modelo, color);
        if (result) {
            res.status(201).send("Peluche creado correctamente"); // 201
        }
    } catch (error) {
        console.log(`Error al crear el peluche. Error: ${error}`)
        res.status(500).send("Error al crear el peluche."); //500
    }
});

app.post("/accesorios", async (req, res) => {
    let nombre = req.body.nombre;
    try {
        const result = await AccesorioController.addAccesorio(nombre);
        if (result) {
            res.status(201).send("Accesorio creado correctamente"); // 201
        }
    } catch (error) {
        console.log(`Error al crear el accesorio. Error: ${error}`)
        res.status(500).send("Error al crear el accesorio."); //500
    }
});

app.post("/usuarios", async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    try {
        const result = await UsuarioController.addUsuario(email, password);
        if (result) {
            res.status(201).send("Usuario creado correctamente"); // 201
        }
        else {
            res.status(409).send("El usuario ya existe"); // 409
        }
    } catch (error) {
        console.log(`Error al crear el usuario. Error: ${error}`)
        res.status(500).send("Error al crear el usuario."); //500
    }
});

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
    let peluche = req.body.peluche;
    let accesorio = req.body.accesorio;
    let userId = req.token.userId;
    //let userId = mongoose.Types.ObjectId(req.token.userId);
    try {
        const result = await PedidoController.addPedido(userId, peluche, accesorio);
        if (result) {
            res.status(201).send("Pedido creado correctamente"); // 201
        }
    } catch (error) {
        console.log(`Error al crear el pedido. Error: ${error}`)
        res.status(500).send("Error al crear el pedido."); //500
    }
})



app.listen(PORT, () => {
    console.log(`Servidor levantado ${PORT}`)
})

//#endregion