var express = require("express");
var router = express.Router();

// chama o controller (próximo a ser criado)
var TelaAdmWaysafeController = require("../controllers/adm_concessionaria_controller");

// na controller então vai ter a função para pegar os usuários adm.
router.get("/listar_funcionarios/:fk_empresa",function(req,res){
  TelaAdmWaysafeController.listar_funcionarios(req,res)
})

router.get("/dados_funcionarios/:funcionarioId",function(req,res){
  TelaAdmWaysafeController.dados_funcionarios(req,res)
})
router.post("/atualizar_dados/:funcionarioId",function(req,res){
  TelaAdmWaysafeController.atualizar_dados(req,res)
})
router.delete("/excluir_funf/:funcionarioId",function(req,res){
  TelaAdmWaysafeController.excluir_funf(req,res)
})

module.exports = router;