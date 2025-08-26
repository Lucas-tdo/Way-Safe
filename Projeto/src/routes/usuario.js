var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

router.post("/cadastrar",(req,res)=>{
    usuarioController.cadastrar(req,res);
})

router.get("/autenticar/:email/:senha",(req,res)=>{
    usuarioController.autenticar(req,res);
})


module.exports = router;



    