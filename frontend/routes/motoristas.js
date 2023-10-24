var express = require("express");
var router = express.Router();

router.get("/listar", function (req, res, next) {
  res.render("motorista/listar");
});

router.get("/cadastrar", function (req, res, next) {
  res.render("motorista/cadastrar");
});

router.get("/exibir/:id", function (req, res, next) {
  res.render("motorista/exibir");
});

router.get("/editar/:id", function (req, res, next) {
  res.render("motorista/editar");
});

router.get("/excluir/:id", function (req, res, next) {
  res.render("motorista/excluir");
});


module.exports = router;