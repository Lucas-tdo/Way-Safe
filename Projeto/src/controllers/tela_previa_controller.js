var usuarioModel = require("../models/tela_previa_model");


function qtdAcidentes(req,res){
    var fk_empresa = req.params.fk_empresa
    if(fk_empresa==undefined){
        res.status(400).send('Seu fk_empresa está undefined!')
    }
    else{
        usuarioModel.qtdAcidentes(fk_empresa)
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
function trechoCritico(req,res){
    var fk_empresa = req.params.fk_empresa
    if(fk_empresa==undefined){
        res.status(400).send('Seu fk_empresa está undefined!')
    }
    else{
        usuarioModel.trechoCritico(fk_empresa)
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
function top10(req,res){
    var fk_empresa = req.params.fk_empresa
    if(fk_empresa==undefined){
        res.status(400).send('Seu fk_empresa está undefined!')
    }
    else{
        usuarioModel.top10(fk_empresa)
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
function PiorMes(req,res){
    var fk_empresa = req.params.fk_empresa
    if(fk_empresa==undefined){
        res.status(400).send('Seu fk_empresa está undefined!')
    }
    else{
        usuarioModel.PiorMes(fk_empresa)
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
    if(fk_empresa==undefined){
        res.status(400).send('Seu fk_empresa está undefined!')
    }
    else{
        usuarioModel.top5MaisTiposAcidentes(fk_empresa)
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
    trechoCritico,
    top10,
    PiorMes,
    top5MaisTiposAcidentes
}