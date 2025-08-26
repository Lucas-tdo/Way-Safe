var usuarioModel = require("../models/usuarioModel");

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
            }
            else{
                console.log("Usuário não localizado");
            }
        })
    }
}
// var email ="matheus@gmail.com";
// var senha = "sougay1";

//       fetch(`/usuario/autenticar/${email}/${senha}`,{
//         method:"GET"
//       })
//       .then(resposta=>{
//         console.log('foi');
//       })
//       .catch(erro=>{
//         console.log(erro)
//       })

module.exports = {
    cadastrar,
    autenticar
}