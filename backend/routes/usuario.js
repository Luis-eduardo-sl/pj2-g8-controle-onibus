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
    const { nome, telefone, email, cpf, senha, observacoes, saldo, tipo, cartao_id } = req.body;

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
        cartao_id,
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
  const { nome, telefone, email, cpf, senha, observacoes, saldo, tipo, cartao_id  } = req.body;

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
        cartao_id,
      },
    });

    res.json(usuario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao atualizar o usuário." });
  }
});

//rota para atualizar o saldo
router.patch("/recarregar/:id", async (req, res) => {
  const { id } = req.params;
  const {  saldo  } = req.body;

  try {
    const usuario = await prisma.usuario.update({
      where: { id_usuario: Number(id) },
      data: {
        saldo,
      },
    });

    res.json(usuario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao atualizar o usuário." });
  }
});
router.get('/dados', async (req, res) => {
  try {
    // Consulta Prisma para obter os dados
    const dados = await prisma.$queryRaw`
      SELECT 
        DATE_FORMAT(cadastro, '%Y-%m') as ano_mes,
        tipo,
        COUNT(*) as total
      FROM 
        onbus_data.usuario
      WHERE 
        cadastro >= DATE_FORMAT(NOW() - INTERVAL 7 MONTH, '%Y-%m-01')
      GROUP BY 
        DATE_FORMAT(cadastro, '%Y-%m'), tipo
      ORDER BY 
        ano_mes ASC, tipo ASC;  -- Ordenar por ano_mes e tipo
    `;

    // Mapear os dados para o formato desejado
    const labels = [...new Set(dados.map((item) => item.ano_mes))]; // Obter rótulos únicos
    const tiposUsuario = [...new Set(dados.map((item) => item.tipo))]; // Obter tipos de usuário únicos

    // Inicializar um objeto para armazenar os dados por tipo de usuário
    const dadosPorTipo = {};

    // Organizar os dados por tipo de usuário
    tiposUsuario.forEach((tipo) => {
      const dadosTipo = dados
        .filter((item) => item.tipo === tipo)
        .map((item) => Number(item.total));

      dadosPorTipo[tipo] = dadosTipo;
    });

    const jsonResult = {
      labels,
      series: dadosPorTipo, // Agora os dados são organizados diretamente por tipo
    };

    res.json(jsonResult);
  } catch (error) {
    console.error('Erro ao obter dados:', error);
    res.status(500).json({ error: 'Erro ao obter dados' });
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
