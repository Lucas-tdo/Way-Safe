var express = require("express");
var router = express.Router();

var solicitacaoController = require("../controllers/solicitacaoController")

router.get('/adicionarimagens/:idUsuario',function(req,res){
    solicitacaoController.adicionarimagens(req,res)
})

module.exports = router ;
