
var express = require("express");
var router = express.Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Rota para listar todos os motoristas
router.get("/motoristas", async function (req, res, next) {
  const motoristas = await prisma.motorista.findMany();
  res.json(motoristas);
});

// Rota para criar um novo motorista
router.post("/motoristas", async (req, res, next) => {
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

    res.json(novoMotorista);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao criar o motorista." });
  }
});

// Rota para atualizar um motorista existente
router.put("/motoristas/:id", async (req, res, next) => {
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
router.delete("/motoristas/:id", async (req, res, next) => {
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