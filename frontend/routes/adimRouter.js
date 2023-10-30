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

router.get("/linhas/editar/:id", function (req, res, next) {
  res.render("site-adm/editar-linha");
});

router.get("/linhas/excluir/:id", function (req, res, next) {
  res.render("site-adm/excluir-linha");
});

/*-------------------rotas para motorista------------------------------*/

router.get("/motoristas", function (req, res, next) {
  res.render("site-adm/forms-motoristas");
});

router.get("motoristas/editar/:id", function (req, res, next) {
  res.render("site-adm/editar-motorista");
});

router.get("motoristas/excluir/:id", function (req, res, next) {
  res.render("site-adm/excluir-motorista");
});

/*-------------------rotas para onibus------------------------------*/

router.get("/onibus", function (req, res, next) {
  res.render("site-adm/forms-onibus");
});

router.get("onibus/editar/:id", function (req, res, next) {
  res.render("site-adm/editar-onibus");
});

router.get("onibus/excluir/:id", function (req, res, next) {
  res.render("site-adm/excluir-onibus");
});


/*-------------------rotas para usuario------------------------------*/

router.get("/usuarios", function (req, res, next) {
  res.render("site-adm/forms-usuarios");
});

router.get("usuarios/editar/:id", function (req, res, next) {
  res.render("site-adm/editar-usuarios");
});

router.get("usuarios/excluir/:id", function (req, res, next) {
  res.render("site-adm/excluir-usuarios");
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