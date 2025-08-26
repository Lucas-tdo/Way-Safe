var decadaModel = require("../models/decadaModel")

function dadosidolo(req,res){
    decadaModel.dadosidolo()
    .then(resultado=>{
        console.log("Dados dos idolos localizados")
        res.json(resultado)
    })
    .catch(erro=>{
        console.log(erro)
        res.status(500).send(erro.sqlMessage)
    })
}

function dadostitulo(req,res){
    decadaModel.dadostitulo()
    .then(resposta=>{
        console.log(resposta)
        res.json(resposta)
    })
    .catch(erro=>{
        console.log(erro)
        res.status(500).send(erro.sqlMessage)
    })
}
module.exports = {
    dadosidolo,
    dadostitulo
}