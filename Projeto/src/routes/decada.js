var express = require("express");
var router = express.Router();

var decadaController = require("../controllers/decadaController")

router.get("/dadosidolo",function(req,res){
    decadaController.dadosidolo(req,res)
})

router.get("/dadostitulo",function(req,res){
    decadaController.dadostitulo(req,res)
})

module.exports = router ;