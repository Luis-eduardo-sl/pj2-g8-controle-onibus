const express = require("express");
const { PrismaClient } = require("@prisma/client");

const router = express.Router();
const prisma = new PrismaClient();

// Rota para listar todos os comentarios
router.get("/listar", async (req, res) => {
    try {
      const comentarios = await prisma.comentario.findMany();
      res.json(comentarios);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao buscar os comentarios." });
    }
  });

  // Rota para buscar um comentario por ID
router.get("/buscar/:id", async (req, res) => {
    const { id } = req.params;
  
    try {
      const comentario = await prisma.comentario.findUnique({
        where: { id_comentario: Number(id) },
      });
  
      if (comentario) {
        res.json(comentario);
      } else {
        res.status(404).json({ error: "comentario não encontrado." });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao buscar o comentario." });
    }
  });

// Rota para criar um comentario
router.post("/cadastrar", async (req, res) => {
    try {
      const { nome, texto, email } = req.body;
  
      const novoComentario = await prisma.comentario.create({
        data: {
          nome,
          texto,
          email
        },
      });
  
      res.status(201).json(novoComentario);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao criar o comentario." });
    }
  });

  // Rota para excluir um comentario
router.delete("/excluir/:id", async (req, res) => {
    const { id } = req.params;
  
    try {
      await prisma.comentario.delete({
        where: { id_comentario: Number(id) },
      });
  
      res.json({ message: "Comentario excluído com sucesso." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao excluir o Comentario." });
    }
  });
  

module.exports = router;