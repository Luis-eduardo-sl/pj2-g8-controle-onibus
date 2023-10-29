const express = require("express");
const { PrismaClient } = require("@prisma/client");

const router = express.Router();
const prisma = new PrismaClient();

// Rota para listar todos os usuários
router.get("/listar", async (req, res) => {
  try {
    const usuarios = await prisma.usuario.findMany();
    res.json(usuarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar os usuários." });
  }
});

// Rota para buscar um usuário por ID
router.get("/buscar/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const usuario = await prisma.usuario.findUnique({
      where: { id_usuario: Number(id) },
    });

    if (usuario) {
      res.json(usuario);
    } else {
      res.status(404).json({ error: "Usuário não encontrado." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar o usuário." });
  }
});


// Rota para criar um novo usuário
router.post("/cadastrar", async (req, res) => {
  try {
    const { nome, telefone, email, cpf, senha, observacoes, saldo, tipo } = req.body;

    const novoUsuario = await prisma.usuario.create({
      data: {
        nome,
        telefone,
        email,
        cpf,
        senha,
        observacoes,
        saldo,
        tipo,
      },
    });

    res.status(201).json(novoUsuario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao criar o usuário." });
  }
});

// Rota para atualizar um usuário existente
router.put("/atualizar/:id", async (req, res) => {
  const { id } = req.params;
  const { nome, telefone, email, cpf, senha, observacoes, saldo, tipo } = req.body;

  try {
    const usuario = await prisma.usuario.update({
      where: { id_usuario: Number(id) },
      data: {
        nome,
        telefone,
        email,
        cpf,
        senha,
        observacoes,
        saldo,
        tipo,
      },
    });

    res.json(usuario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao atualizar o usuário." });
  }
});

// Rota para excluir um usuário
router.delete("/excluir/:id", async (req, res) => {
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
