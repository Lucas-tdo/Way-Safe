var usuarioModel = require("../models/tela_rodovia_esp_model");


function anosAcidentes(req,res){
    var fk_empresa = req.params.fk_empresa
    var rodoviaSelecionada = req.params.rodoviaSelecionada
    if(fk_empresa==undefined){
        res.status(400).send('Seu fk_empresa está undefined!')
    }
    else{
        usuarioModel.anosAcidentes(fk_empresa,rodoviaSelecionada)
        .then(resposta=>{
            console.log("Analisando se o fk_empresa");
            res.json(resposta)
        })
        .catch(erro=>{
            console.log(erro)
            res.status(500).json(erro.sqlMessage)
        })
    }
}

function qtdAcidentes(req,res){
    var fk_empresa = req.params.fk_empresa
    var anoSelecionado = req.params.anoSelecionado
    var rodoviaSelecionada = req.params.rodoviaSelecionada
    
    if(fk_empresa==undefined){
        res.status(400).send('Seu fk_empresa está undefined!')
    }
    else{
        usuarioModel.qtdAcidentes(fk_empresa,anoSelecionado,rodoviaSelecionada)
        .then(resposta=>{
            console.log("Analisando se o fk_empresa");
            res.json(resposta)
        })
        .catch(erro=>{
            console.log(erro)
            res.status(500).json(erro.sqlMessage)
        })
    }
}

function nomeRodovia(req,res){
    var rodoviaSelecionada = req.params.rodoviaSelecionada
    
    if(rodoviaSelecionada==undefined){
        res.status(400).send('Seu fk_rodovia está undefined!')
    }
    else{
        usuarioModel.nomeRodovia(rodoviaSelecionada)
        .then(resposta=>{
            console.log("Analisando se o fk_empresa");
            res.json(resposta)
        })
        .catch(erro=>{
            console.log(erro)
            res.status(500).json(erro.sqlMessage)
        })
    }
}

function top5MaisTiposAcidentes(req,res){
    var fk_empresa = req.params.fk_empresa
    var anoSelecionado = req.params.anoSelecionado
    var rodoviaSelecionada = req.params.rodoviaSelecionada
    
    if(fk_empresa==undefined){
        res.status(400).send('Seu fk_empresa está undefined!')
    }
    else{
        usuarioModel.top5MaisTiposAcidentes(fk_empresa,anoSelecionado,rodoviaSelecionada)
        .then(resposta=>{
            console.log("Analisando se o fk_empresa");
            res.json(resposta)
        })
        .catch(erro=>{
            console.log(erro)
            res.status(500).json(erro.sqlMessage)
        })
    }
}

function municipiosAcidentesQtd(req,res){
    var fk_empresa = req.params.fk_empresa
    var anoSelecionado = req.params.anoSelecionado
    var rodoviaSelecionada = req.params.rodoviaSelecionada
    
    if(fk_empresa==undefined){
        res.status(400).send('Seu fk_empresa está undefined!')
    }
    else{
        usuarioModel.municipiosAcidentesQtd(fk_empresa,anoSelecionado,rodoviaSelecionada)
        .then(resposta=>{
            console.log("Analisando se o fk_empresa");
            res.json(resposta)
        })
        .catch(erro=>{
            console.log(erro)
            res.status(500).json(erro.sqlMessage)
        })
    }
}




module.exports = {
    qtdAcidentes,
    top5MaisTiposAcidentes,
    anosAcidentes,
    nomeRodovia,
    municipiosAcidentesQtd
}