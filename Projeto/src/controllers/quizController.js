var quizModel = require("../models/quizModel")

function addpontuacao(req,res){
    var pontuacao = req.body.PontuacaoServer
    var acertos = req.body.AcertosServer
    var id = req.body.idServer
    if(pontuacao==undefined){
        res.status(400).send("Sua pontuação está undefined")
    }
    else if(acertos==undefined){
        res.status(400).send("Seus acertos estão undefined")
    }
    else if(id==undefined){
        res.status(400).send("Seu id está undefined")
    }
    else{
        quizModel.addpontuacao(pontuacao,acertos,id)
        .then(
            resultado=>{
                console.log("Adicionando pontuação do quiz")
                res.json(resultado)
            }
        ).catch(
            function (erro){
                console.log(erro)
                console.log('\nHouve ao inserir dados do quiz!Erro: ',
                erro.sqlMessage
                )
                res.status(500).json(erro.sqlMessage)
            }
        )
            
    }
}

function ultimaspont(req,res){
    var id = req.params.idUsuario
    if(id== undefined ){
        res.status(400).send('Seu id está undefined!')
    }
    else{
        quizModel.ultimaspont(id)
        .then(
            resposta=>{
                console.log('\nUltimas pontuações adicionadas')
                res.json(resposta)
            })
        .catch(erro=>{
            console.log(erro)
            res.status(500).json(erro.sqlMessage)
        })
    }
}

function dadosquiz(req,res){
    var id = req.params.idUsuario
    if(id== undefined ){
        res.status(400).send('Seu id está undefined!')
    }
    else{
        quizModel.dadosquiz(id)
        .then(
            resposta=>{
                console.log('\nDados do quiz adicionados')
                res.json(resposta)
            }
        )
        .catch(erro=>{
            console.log(erro)
            res.status(500).json(erro.sqlMessage)
        })
    }
}

module.exports = {
    addpontuacao,
    ultimaspont,
    dadosquiz
}