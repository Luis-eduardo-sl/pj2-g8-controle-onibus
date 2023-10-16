const express = require("express");
const { PrismaClient } = require("@prisma/client");

const router = express.Router();
const prisma = new PrismaClient();

// Rota para listar todos os ônibus
router.get("/listar", async (req, res) => {
  try {
    const onibus = await prisma.onibus.findMany();
    res.json(onibus);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar os ônibus." });
  }
});

// Rota para criar um novo ônibus
router.post("/cadastrar", async (req, res) => {
  try {
    const { placa } = req.body;

    const novoOnibus = await prisma.onibus.create({
      data: {
        placa,
      },
    });

    res.status(201).json(novoOnibus);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao criar o ônibus." });
  }
});

// Rota para atualizar um ônibus existente
router.put("/atualizar/:id", async (req, res) => {
  const { id } = req.params;
  const { placa } = req.body;

  try {
    const onibus = await prisma.onibus.update({
      where: { id_onibus: Number(id) },
      data: {
        placa,
      },
    });

    res.json(onibus);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao atualizar o ônibus." });
  }
});

// Rota para excluir um ônibus
router.delete("/excluir/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.onibus.delete({
      where: { id_onibus: Number(id) },
    });

    res.json({ message: "Ônibus excluído com sucesso." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao excluir o ônibus." });
  }
});

module.exports = router;
