var express = require("express");
var router = express.Router();

var favoritaController = require("../controllers/favoritaController")

router.get("/qtd_camisas/:idUsuario",function(req,res){
    favoritaController.qtd_camisas(req,res)
})

router.get("/listar/:idUsuario",function(req,res){
    favoritaController.listar(req,res)
})

router.get("/anofavoritado/:idUsuario",function(req,res){
    favoritaController.anofavoritado(req,res)
})

router.get("/marcafavoritada/:idUsuario",function(req,res){
    favoritaController.marcafavoritada(req,res)
})
module.exports = router ;
