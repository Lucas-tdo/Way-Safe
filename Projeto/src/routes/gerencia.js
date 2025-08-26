var express = require("express");
var router = express.Router();

var gerenciaController = require("../controllers/gerenciaController")

router.get("/listar/:tipo",function(req,res){
    gerenciaController.listar(req,res)
})

router.put("/aprovar/:idcamisa",function(req,res){
    gerenciaController.aprovar(req,res)
})

router.delete("/deletar/:idcamisa",function(req,res){
    gerenciaController.deletar(req,res)
})
module.exports = router ;
