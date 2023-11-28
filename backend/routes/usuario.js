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

router.get("/procurar/:cpf", async (req, res) => {
  const { cpf } = req.params;

  try {
    // Remova caracteres não numéricos do CPF
    const cpfNumerico = cpf.replace(/\D/g, '');

    // Faça a busca usando o CPF
    const usuario = await prisma.usuario.findFirst({
      where: { cpf: cpfNumerico },
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



// Rota para recarregar saldo do usuário usando CPF
router.patch("/recarregar/cpf/:cpf", async (req, res) => {
  const { cpf } = req.params;
  const { saldo } = req.body;

  try {
    // Verifica se o usuário existe no banco de dados
    const existingUser = await prisma.usuario.findUnique({
      where: { cpf: cpf },
    });

    if (!existingUser) {
      console.error('Usuário não encontrado para o CPF especificado.');
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    // Converte o saldo existente e o saldo fornecido para números
    const saldoExistente = Number(existingUser.saldo);
    const saldoFornecido = Number(saldo);

    // Verifica se os valores são números válidos
    if (isNaN(saldoExistente) || isNaN(saldoFornecido)) {
      console.error("Valores de saldo inválidos.");
      return res.status(400).json({ error: 'Valores de saldo inválidos.' });
    }

    // Calcula o novo saldo somando o saldo existente com o saldo fornecido
    const novoSaldo = saldoExistente + saldoFornecido;

    // Atualiza o saldo do usuário no banco de dados usando o CPF
    const updatedUser = await prisma.usuario.update({
      where: { cpf: cpf },
      data: {
        saldo: novoSaldo,
      },
    });

    // Retorna o usuário atualizado
    res.json(updatedUser);
  } catch (error) {
    console.error(error);

    // Retorna uma mensagem de erro genérica
    res.status(500).json({ error: 'Erro ao realizar a recarga.' });
  }
});



router.get("/buscar/cartao/:cartao_id", async (req, res) => {
  const { cartao_id } = req.params;

  try {
    const usuario = await prisma.usuario.findFirst({
      where: { cartao_id: (cartao_id) },
    });

    if (usuario) {
      res.json(usuario);
    } else {
      res.status(404).json({ error: "Cartão não encontrado." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar o cartão." });
  }
});


// Rota para cobrar automaticamente com base no tipo de usuário
router.patch("/cobrar/:cartao_id", async (req, res) => {
  try {
    const { cartao_id } = req.params;

    // Certifique-se de que o cartão seja um número antes de consultar
    const cartaoNumero = parseInt(cartao_id);
    if (isNaN(cartaoNumero)) {
      return res.status(400).json({ error: "Número do cartão inválido." });
    }

    // Obtemos as informações do usuário
    const usuario = await prisma.usuario.findUnique({
      where: {
        cartao_id: cartaoNumero.toString(), // Convertendo para String
      },
      select: {
        id_usuario: true,
        saldo: true,
        tipo: true,
      },
    });

    if (!usuario) {
      return res.status(404).json({ error: "Cartão não encontrado, tente novamente." });
    }

    // Calcula o valor da cobrança com base no tipo de usuário
    let valorCobranca = 0;

    switch (usuario.tipo) {
      case "Comum":
        valorCobranca = 5; // Valor para usuários comuns
        break;
      case "Idoso":
      case "Deficiente":
        valorCobranca = 0; // Passagens grátis para idosos e deficientes
        break;
      case "Estudante":
        try {
         // Verifica quantas passagens o estudante já utilizou hoje
          const data = new Date();
          // const inicioDoDia = new Date(getFullYear(), getMonth(), getDate()); 
          const dia = String(data.getDate()).padStart(2, '0');
          const mes = String(data.getMonth() + 1).padStart(2, '0');
          const ano = data.getFullYear();

          const dataAtualFormatada = `${ano}-${mes}-${dia}`
          console.log(dataAtualFormatada);
          const transacoesEstudanteHoje = await prisma.viagem_has_usuario.count({
            where: {
              usuario_id: usuario.id_usuario,
              data: {
                gte:`${dataAtualFormatada}T00:00:00.000Z` ,
              },
            },
          });

          if (transacoesEstudanteHoje < 2) {
            valorCobranca = 0; // Passagens grátis se ainda não utilizou o limite
          } else {
            valorCobranca = 5; // Valor da cobrança após exceder o limite
          }
        } catch (error) {
          console.error(error);
          return res.status(500).json({ error: "Erro ao verificar transações do estudante." });
        }
        break;
      default:
        return res.status(400).json({ error: "Tipo de usuário inválido." });
    }

    // Verifica se o saldo é suficiente para a cobrança
    if (usuario.saldo < valorCobranca) {
      return res.status(405).json({ error: "Saldo insuficiente." });
    }

    // Atualiza o saldo do usuário após a cobrança
    const novoSaldo = usuario.saldo - valorCobranca;

    // Adiciona um registro na tabela viagem_has_usuario
    const novaViagemUsuario = await prisma.viagem_has_usuario.create({
      data: {
        tarifa: valorCobranca,
        data: new Date(),  // Use a data atual como a data de entrada
        usuario_id: usuario.id_usuario,
        viagem_id:12,
      },
    });

    await prisma.usuario.update({
      where: { id_usuario: usuario.id_usuario },
      data: {
        saldo: novoSaldo,
      },
    });

    res.json({ message: "Cobrança realizada com sucesso." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao processar a cobrança." });
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


// Rota para contar todos os usuários
router.get('/countUsuarios', async (req, res) => {
  try {
    const count = await prisma.usuario.count();
    res.json({ count });
  } catch (error) {
    console.error('Erro ao contar usuários:', error);
    res.status(500).json({ error: 'Erro ao contar usuários' });
  }
});

// Rota para contar usuários com o tipo 'Comum'
router.get('/countUsuariosComum', async (req, res) => {
  try {
    const count = await prisma.usuario.count({
      where: { tipo: 'Comum' }
    });
    res.json({ count });
  } catch (error) {
    console.error('Erro ao contar usuários comuns:', error);
    res.status(500).json({ error: 'Erro ao contar usuários comuns' });
  }
});

// Rota para contar usuários com o tipo 'Estudante'
router.get('/countUsuariosEstudante', async (req, res) => {
  try {
    const count = await prisma.usuario.count({
      where: { tipo: 'Estudante' }
    });
    res.json({ count });
  } catch (error) {
    console.error('Erro ao contar usuários estudantes:', error);
    res.status(500).json({ error: 'Erro ao contar usuários estudantes' });
  }
});

// Rota para contar usuários com o tipo 'Idoso'
router.get('/countUsuariosIdoso', async (req, res) => {
  try {
    const count = await prisma.usuario.count({
      where: { tipo: 'Idoso' }
    });
    res.json({ count });
  } catch (error) {
    console.error('Erro ao contar usuários idosos:', error);
    res.status(500).json({ error: 'Erro ao contar usuários idosos' });
  }
});

// Rota para contar usuários com o tipo 'Deficiente'
router.get('/countUsuariosDeficiente', async (req, res) => {
  try {
    const count = await prisma.usuario.count({
      where: { tipo: 'Deficiente' }
    });
    res.json({ count });
  } catch (error) {
    console.error('Erro ao contar usuários deficientes:', error);
    res.status(500).json({ error: 'Erro ao contar usuários deficientes' });
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
