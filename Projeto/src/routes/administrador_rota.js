var express = require("express");
var router = express.Router();

var AdministradorController = require("../controllers/administradorController");

router.post("/editarDados",function(req,res){
    AdministradorController.editarDados(req,res);
})

module.exports = router;