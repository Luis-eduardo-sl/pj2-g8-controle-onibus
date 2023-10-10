var express = require('express');
const cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var linhasRouter = require('./routes/linhas');
var motoristaRouter = require('./routes/motorista');
var onibusRouter = require('./routes/onibus');
var usuarioRouter = require('./routes/usuario');
var viagemRouter = require('./routes/viagem');
var cartaoRouter = require('./routes/cartao');
var viagemHasUsuarioRouter = require('./routes/viagem_has_usuario');

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/linhas', linhasRouter);
app.use('/api/motorista', motoristaRouter);
app.use('/api/onibus', onibusRouter);
app.use('/api/usuario', usuarioRouter);
app.use('/api/viagem', viagemRouter);
app.use('/api/cartao', cartaoRouter);
app.use('/api/viagem_has_usuario', viagemHasUsuarioRouter);

module.exports = app;
