var idolosModel = require("../models/idolosModel")

function pegar_dados(req,res){
    var id = req.params.idIdolos
    if(id==undefined){
        res.status(400).send("Seu id está undefined")
    }
    else{
        idolosModel.pegar_dados(id)
        .then(resposta=>{
            console.log("Dado do idolo localizados")
            res.json(resposta)
        })
        .catch(erro=>{
            console.log(erro)
            res.status(500).send(erro.sqlMessage)
        })
    }
}


function dados_titulos(req,res){
    var id = req.params.idIdolos
    if(id==undefined){
        res.status(400).send("Seu id está undefined")
    }
    else{
        idolosModel.dados_titulos(id)
        .then(resposta=>{
            console.log("Títulos do ídolo localizados")
            res.json(resposta)
        })
        .catch(erro=>{
            console.log(erro)
            res.status(500).send(erro.sqlMessage)
        })
    }
}

function enviarcomentario(req,res){
    var idusuario= req.body.idUsuarioServer
    var comentario = req.body.comentarioServer
    var ididolo = req.body.idIdoloServer 
    if (idusuario == undefined) {
        res.status(400).send("Seu usuário está está undefined!");
    } else if (comentario == undefined) {
        res.status(400).send("Seu comentário está undefined!");
    } else if (ididolo == undefined) {
        res.status(400).send("O ídolo está undefined!");
    }
    else{
        idolosModel.enviarcomentario(idusuario,comentario,ididolo)
        .then(resposta=>{
            console.log("Comentário na pagína idolos adicionada")
            res.json(resposta)
        })
        .catch(erro=>{
            console.log(erro)
            res.status(500).send(erro.sqlMessage)
        })
    }
}

function pegarcomentarios(req,res){
    var id = req.params.idIdolos;
    if(id==undefined){
        res.status(400).send("Seu id está undefined")
    }
    else{
        idolosModel.pegarcomentarios(id)
        .then(resposta=>{
            console.log("Pegando comentários")
            res.json(resposta)
        })
        .catch(erro=>{
            console.log(erro)
            res.status(500).send(erro.sqlMessage)
        })
    }
}

module.exports = {
    pegar_dados,
    dados_titulos,
    enviarcomentario,
    pegarcomentarios
}