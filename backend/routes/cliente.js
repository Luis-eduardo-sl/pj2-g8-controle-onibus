const express = require("express");
const { PrismaClient } = require("@prisma/client");

const router = express.Router();
const prisma = new PrismaClient();

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



// Rota para criar um novo cliente
router.post("/cadastrar", async (req, res) => {
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

    res.status(201).json(novoCliente);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao criar o cliente." });
  }
});

// Rota para atualizar um cliente existente
router.put("/atualizar/:id", async (req, res) => {
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
