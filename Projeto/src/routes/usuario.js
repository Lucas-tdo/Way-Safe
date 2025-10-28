var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

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



module.exports = router;



    