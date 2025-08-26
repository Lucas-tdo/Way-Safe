var express = require("express");
var router = express.Router();

var idolosController = require("../controllers/idolosController")

router.get("/pegar_dados/:idIdolos",function(req,res){
    idolosController.pegar_dados(req,res)
})

router.get("/dados_titulos/:idIdolos",function(req,res){
    idolosController.dados_titulos(req,res)
})

router.post("/enviarcomentario",function(req,res){
    idolosController.enviarcomentario(req,res)
})

router.get("/pegarcomentarios/:idIdolos",function(req,res){
    idolosController.pegarcomentarios(req,res)
})

module.exports = router;