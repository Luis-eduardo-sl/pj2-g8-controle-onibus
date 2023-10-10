var express = require("express");
var router = express.Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Rota para listar todos os ônibus
router.get("/onibus", async function (req, res, next) {
  const onibus = await prisma.onibus.findMany();
  res.json(onibus);
});

// Rota para criar um novo ônibus
router.post("/onibus", async (req, res, next) => {
  try {
    const { placa } = req.body;

    const novoOnibus = await prisma.onibus.create({
      data: {
        placa,
      },
    });

    res.json(novoOnibus);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao criar o ônibus." });
  }
});

// Rota para atualizar um ônibus existente
router.put("/onibus/:id", async (req, res, next) => {
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
router.delete("/onibus/:id", async (req, res, next) => {
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

