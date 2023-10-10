var express = require("express");
var router = express.Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Rota para listar todos os registros de viagem_has_usuario
router.get("/viagem_has_usuario", async function (req, res, next) {
  const registros = await prisma.viagem_has_usuario.findMany();
  res.json(registros);
});

// Rota para criar um novo registro de viagem_has_usuario
router.post("/viagem_has_usuario", async (req, res, next) => {
  try {
    const { tarifa, data, viagem_id, usuario_id } = req.body;

    const novoRegistro = await prisma.viagem_has_usuario.create({
      data: {
        tarifa,
        data,
        viagem_id,
        usuario_id,
      },
    });

    res.json(novoRegistro);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao criar o registro de viagem_has_usuario." });
  }
});

// Rota para atualizar um registro de viagem_has_usuario existente
router.put("/viagem_has_usuario/:id", async (req, res, next) => {
  const { id } = req.params;
  const { tarifa, data, viagem_id, usuario_id } = req.body;

  try {
    const registro = await prisma.viagem_has_usuario.update({
      where: { id: Number(id) },
      data: {
        tarifa,
        data,
        viagem_id,
        usuario_id,
      },
    });

    res.json(registro);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao atualizar o registro de viagem_has_usuario." });
  }
});

// Rota para excluir um registro de viagem_has_usuario
router.delete("/viagem_has_usuario/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    await prisma.viagem_has_usuario.delete({
      where: { id: Number(id) },
    });

    res.json({ message: "Registro de viagem_has_usuario excluído com sucesso." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao excluir o registro de viagem_has_usuario." });
  }
});

module.exports = router;