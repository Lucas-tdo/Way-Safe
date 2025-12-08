var express = require("express");
var router = express.Router();

var TelaAnaliseDetalhadaController = require("../controllers/tela_analise_detalhada_controller");

router.get("/listar_anos", function(req, res) {
    TelaAnaliseDetalhadaController.listar_anos(req, res);
});

router.post("/listar_rodovias", function(req, res) {
    TelaAnaliseDetalhadaController.listar_rodovias(req, res);
});

router.post("/listar_municipios", function(req, res) {
    TelaAnaliseDetalhadaController.listar_municipios(req, res);
});

router.get("/listar_tipos_acidente", function(req, res) {
    TelaAnaliseDetalhadaController.listar_tipos_acidente(req, res);
});

router.post("/listar_denominacao", function(req, res) {
    TelaAnaliseDetalhadaController.listar_denominacao(req, res);
});

router.post("/listar_jurisdicao", function(req, res) {
    TelaAnaliseDetalhadaController.listar_jurisdicao(req, res);
});

router.post("/buscar_rodovias", function(req, res) {
    TelaAnaliseDetalhadaController.buscar_rodovias(req, res);
});

module.exports = router;



    