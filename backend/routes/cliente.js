const express = require("express");
const { PrismaClient } = require("@prisma/client");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const router = express.Router();
const prisma = new PrismaClient();

const secretKey = process.env.SECRET_KEY;

// Função para gerar token de acesso
const generateAccessToken = (cliente) => {
  const payload = {
    id: cliente.id_cliente,
    email: cliente.email,
  };

  const options = {
    expiresIn: "1h",
  };

  return jwt.sign(payload, secretKey, options);
};

// Rota para listar todos os clientes
router.get("/listar", async (req, res) => {
  try {
    const clientes = await prisma.cliente.findMany();
    res.json(clientes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar os clientes." });
  }
});

// Rota para buscar um cliente por ID
router.get("/buscar/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const cliente = await prisma.cliente.findUnique({
      where: { id_cliente: Number(id) },
    });

    if (cliente) {
      res.json(cliente);
    } else {
      res.status(404).json({ error: "Cliente não encontrado." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar o cliente." });
  }
});

// Rota para realizar o login e gerar o token
router.post("/login", async (req, res) => {
  const { email, senha } = req.body;

  try {
    const cliente = await prisma.cliente.findUnique({
      where: { email: email },
    });

    if (!cliente) {
      return res.status(401).json({ error: "Credenciais inválidas." });
    }

    const senhaCorreta = await bcrypt.compare(senha, cliente.senha);

    if (!senhaCorreta) {
      return res.status(401).json({ error: "Credenciais inválidas." });
    }
console.log(cliente);
    const jwtToken = generateAccessToken(cliente);
    res.json({ cliente, accessToken: jwtToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao realizar o login." });
  }
});

// Rota para criar um novo cliente
router.post("/cadastrar", async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const novoCliente = await prisma.cliente.create({
      data: {
        nome,
        email,
        senha: senhaCriptografada,
      },
    });
console.log(novoCliente);
    res.status(201).json(novoCliente);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao criar o cliente." });
  }
});

// Rota para atualizar um cliente existente
router.put("/atualizar/:id", async (req, res) => {
  const { id } = req.params;
  const { nome, email, senha } = req.body;

  try {
    const senhaCriptografada = senha ? await bcrypt.hash(senha, 10) : undefined;

    const cliente = await prisma.cliente.update({
      where: { id_cliente: Number(id) },
      data: {
        nome,
        email,
        senha: senhaCriptografada,
      },
    });

    res.json(cliente);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao atualizar o cliente." });
  }
});

// Rota para excluir um cliente
router.delete("/excluir/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.cliente.delete({
      where: { id_cliente: Number(id) },
    });

    res.json({ message: "Cliente excluído com sucesso." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao excluir o cliente." });
  }
});

module.exports = router;
