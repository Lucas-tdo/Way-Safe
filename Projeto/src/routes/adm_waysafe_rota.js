// copiado de concessionaria rota porque tem o mesmo objetivo. Listagem.
var express = require("express");
var router = express.Router();

// chama o controller (próximo a ser criado)
var TelaAdmWaysafeController = require("../controllers/tela_adm_waysafe_controller");

// na controller então vai ter a função para pegar os usuários adm.
router.get("/pegarFuncAdm",function(req,res){
  TelaAdmWaysafeController.pegarFuncAdm(req,res)
})

router.post("/editarDados",function(req,res){
    TelaAdmWaysafeController.editarDados(req,res);
})

router.post("/cadastrarAdm",(req,res)=>{
    TelaAdmWaysafeController.cadastrar(req,res);
})

router.post("/editarADM",function(req,res){
    TelaAdmWaysafeController.editarADM(req,res);
})

router.delete("/removerADM",function(req,res){
    TelaAdmWaysafeController.removerADM(req,res);
})

module.exports = router;