var express = require("express");
var router = express.Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Rota para listar todas as linhas
router.get("/linhas", async function (req, res, next) {
  const linhas = await prisma.linha.findMany();
  res.json(linhas);
});

// Rota para criar uma nova linha
router.post("/linhas", async (req, res, next) => {
  try {
    const { nome, inicio, intervalo, termino, rota } = req.body;

    const novaLinha = await prisma.linha.create({
      data: {
        nome,
        inicio,
        intervalo,
        termino,
        rota,
      },
    });

    res.json(novaLinha);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao criar a linha." });
  }
});

// Rota para atualizar uma linha existente
router.put("/linhas/:id", async (req, res, next) => {
  const { id } = req.params;
  const { nome, inicio, intervalo, termino, rota } = req.body;

  try {
    const linha = await prisma.linha.update({
      where: { id_linha: Number(id) },
      data: {
        nome,
        inicio,
        intervalo,
        termino,
        rota,
      },
    });

    res.json(linha);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao atualizar a linha." });
  }
});

// Rota para excluir uma linha
router.delete("/linhas/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    await prisma.linha.delete({
      where: { id_linha: Number(id) },
    });

    res.json({ message: "Linha excluída com sucesso." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao excluir a linha." });
  }
});

module.exports = router;