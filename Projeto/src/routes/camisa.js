var express = require("express");
var router = express.Router();


const upload = require("../configimagens/configCamisa")
var camisaController = require("../controllers/camisaController")

router.get("/adicionarimagens",function(req,res){
    camisaController.adicionarimagens(req,res)
})

router.post("/favoritar",function(req,res){
    camisaController.favoritar(req,res)
})

router.delete("/desfavoritar",function(req,res){
    camisaController.desfavoritar(req,res)
})

router.get("/checarfavoritos/:idUsuario",function(req,res){
    camisaController.checarfavoritos(req,res)
})

router.get("/top_favoritas",function(req,res){
    camisaController.top_favoritas(req,res)
})

router.get("/pegar_dados/:idCamisa",function(req,res){
    camisaController.pegar_dados(req,res)
})

router.post("/enviarcomentario",function(req,res){
    camisaController.enviarcomentario(req,res)
})

router.get("/pegarcomentarios/:idCamisa",function(req,res){
    camisaController.pegarcomentarios(req,res)
})

router.post("/cadastrar_camisa",upload.single('imagem'),function (req,res){
    camisaController.cadastrar_camisa(req,res)
})


module.exports = router ;
