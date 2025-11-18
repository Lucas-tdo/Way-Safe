var express = require("express");
var router = express.Router();

var TelaConcessionariaController = require("../controllers/tela_concessionaria_controller");


router.get("/pegarEmpresa",function(req,res){
    TelaConcessionariaController.pegarEmpresas(req,res)
})

module.exports = router;