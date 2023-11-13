const jwt = require('jsonwebtoken');

//Gera um token assinado que expira em 1 hora por padrão
function generateAccessToken(data, options={ expiresIn: '3600s'}) {
    return jwt.sign(data, process.env.SECRET_KEY, options);
}


//Recuper ae valida o token recebido na requisição
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if ( token == null ) return res.sendStatus(401); //401 unauthorized

    jwt.verify(token, process.env.SECRET_KEY, (err, data) => {
        console.log(err);

        if (err) return res.sendStatus(403);  //403 forbidden]

        req.accessToken = data;

        next();

    });
}


//Exporta as funções
module.exports = { generateAccessToken, authenticateToken };