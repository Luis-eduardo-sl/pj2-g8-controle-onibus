var express = require("express");
var router = express.Router();



router.get("/site", function (req, res, next) {
    res.render("site/index");
});

router.get("/site/horarios", function (req, res, next) {
    res.render("site/horarios");
});

router.get("/site/cadastro", function (req, res, next) {
    res.render("site/cadastro");
});

router.get("/site/login", function (req, res, next) {
    res.render("site/login");
});

router.get("/site/recarga", function (req, res, next) {
    res.render("site/recarga");
});

router.get("/site/sobre", function (req, res, next) {
    res.render("site/sobre");
});

  


module.exports = router;