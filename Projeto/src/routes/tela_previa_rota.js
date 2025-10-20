var express = require("express");
var router = express.Router();

var TelaPreviaController = require("../controllers/tela_previa_controller");

router.get("/qtdAcidentes/:fk_empresa",function(req,res){
    TelaPreviaController.qtdAcidentes(req,res)
})
router.get("/trechoCritico/:fk_empresa",function(req,res){
    TelaPreviaController.trechoCritico(req,res)
})
router.get("/top10/:fk_empresa",function(req,res){
    TelaPreviaController.top10(req,res)
})
router.get("/PiorMes/:fk_empresa",function(req,res){
    TelaPreviaController.PiorMes(req,res)
})
router.get("/top5MaisTiposAcidentes/:fk_empresa",function(req,res){
    TelaPreviaController.top5MaisTiposAcidentes(req,res)
})



module.exports = router;



    