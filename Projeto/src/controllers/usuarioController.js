var usuarioModel = require("../models/usuarioModel");


function checaremail(req,res){
    var email = req.params.email
    if(email==undefined){
        res.status(400).send('Seu email está undefined!')
    }
    else{
        usuarioModel.checaremail(email)
        .then(resposta=>{
            console.log("Analisando se o email já está cadastrado");
            res.json(resposta)
        })
        .catch(erro=>{
            console.log(erro)
            res.status(500).json(erro.sqlMessage)
        })
    }
}

function cadastrar(req,res){
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    if(nome==undefined){
        res.status(400).send("Seu nome está undefined")
    }
    else if(email==undefined){
        res.status(400).send("Seu email está undefined")
    }
    else if(senha==undefined){
        res.status(400).send("Sua senha está undefined")
    }
    else{
        usuarioModel.cadastrar(nome,email,senha)
        .then(resposta=>{
            console.log(`Usuário com o email ${email} cadastrado!`);
            res.json(resposta)
        }
    ).catch(erro=>{
        console.log("Houve um erro ao realizar o cadastro");
        console.log(erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);

    })
    }
}

function autenticar(req,res){
    var email = req.params.email;
    var senha = req.params.senha;
    if(email==undefined){
        res.status(400).send("Seu email está undefined")
    }
    else if(senha==undefined){
        res.status(400).send("Sua senha está undefined")
    }
    else{
        usuarioModel.autenticar(email,senha)
        .then(resposta=>{
            console.log("Vendo se o email já está cadastrado");
            if(resposta.length==1){
                console.log("Usuário logado");
                res.json(resposta)
            }
            else{
                console.log("Usuário não localizado");
                res.json([])
            }
        })
    }
}



module.exports = {
    checaremail,
    cadastrar,
    autenticar
}