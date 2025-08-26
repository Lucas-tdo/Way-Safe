var titulosModel = require("../models/titulosModel")

function pegar_dados(req,res){
    var id = req.params.idTitulos
    if(id==undefined){
        res.status(400).send("Seu id está undefined")
    }
    else{
        titulosModel.pegar_dados(id)
        .then(resposta=>{
            console.log("Dados do título localizados")
            res.json(resposta)
        })
        .catch(erro=>{
            console.log(erro)
            res.status(500).send(erro.sqlMessage)
        })
    }
}

function dados_idolos(req,res){
    var id = req.params.idTitulos
    if(id==undefined){
        res.status(400).send("Seu id está undefined")
    }
    else{
        titulosModel.dados_idolos(id)
        .then(resposta=>{
            console.log("idolos que ganharam o título localizados")
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
    var idtitulo = req.body.idtituloServer 
    if (idusuario == undefined) {
        res.status(400).send("Seu usuário está está undefined!");
    } else if (comentario == undefined) {
        res.status(400).send("Seu comentário está undefined!");
    } else if (idtitulo == undefined) {
        res.status(400).send("O titulo está undefined!");
    }
    else{
        titulosModel.enviarcomentario(idusuario,comentario,idtitulo)
        .then(resposta=>{
            console.log("Comentário na pagína titulos adicionada")
            res.json(resposta)
        })
        .catch(erro=>{
            console.log(erro)
            res.status(500).send(erro.sqlMessage)
        })
    }
}

function pegarcomentarios(req,res){
    var id = req.params.idTitulos;
    if(id==undefined){
        res.status(400).send("Seu id está undefined")
    }
    else{
        titulosModel.pegarcomentarios(id)
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
    dados_idolos,
    enviarcomentario,
    pegarcomentarios
}