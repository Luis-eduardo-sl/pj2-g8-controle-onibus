var express = require("express");
var router = express.Router();



router.get('/', (req, res) => {
  // Rota para o site administrativo
  res.render('site-adm/index'); 
});


/*-------------------rotas para linha------------------------------*/



router.get("/linhas", function (req, res, next) {
  res.render("site-adm/forms-linhas");
});

router.get("/cadastrar", function (req, res, next) {
  res.render("site-adm/linhas/cadastrar");
});

router.get("/exibir/:id", function (req, res, next) {
  res.render("site-adm/linhas/exibir");
});

router.get("/editar/:id", function (req, res, next) {
  res.render("site-adm/linhas/editar");
});

router.get("/excluir/:id", function (req, res, next) {
  res.render("site-adm/linhas/excluir");
});

/*-------------------rotas para motorista------------------------------*/

router.get("/motoristas", function (req, res, next) {
  res.render("site-adm/forms-motoristas");
});

router.get("/cadastrar", function (req, res, next) {
  res.render("site-adm/motorista/cadastrar");
});

router.get("/exibir/:id", function (req, res, next) {
  res.render("site-adm/motorista/exibir");
});

router.get("/editar/:id", function (req, res, next) {
  res.render("site-adm/motorista/editar");
});

router.get("/excluir/:id", function (req, res, next) {
  res.render("site-adm/motorista/excluir");
});

/*-------------------rotas para onibus------------------------------*/

router.get("/onibus", function (req, res, next) {
  res.render("site-adm/forms-onibus");
});

router.get("/cadastrar", function (req, res, next) {
  res.render("site-adm/onibus/cadastrar");
});

router.get("/exibir/:id", function (req, res, next) {
  res.render("site-adm/onibus/exibir");
});

router.get("/editar/:id", function (req, res, next) {
  res.render("site-adm/onibus/editar");
});

router.get("/excluir/:id", function (req, res, next) {
  res.render("site-adm/onibus/excluir");
});

/*-------------------rotas para usuario------------------------------*/

router.get("/usuarios", function (req, res, next) {
  res.render("site-adm/forms-usuarios");
});

router.get("/cadastrar", function (req, res, next) {
  res.render("site-adm/usuario/cadastrar");
});

router.get("/exibir/:id", function (req, res, next) {
  res.render("site-adm/usuario/exibir");
});

router.get("/editar/:id", function (req, res, next) {
  res.render("site-adm/usuario/editar");
});

router.get("/excluir/:id", function (req, res, next) {
  res.render("site-adm/usuario/excluir");
});


/*-------------------rotas para recarga------------------------------*/

router.get("/recarga", function (req, res, next) {
  res.render("site-adm/recarga");
});

/*-------------------rotas para flash message------------------------------*/

router.get("/mesage", function (req, res, next) {
  res.render("site-adm/flashMessage");
});

/*-------------------rotas para register------------------------------*/

router.get("/login", function (req, res, next) {
  res.render("site-adm/page-login");
});

router.get("/registro", function (req, res, next) {
  res.render("site-adm/page-register");
});

router.get("/senha", function (req, res, next) {
  res.render("site-adm/pages-forget");
});


module.exports = router;