var express = require("express");
var router = express.Router();

router.get("/listar", function (req, res, next) {
  res.render("onibus/listar");
});

router.get("/cadastrar", function (req, res, next) {
  res.render("onibus/cadastrar");
});

router.get("/exibir/:id", function (req, res, next) {
  res.render("onibus/exibir");
});

router.get("/editar/:id", function (req, res, next) {
  res.render("onibus/editar");
});

router.get("/excluir/:id", function (req, res, next) {
  res.render("onibus/excluir");
});


module.exports = router;
