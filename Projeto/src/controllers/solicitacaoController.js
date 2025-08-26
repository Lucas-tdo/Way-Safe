var solicitacaoModel = require("../models/solicitacaoModel")

function adicionarimagens(req,res){
    var id = req.params.idUsuario
    if(id==undefined){
        res.status(400).send("Seu id está undefined")
    }
    else{
        solicitacaoModel.adicionarimagens(id)
        .then(resposta=>{
            console.log("Adicionando camisas solicitadas pelo usuário")
            res.json(resposta)
        })
        .catch(erro=>{
            console.log(erro)
            res.status(500).send(erro.sqlMessage)
        })
    }
}

module.exports={
    adicionarimagens
}