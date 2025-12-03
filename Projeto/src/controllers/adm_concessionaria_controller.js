    var administradorModel = require("../models/administradorConcessionariaModel");


    function listar_funcionarios(req,res){
        var fk_empresa = req.params.fk_empresa
        if(fk_empresa==undefined){
            res.status(400).send('Seu fk_empresa está undefined!')
        }
        else{
            administradorModel.listar_funcionarios(fk_empresa)
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
    function dados_funcionarios(req,res){
        var funcionarioId = req.params.funcionarioId
        
        if(funcionarioId==undefined){
            res.status(400).send('Seu idUsuario está undefined!')
        }
        else{
            administradorModel.dados_funcionarios(funcionarioId)
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
    function atualizar_dados(req,res){

        var funcionarioId = req.params.funcionarioId
        var nome = req.body.nome;
        var email = req.body.email;
        var nivel_acesso_fk = req.body.nivel_acesso_fk;


        if(funcionarioId==undefined){
            res.status(400).send('Seu idUsuario está undefined!')
        }
         else if(nome==undefined || email == undefined){
            res.status(400).send('Seu nome e email está undefined!')
        }
        else{
            administradorModel.atualizar_dados(funcionarioId,nome,email,nivel_acesso_fk)
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
    function excluir_funf(req,res){

        var funcionarioId = req.params.funcionarioId


        if(funcionarioId==undefined){
            res.status(400).send('Seu idUsuario está undefined!')
        }
        else{
            administradorModel.excluir_funf(funcionarioId)
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
    module.exports={
        listar_funcionarios,
        dados_funcionarios,
        atualizar_dados,
        excluir_funf
    }