var express = require("express");
var router = express.Router();

var TelaAcidentesController = require("../controllers/tela_acidentes_controller");

router.get("/total_acidentes/:fk_empresa/:periodo", function(req, res) {
    TelaAcidentesController.totalAcidentes(req, res);
});

router.get("/evolucao_acidentes/:fk_empresa/:periodo", function(req, res) {
    TelaAcidentesController.evolucaoAcidentes(req, res);
});


router.get("/total_acidentes_por_tipo/:fk_empresa/:periodo", function(req, res) {
    TelaAcidentesController.quantiaPorTipoAcidente(req, res);
});

module.exports = router;



    