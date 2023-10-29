const express = require("express");
const { PrismaClient } = require("@prisma/client");

const router = express.Router();
const prisma = new PrismaClient();

// Rota para listar todos os motoristas
router.get("/listar", async (req, res) => {
  try {
    const motoristas = await prisma.motorista.findMany();
    res.json(motoristas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar os motoristas." });
  }
});

// Rota para buscar um motorista por ID
router.get("/buscar/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const motorista = await prisma.motorista.findUnique({
      where: { id_motorista: Number(id) },
    });

    if (motorista) {
      res.json(motorista);
    } else {
      res.status(404).json({ error: "Motorista não encontrado." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar o motorista." });
  }
});


// Rota para criar um novo motorista
router.post("/cadastrar", async (req, res) => {
  try {
    const { nome, cpf, telefone, email, foto, observacoes } = req.body;

    const novoMotorista = await prisma.motorista.create({
      data: {
        nome,
        cpf,
        telefone,
        email,
        foto,
        observacoes,
      },
    });

    res.status(201).json(novoMotorista);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao criar o motorista." });
  }
});

// Rota para atualizar um motorista existente
router.put("/atualizar/:id", async (req, res) => {
  const { id } = req.params;
  const { nome, cpf, telefone, email, foto, observacoes } = req.body;

  try {
    const motorista = await prisma.motorista.update({
      where: { id_motorista: Number(id) },
      data: {
        nome,
        cpf,
        telefone,
        email,
        foto,
        observacoes,
      },
    });

    res.json(motorista);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao atualizar o motorista." });
  }
});

// Rota para excluir um motorista
router.delete("/excluir/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.motorista.delete({
      where: { id_motorista: Number(id) },
    });

    res.json({ message: "Motorista excluído com sucesso." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao excluir o motorista." });
  }
});

module.exports = router;
