var express = require("express");
var router = express.Router();

var quizController = require("../controllers/quizController")

router.post("/addpontuacao",function(req,res){
    quizController.addpontuacao(req,res)
})

router.get("/ultimaspont/:idUsuario",function(req,res){
    quizController.ultimaspont(req,res)
})

router.get("/dadosquiz/:idUsuario",function(req,res){
    quizController.dadosquiz(req,res)
})

module.exports = router ;