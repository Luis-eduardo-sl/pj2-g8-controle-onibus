const mysql = require('mysql2/promise')
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const porta = 666;

// const dbConfig = ({
//     host: 'localhost',
//     port: 3306,
//     database: 'onbus',
//     user: 'root',
//     password: ''
//   });
  
  const pool = mysql.createPool(dbConfig);


  
  app.listen(porta, () => {
    console.log('App está rodando');
  });

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Ocorreu um erro interno no servidor' });
  });

  // Rota para listar todos os usuários
app.get('/usuarios', async (req, res, next) => {
    try {
      const [rows] = await pool.execute('SELECT * FROM usuarios');
      return res.status(200).json(rows);
    } catch (error) {
      return next(error);
    }
  });


  // Rota para listar todos os motoristas
app.get('/motoristas', async (req, res, next) => {
    try {
      const [rows] = await pool.execute('SELECT * FROM motoristas');
      return res.status(200).json(rows);
    } catch (error) {
      return next(error);
    }
  });


  // Rota para listar todos os cartões de usuário
app.get('/usuarioscartao', async (req, res, next) => {
    try {
      const [rows] = await pool.execute('SELECT * FROM usuarioscartao');
      return res.status(200).json(rows);
    } catch (error) {
      return next(error);
    }
  });


  // Rota para listar todas as linhas
app.get('/linhas', async (req, res, next) => {
    try {
      const [rows] = await pool.execute('SELECT * FROM linhas');
      return res.status(200).json(rows);
    } catch (error) {
      return next(error);
    }
  });


  // Rota para obter um usuário específico por ID
app.get('/usuarios/:id', async (req, res, next) => {
    const { id } = req.params;
  
    try {
      const [rows] = await pool.execute('SELECT * FROM usuarios WHERE id = ?', [id]);
      if (rows.length === 0) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }
      return res.status(200).json(rows[0]);
    } catch (error) {
      return next(error);
    }
  });


  // Rota para criar um novo usuário
app.post('/usuarios', async (req, res, next) => {
    const { nome, telefone, nascimento, cpf, email, senha, tipo, observacoes } = req.body;
  
    try {
      const [result] = await pool.execute(
        'INSERT INTO usuarios (nome, telefone, nascimento, cpf, email, senha, tipo, observacoes) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [nome, telefone, nascimento, cpf, email, senha, tipo, observacoes]
      );
  
      const newUser = {
        id: result.insertId,
        nome,
        telefone,
        nascimento,
        cpf,
        email,
        senha,
        tipo,
        observacoes
      };
  
      return res.status(201).json(newUser);
    } catch (error) {
      return next(error);
    }
  });


  // Rota para criar um novo motorista
app.post('/motoristas', async (req, res, next) => {
    const { nome, cpf, telefone, email, foto, observacoes } = req.body;
  
    try {
      const [result] = await pool.execute(
        'INSERT INTO motoristas (nome, cpf, telefone, email, foto, observacoes) VALUES (?, ?, ?, ?, ?, ?)',
        [nome, cpf, telefone, email, foto, observacoes]
      );
  
      const newMotorista = {
        id: result.insertId,
        nome,
        cpf,
        telefone,
        email,
        foto,
        observacoes
      };
  
      return res.status(201).json(newMotorista);
    } catch (error) {
      return next(error);
    }
  });


  // Rota para criar um novo cartão de usuário
app.post('/usuarioscartao', async (req, res, next) => {
    const { cpf, tipo, saldo } = req.body;
  
    try {
      const [result] = await pool.execute(
        'INSERT INTO usuarioscartao (cpf, tipo, saldo) VALUES (?, ?, ?)',
        [cpf, tipo, saldo]
      );
  
      const newCartao = {
        cpf,
        tipo,
        saldo
      };
  
      return res.status(201).json(newCartao);
    } catch (error) {
      return next(error);
    }
  });


  // Rota para criar uma nova linha
app.post('/linhas', async (req, res, next) => {
    const { nome, inicio, intervalo, termino, rota } = req.body;
  
    try {
      const [result] = await pool.execute(
        'INSERT INTO linhas (nome, inicio, intervalo, termino, rota) VALUES (?, ?, ?, ?, ?)',
        [nome, inicio, intervalo, termino, rota]
      );
  
      const novaLinha = {
        id: result.insertId,
        nome,
        inicio,
        intervalo,
        termino,
        rota
      };
  
      return res.status(201).json(novaLinha);
    } catch (error) {
      return next(error);
    }
  });

  
  // Rota para atualizar um usuário existente por ID
app.put('/usuarios/:id', async (req, res, next) => {
    const { id } = req.params;
    const { nome, telefone, nascimento, cpf, email, senha, tipo, observacoes } = req.body;
  
    try {
      const [result] = await pool.execute(
        'UPDATE usuarios SET nome = ?, telefone = ?, nascimento = ?, cpf = ?, email = ?, senha = ?, tipo = ?, observacoes = ? WHERE id = ?',
        [nome, telefone, nascimento, cpf, email, senha, tipo, observacoes, id]
      );
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }
  
      return res.status(200).json({ message: 'Usuário atualizado com sucesso' });
    } catch (error) {
      return next(error);
    }
  });


  // Rota para atualizar um motorista existente por ID
app.put('/motoristas/:id', async (req, res, next) => {
    const { id } = req.params;
    const { nome, cpf, telefone, email, foto, observacoes } = req.body;
  
    try {
      const [result] = await pool.execute(
        'UPDATE motoristas SET nome = ?, cpf = ?, telefone = ?, email = ?, foto = ?, observacoes = ? WHERE id = ?',
        [nome, cpf, telefone, email, foto, observacoes, id]
      );
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Motorista não encontrado' });
      }
  
      return res.status(200).json({ message: 'Motorista atualizado com sucesso' });
    } catch (error) {
      return next(error);
    }
  });


  // Rota para atualizar uma linha existente por nome
app.put('/linhas/:nome', async (req, res, next) => {
    const { nome } = req.params;
    const { inicio, intervalo, termino, rota } = req.body;
  
    try {
      const [result] = await pool.execute(
        'UPDATE linhas SET inicio = ?, intervalo = ?, termino = ?, rota = ? WHERE nome = ?',
        [inicio, intervalo, termino, rota, nome]
      );
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Linha não encontrada' });
      }
  
      return res.status(200).json({ message: 'Linha atualizada com sucesso' });
    } catch (error) {
      return next(error);
    }
  });


  // Rota para excluir um usuário por ID
app.delete('/usuarios/:id', async (req, res, next) => {
    const { id } = req.params;
  
    try {
      const [result] = await pool.execute('DELETE FROM usuarios WHERE id = ?', [id]);
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }
  
      return res.status(200).json({ message: 'Usuário excluído com sucesso' });
    } catch (error) {
      return next(error);
    }
  });
  

 