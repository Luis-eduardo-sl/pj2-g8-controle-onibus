var express = require("express");
var router = express.Router();

router.get("/listar", function (req, res, next) {
  res.render("usuario/listar");
});

router.get("/cadastrar", function (req, res, next) {
  res.render("usuario/cadastrar");
});

router.get("/exibir/:id", function (req, res, next) {
  res.render("usuario/exibir");
});

router.get("/editar/:id", function (req, res, next) {
  res.render("usuario/editar");
});

router.get("/excluir/:id", function (req, res, next) {
  res.render("usuario/excluir");
});


module.exports = router;