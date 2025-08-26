var usuarioModel = require("../models/usuarioModel");

function cadastrar(req,res){
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    }else{
        usuarioModel.cadastrar(nome,email,senha)
        .then(
            function(resultado){
                console.log("Cadastrando usuário")
                res.json(resultado)
            }
        ).catch(
            function (erro){
                console.log(erro);
                console.log(
                    "\nHouve um erro ao realizar o cadastro! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        )
    }
}

function cadastrar_foto(req,res){
    var nome = req.body.nome;
    var email = req.body.email;
    var senha = req.body.senha;
    var imagem = req.file.filename
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    }else{
        usuarioModel.cadastrar_foto(nome,email,senha,imagem)
        .then(
            function(resultado){
                console.log("Cadastrando usuário com foto")
                res.json(resultado)
            }
        ).catch(
            function (erro){
                console.log(erro);
                console.log(
                    "\nHouve um erro ao realizar o cadastro! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        )
    }
}

function autenticar(req,res){
    var email = req.body.emailServer
    var senha = req.body.senhaServer

    if(email==undefined){
        res.status(400).send('Seu email está undefined!')
    }
    else if(senha==undefined){
        res.status(400).send('Sua senha está undefined!')
    }
    else{
        usuarioModel.autenticar(email,senha)
            .then(
                function(resultadoAutenticar){
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    if(resultadoAutenticar.length==1){
                        res.json({
                            id: resultadoAutenticar[0].id,
                            email: resultadoAutenticar[0].email,
                            nome: resultadoAutenticar[0].nome,
                            senha: resultadoAutenticar[0].senha,
                            imagem:resultadoAutenticar[0].imagem,
                            nivel:resultadoAutenticar[0].nivel
                        })
                    }
                    else if(resultadoAutenticar.length==0){
                        res.status(403).send("Email e/ou senha inválido(s)");
                    }
                    else{
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro){
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                })
    }
}

function checaremail(req,res){
    var email = req.params.email
    if(email==undefined){
        res.status(400).send('Seu email está undefined!')
    }
    else{
        usuarioModel.checaremail(email)
        .then(resposta=>{
            console.log("Vendo se o email já está cadastrado")
            res.json(resposta)
        })
        .catch(erro=>{
            console.log(erro)
            res.status(500).json(erro.sqlMessage)
        })
    }
}


module.exports = {
    autenticar,
    cadastrar,
    checaremail,
    cadastrar_foto
}