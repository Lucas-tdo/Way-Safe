var express = require("express");
var router = express.Router();

var TelaAcidentesController = require("../controllers/tela_acidentes_controller");

router.get("/municipio_mais_acidentes/:fk_empresa/:periodo", function(req, res) {
    TelaAcidentesController.municipio_mais_acidentes(req, res);
});

router.get("/total_de_acidentes/:fk_empresa/:periodo", function(req, res) {
    TelaAcidentesController.total_de_acidentes(req, res);
});

router.get("/total_acidentes_por_tipo/:fk_empresa/:periodo", function(req, res) {
    TelaAcidentesController.quantiaPorTipoAcidente(req, res);
});



module.exports = router;



    