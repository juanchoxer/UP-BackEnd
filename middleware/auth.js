const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const verify = (req,res,next) => {
    try {
        const token = req.headers['authorization'] ? req.headers['authorization'].split(' ')[1] : null;
        req.token = jwt.verify(token, JWT_SECRET_KEY);
        next();
    }catch(error) {
        console.log(`Error en middleware. Error: ${error.message}`);
        res.status(401).send('No autorizado');
    }
}

module.exports = { verify }