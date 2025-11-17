var express = require("express");
var router = express.Router();

var TelaPreviaController = require("../controllers/tela_rodovia_esp_controller");

router.get("/qtdAcidentes/:fk_empresa/:anoSelecionado/:rodoviaSelecionada",function(req,res){
    TelaPreviaController.qtdAcidentes(req,res)
})
router.get("/nomeRodovia/:rodoviaSelecionada",function(req,res){
    TelaPreviaController.nomeRodovia(req,res)
})
router.get("/top5MaisTiposAcidentes/:fk_empresa/:anoSelecionado/:rodoviaSelecionada",function(req,res){
    TelaPreviaController.top5MaisTiposAcidentes(req,res)
})
router.get("/municipiosAcidentesQtd/:fk_empresa/:anoSelecionado/:rodoviaSelecionada",function(req,res){
    TelaPreviaController.municipiosAcidentesQtd(req,res)
})
router.get("/anosAcidentes/:fk_empresa/:rodoviaSelecionada",function(req,res){
    TelaPreviaController.anosAcidentes(req,res)
})



module.exports = router;



    