var express = require("express");
var router = express.Router();

var titulosController = require("../controllers/TitulosController")

router.get("/pegar_dados/:idTitulos",function(req,res){
    titulosController.pegar_dados(req,res)
})

router.get("/dados_idolos/:idTitulos",function(req,res){
    titulosController.dados_idolos(req,res)
})

router.post("/enviarcomentario",function(req,res){
    titulosController.enviarcomentario(req,res)
})

router.get("/pegarcomentarios/:idTitulos",function(req,res){
    titulosController.pegarcomentarios(req,res)
})

module.exports = router;