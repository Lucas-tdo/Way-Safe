var express = require("express");
var router = express.Router();

var TelaRodoviasController = require("../controllers/tela_rodovias_controller");

router.get("/topRodovias/:fk_empresa", function(req, res) {
    TelaRodoviasController.topRodovias(req, res);
});

router.post("/aplicar_filtro", function(req, res) {
    TelaRodoviasController.buscar_rodovias(req, res);
});

router.get("/listar_tipos_acidentes", function(req, res) {
    TelaRodoviasController.listar_tipos_acidentes(req, res);
});

module.exports = router;



    