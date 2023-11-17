// const jwt = require("jsonwebtoken");

// const secretKey = process.env.SECRET_KEY;

// const verifyToken = (req, res, next) => {
//   const token = req.cookies.jwt; 

//   if (!token) {
//     return res.status(401).json({ mensagem: 'Token não encontrado. Acesso não autorizado.' });
//   }

//   try {
//     const decoded = jwt.verify(token, secretKey); 
//     req.usuario = decoded;
//     next();
//   } catch (error) {
//     console.log(error);
//     return res.status(403).json({ mensagem: 'Token inválido. Acesso não autorizado.' });
//   }
// };

// module.exports = verifyToken;

const jwt = require("jsonwebtoken");

const verifyTokenMiddleware = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Token não fornecido. Acesso não autorizado." });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({
          message:
            "Token expirado. Faça login novamente para obter um novo token.",
        });
      }
      return res
        .status(401)
        .json({ message: "Token inválido. Acesso não autorizado." });
    }
    req.user = decoded;
    next();
  });
};

module.exports = { verifyTokenMiddleware };
