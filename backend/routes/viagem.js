const express = require("express");
const { PrismaClient } = require("@prisma/client");

const router = express.Router();
const prisma = new PrismaClient();

// Rota para listar todas as viagens
router.get("/listar", async (req, res) => {
  try {
    const viagens = await prisma.viagem.findMany();
    res.json(viagens);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar as viagens." });
  }
});

// Rota para buscar uma viagem por ID
router.get("/buscar/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const viagem = await prisma.viagem.findUnique({
      where: { id_viagem: Number(id) },
    });

    if (viagem) {
      res.json(viagem);
    } else {
      res.status(404).json({ error: "Viagem não encontrada." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar a viagem." });
  }
});


// Rota para criar uma nova viagem
router.post("/cadastrar", async (req, res) => {
  try {
    const { inicio, duracao, linha_id, motorista_id, onibus_id } = req.body;

    const novaViagem = await prisma.viagem.create({
      data: {
        inicio,
        duracao,
        linha_id,
        motorista_id,
        onibus_id,
      },
    });

    res.status(201).json(novaViagem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao criar a viagem." });
  }
});

// Rota para atualizar uma viagem existente
router.put("/atualizar/:id", async (req, res) => {
  const { id } = req.params;
  const { inicio, duracao, linha_id, motorista_id, onibus_id } = req.body;

  try {
    const viagem = await prisma.viagem.update({
      where: { id_viagem: Number(id) },
      data: {
        inicio,
        duracao,
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
router.delete("/excluir/:id", async (req, res) => {
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
