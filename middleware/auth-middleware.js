const jwt = require('jsonwebtoken');

const verify = (req,res,next) => {
    try {
        const decode = jwt.verify(req.headers.Authorization, 'secret_key');
        next();
    }catch(error) {
        console.log(`Error en middleware. Error: ${error}`);
        res.status(401).send('No autorizado');
    }
}

module.exports = [verify]