var express = require("express");
var router = express.Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Rota para listar todos os cartões
router.get("/cartoes", async function (req, res, next) {
  const cartoes = await prisma.cartao.findMany();
  res.json(cartoes);
});

// Rota para criar um novo cartão
router.post("/cartoes", async (req, res, next) => {
  try {
    const { saldo, tipo } = req.body;

    const novoCartao = await prisma.cartao.create({
      data: {
        saldo,
        tipo,
      },
    });

    res.json(novoCartao);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao criar o cartão." });
  }
});

// Rota para atualizar um cartão existente
router.put("/cartoes/:id", async (req, res, next) => {
  const { id } = req.params;
  const { saldo, tipo } = req.body;

  try {
    const cartao = await prisma.cartao.update({
      where: { id_cartao: Number(id) },
      data: {
        saldo,
        tipo,
      },
    });

    res.json(cartao);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao atualizar o cartão." });
  }
});

// Rota para excluir um cartão
router.delete("/cartoes/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    await prisma.cartao.delete({
      where: { id_cartao: Number(id) },
    });

    res.json({ message: "Cartão excluído com sucesso." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao excluir o cartão." });
  }
});

module.exports = router;
