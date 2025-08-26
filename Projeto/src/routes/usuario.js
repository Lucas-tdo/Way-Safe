var express = require("express");
var router = express.Router();

const upload = require("../configimagens/configUSUARIO")
var usuarioController = require("../controllers/usuarioController")

router.post("/cadastrar",function (req,res){
    usuarioController.cadastrar(req, res);
})

router.post("/autenticar",function(req,res){
    usuarioController.autenticar(req,res)
})

router.get("/checaremail/:email",function(req,res){
    usuarioController.checaremail(req,res)
})

router.post("/cadastrar_foto",upload.single('foto'),(req,res)=>{
    usuarioController.cadastrar_foto(req,res)
})

module.exports = router;
