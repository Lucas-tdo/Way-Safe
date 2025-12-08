var express = require("express");
var router = express.Router();

var TelaNivelAcessoController = require("../controllers/tela_nivel_acesso_controller");

router.get("/pegarDescricao", function(req, res){
    TelaNivelAcessoController.pegarDescricao(req, res);
});

router.post("/cadastrar", function (req, res) {
    TelaNivelAcessoController.cadastrar(req, res);
});
router.delete("/deletarNivel/:idNivel", function (req, res) {
    TelaNivelAcessoController.deletarNivel(req, res);
});


module.exports = router;
