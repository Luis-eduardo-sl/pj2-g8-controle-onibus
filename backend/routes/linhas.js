const express = require("express");
const { PrismaClient } = require("@prisma/client");

const router = express.Router();
const prisma = new PrismaClient();

// Rota para listar todas as linhas
router.get("/listar", async (req, res) => {
  try {
    const linhas = await prisma.linha.findMany();
    res.json(linhas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar as linhas." });
  }
});

// Rota para buscar uma linha por ID
router.get("/buscar/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const linha = await prisma.linha.findUnique({
      where: { id_linha: Number(id) },
    });

    if (linha) {
      res.json(linha);
    } else {
      res.status(404).json({ error: "Linha não encontrada." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar a linha." });
  }
});


// Rota para contar o número de linhas
router.get('/countLinhas', async (req, res) => {
  try {
    const count = await prisma.linha.count();
    res.json({ count });
  } catch (error) {
    console.error('Erro ao contar linhas:', error);
    res.status(500).json({ error: 'Erro ao contar linhas' });
  }
});

// Rota para criar uma nova linha
router.post("/cadastrar", async (req, res) => {
  try {
    const { nome, inicio, termino, rota, freq_semanal } = req.body;

    const novaLinha = await prisma.linha.create({
      data: {
        nome,
        inicio: `1900-01-01T${inicio}:00Z`,
        termino: `1900-01-01T${termino}:00Z`,
        rota,
        freq_semanal,
      },
    });

    res.status(201).json(novaLinha);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao criar a linha." });
  }
});

// Rota para atualizar uma linha existente
router.put("/editar/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const { nome, inicio, termino, rota, freq_semanal } = req.body;
  try {
    const linha = await prisma.linha.update({
      where: {
        id_linha: id,
      },
      data: {
        nome: nome,
        inicio: `1900-01-01T${inicio}:00Z`,
        termino: `1900-01-01T${termino}:00Z`,
        rota: rota,
        freq_semanal :freq_semanal,
      },
    });

    res.json(linha);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao atualizar a linha." });
  }
});

// Rota para excluir uma linha
router.delete("/excluir/:id", async (req, res) => {
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
