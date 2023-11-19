
const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.post("/login", async (req, res) => {
    const { email, senha } = req.body;
    const user = await prisma.cliente.findFirst({
            where: {
              email: email
            }
          });
          console.log(user);
  if (!user) {
  return res.status(401).json({ mensagem: "E-mail não encontrado." });
  }
                     
  const passwordIsValid = await bcrypt.compare(senha, user.senha);

  if (!passwordIsValid) {
    return res.status(401).json({ mensagem: "Senha inválida." });
    }
const id_cliente = user.id_cliente;
    if (email === user.email &&  passwordIsValid === true ) {
        const token = jwt.sign({ id: id_cliente }, process.env.SECRET_KEY, {
            expiresIn: "4h",
        });

        return res.json({ token });
    }

    return res.status(401).json({ message: "Credenciais inválidas. Acesso não autorizado." });
});



router.get("/verify-token", (req, res) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: "Token não fornecido. Acesso não autorizado." });
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Token inválido. Acesso não autorizado." });
        }
        const clienteId = decoded.id
        return res.json({ message: "Token válido. Acesso autorizado. ", clienteId });
    });
});


module.exports = router;
