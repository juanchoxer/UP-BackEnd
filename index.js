const express = require("express"); 
const app = express();
const http = require ("http").createServer(app);

require('dotenv').config();
const PORT = process.env.PORT || 8050;

app.get("/",(req,res) => {
    res.send("Test get");
})

app.post ("/",(req,res) => {
    res.send("Test post")
})

http.listen(PORT,()=>{
    console.log(`Servidor levantado ${PORT}`)
})