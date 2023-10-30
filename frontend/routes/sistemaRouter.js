var express = require("express");
var router = express.Router();



router.get("/", function (req, res, next) {
    res.render("interface-onibus/index");
});

router.get("/aprovado", function (req, res, next) {
    res.render("interface-onibus/aprovado");
});

router.get("/erro", function (req, res, next) {
    res.render("interface-onibus/erro");
});

router.get("/aproxime", function (req, res, next) {
    res.render("interface-onibus/aproxime");
});


  


module.exports = router;