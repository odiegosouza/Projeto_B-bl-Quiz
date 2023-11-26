var express = require("express");
var router = express.Router();

var tentativaController = require("../controllers/tentativaController");

router.post("/", function (req, res) {
    tentativaController.inserindoTentativa(req, res);
})

router.get("/", function (req, res) {
    tentativaController.mostrarTentativa(req, res);
})

module.exports = router;