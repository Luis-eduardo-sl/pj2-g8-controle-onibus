var express = require("express");
var router = express.Router();



router.get("/", function (req, res, next) {
    res.render("site/index");
});

router.get("/horarios", function (req, res, next) {
    res.render("site/horarios");
});

router.get("/cadastro", function (req, res, next) {
    res.render("site/cadastro");
});

router.get("/login", function (req, res, next) {
    res.render("site/login");
});

router.get("/recarga", function (req, res, next) {
    res.render("site/recarga");
});

router.get("/sobre", function (req, res, next) {
    res.render("site/sobre");
});

router.get("/perfil", function (req, res, next) {
    res.render("site/perfil");
});

  


module.exports = router;