var express = require("express");
const router = express.Router();
const upload = require('../config/configUpload'); // ARQUIVO COM A CONFIGURAÇÃO DO UPLOAD

var usuarioController = require("../controllers/usuarioController");

router.get("/pegarSenha/:email",function(req,res){
    usuarioController.pegarSenha(req,res)
})

router.get("/checaremail/:email",function(req,res){
    usuarioController.checaremail(req,res)
})

router.get("/checarEmpresa/:empresa",function(req,res){
    usuarioController.checarEmpresa(req,res)
})

router.post("/cadastrar",(req,res)=>{
    usuarioController.cadastrar(req,res);
})

router.post("/autenticar",function(req,res){
    usuarioController.autenticar(req,res);
})

router.post("/cadastrarFuncionario",(req,res)=>{
    usuarioController.cadastrarFuncionario(req,res);
})

router.post("/notificar-slack", function(req,res){
    usuarioController.notificarSlack(req,res);
})

module.exports = router;



    