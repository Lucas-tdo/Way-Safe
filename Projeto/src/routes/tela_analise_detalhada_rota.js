var express = require("express");
var router = express.Router();

var TelaAnaliseDetalhadaController = require("../controllers/tela_analise_detalhada_controller");

router.get("/listar_anos", function(req, res) {
    TelaAnaliseDetalhadaController.listar_anos(req, res);
});

router.get("/listar_rodovias", function(req, res) {
    TelaAnaliseDetalhadaController.listar_rodovias(req, res);
});

router.get("/listar_municipios", function(req, res) {
    TelaAnaliseDetalhadaController.listar_municipios(req, res);
});

router.get("/listar_tipos_acidente", function(req, res) {
    TelaAnaliseDetalhadaController.listar_tipos_acidente(req, res);
});

router.get("/listar_denominacao/:fk_empresa", function(req, res) {
    TelaAnaliseDetalhadaController.topRodovias(req, res);
});

router.get("/listar_jurisdicao", function(req, res) {
    TelaAnaliseDetalhadaController.listar_municipios(req, res);
});

router.post("/buscar_rodovias", function(req, res) {
    TelaAnaliseDetalhadaController.buscar_rodovias(req, res);
});

module.exports = router;



    