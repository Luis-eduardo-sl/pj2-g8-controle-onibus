var express = require("express");
var router = express.Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Rota para listar todas as viagens
router.get("/viagens", async function (req, res, next) {
  const viagens = await prisma.viagem.findMany();
  res.json(viagens);
});

// Rota para criar uma nova viagem
router.post("/viagens", async (req, res, next) => {
  try {
    const { data, linha_id, motorista_id, onibus_id } = req.body;

    const novaViagem = await prisma.viagem.create({
      data: {
        data,
        linha_id,
        motorista_id,
        onibus_id,
      },
    });

    res.json(novaViagem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao criar a viagem." });
  }
});

// Rota para atualizar uma viagem existente
router.put("/viagens/:id", async (req, res, next) => {
  const { id } = req.params;
  const { data, linha_id, motorista_id, onibus_id } = req.body;

  try {
    const viagem = await prisma.viagem.update({
      where: { id_viagem: Number(id) },
      data: {
        data,
        linha_id,
        motorista_id,
        onibus_id,
      },
    });

    res.json(viagem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao atualizar a viagem." });
  }
});

// Rota para excluir uma viagem
router.delete("/viagens/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    await prisma.viagem.delete({
      where: { id_viagem: Number(id) },
    });

    res.json({ message: "Viagem excluída com sucesso." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao excluir a viagem." });
  }
});

module.exports = router;
