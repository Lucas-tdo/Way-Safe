var express = require("express");
var router = express.Router();

var TelaNivelAcessoController = require("../controllers/tela_nivel_acesso_controller");

router.get("/pegarDescricao",function(req,res){
    tela_nivel_acesso_controller.pegarDescricao(req,res);
});

router.post("/cadastrar", function (req, res) {
    nivelAcessoController.cadastrar(req, res);
});


module.exports = router;