var express = require("express");
var router = express.Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Rota para listar todos os usuários
router.get("/usuarios", async function (req, res, next) {
  const usuarios = await prisma.usuario.findMany();
  res.json(usuarios);
});

// Rota para criar um novo usuário
router.post("/usuarios", async (req, res, next) => {
  try {
    const { nome, saldo, cpf, tipo, observacoes } = req.body;

    const novoUsuario = await prisma.usuario.create({
      data: {
        nome,
        saldo,
        cpf,
        tipo,
        observacoes,
      },
    });

    res.json(novoUsuario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao criar o usuário." });
  }
});

// Rota para atualizar um usuário existente
router.put("/usuarios/:id", async (req, res, next) => {
  const { id } = req.params;
  const { nome, saldo, cpf, tipo, observacoes } = req.body;

  try {
    const usuario = await prisma.usuario.update({
      where: { id_usuario: Number(id) },
      data: {
        nome,
        saldo,
        cpf,
        tipo,
        observacoes,
      },
    });

    res.json(usuario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao atualizar o usuário." });
  }
});

// Rota para excluir um usuário
router.delete("/usuarios/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    await prisma.usuario.delete({
      where: { id_usuario: Number(id) },
    });

    res.json({ message: "Usuário excluído com sucesso." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao excluir o usuário." });
  }
});

module.exports = router;