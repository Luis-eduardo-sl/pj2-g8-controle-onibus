const express = require("express");
const { PrismaClient } = require("@prisma/client");

const router = express.Router();
const prisma = new PrismaClient();

// Rota para listar todas as relações viagem_has_usuario
router.get("/listar", async (req, res) => {
  try {
    const viagemHasUsuarios = await prisma.viagem_has_usuario.findMany();
    res.json(viagemHasUsuarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar as relações viagem_has_usuario." });
  }
});

// Rota para criar uma nova relação viagem_has_usuario
router.post("/cadastrar", async (req, res) => {
  try {
    const { tarifa, data, viagem_id, usuario_id } = req.body;

    const novaViagemHasUsuario = await prisma.viagem_has_usuario.create({
      data: {
        tarifa,
        data,
        viagem_id,
        usuario_id,
      },
    });

    res.status(201).json(novaViagemHasUsuario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao criar a relação viagem_has_usuario." });
  }
});

// Rota para atualizar uma relação viagem_has_usuario existente
router.put("/atualizar/:id", async (req, res) => {
  const { id } = req.params;
  const { tarifa, data, viagem_id, usuario_id } = req.body;

  try {
    const viagemHasUsuario = await prisma.viagem_has_usuario.update({
      where: { id_viagem_has_usuario: Number(id) },
      data: {
        tarifa,
        data,
        viagem_id,
        usuario_id,
      },
    });

    res.json(viagemHasUsuario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao atualizar a relação viagem_has_usuario." });
  }
});

// Rota para excluir uma relação viagem_has_usuario
router.delete("/excluir/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.viagem_has_usuario.delete({
      where: { id_viagem_has_usuario: Number(id) },
    });

    res.json({ message: "Relação viagem_has_usuario excluída com sucesso." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao excluir a relação viagem_has_usuario." });
  }
});

module.exports = router;
