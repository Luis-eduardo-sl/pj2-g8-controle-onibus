var express = require("express");
var router = express.Router();



router.get("/", function (req, res, next) {
    res.render("interface-onibus/aproxime");
});

router.get("/aprovado", function (req, res, next) {
    res.render("interface-onibus/aprovado");
});

router.get("/erro", function (req, res, next) {
    res.render("interface-onibus/erro");
});




  


module.exports = router;