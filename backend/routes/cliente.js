var express = require("express");
var router = express.Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Rota para listar todos os clientes
router.get("/clientes", async function (req, res, next) {
  const clientes = await prisma.cliente.findMany();
  res.json(clientes);
});

// Rota para criar um novo cliente
router.post("/clientes", async (req, res, next) => {
  try {
    const { nome, token, email, senha, usuario_cadastrado_id } = req.body;

    const novoCliente = await prisma.cliente.create({
      data: {
        nome,
        token,
        email,
        senha,
        usuario_cadastrado_id,
      },
    });

    res.json(novoCliente);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao criar o cliente." });
  }
});

// Rota para atualizar um cliente existente
router.put("/clientes/:id", async (req, res, next) => {
  const { id } = req.params;
  const { nome, token, email, senha, usuario_cadastrado_id } = req.body;

  try {
    const cliente = await prisma.cliente.update({
      where: { id_cliente: Number(id) },
      data: {
        nome,
        token,
        email,
        senha,
        usuario_cadastrado_id,
      },
    });

    res.json(cliente);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao atualizar o cliente." });
  }
});

// Rota para excluir um cliente
router.delete("/clientes/:id", async (req, res, next) => {
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
