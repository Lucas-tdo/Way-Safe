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
function checarEmpresa(req,res){
    var empresa = req.params.empresa
    if(empresa==undefined){
        res.status(400).send('Seu codigo de empresa está undefined!')
    }
    else{
        usuarioModel.checarEmpresa(empresa)
        .then(resposta=>{
            console.log("Analisando se a empresa existe já está cadastrado");
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
    var fk_empresa = req.body.fk_empresaServer;
    if(nome==undefined){
        res.status(400).send("Seu nome está undefined")
    }
    else if(email==undefined){
        res.status(400).send("Seu email está undefined")
    }
    else if(senha==undefined){
        res.status(400).send("Sua senha está undefined")
    }
    else if(fk_empresa==undefined){
        res.status(400).send("Sua fk_empresa está undefined")
    }
    else{
        usuarioModel.cadastrar(nome,email,senha,fk_empresa)
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

function cadastrarFuncionario(req,res){
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    //esse fk_empresa provávelmente vai dar problema.
    var fk_empresa = req.body.fk_empresaServer;
    var nivel_acesso = req.body.nivel_acesso
    if(nome==undefined){
        res.status(400).send("Seu nome está undefined")
    }
    else if(email==undefined){
        res.status(400).send("Seu email está undefined")
    }
    else if(senha==undefined){
        res.status(400).send("Sua senha está undefined")
    }
    else if(fk_empresa==undefined){
        res.status(400).send("Sua fk_empresa está undefined")
    }else if(nivel_acesso==undefined){
        res.status(400).send("Seu nível de acesso está undefined")
    }else{
        usuarioModel.cadastrarFuncionario(nome,email,senha,fk_empresa, nivel_acesso)
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
    var email = req.body.email;
    var senha = req.body.senha;
    var fk_empresa = req.params.fk_empresa;
    if(email==undefined){
        res.status(400).send("Seu email está undefined")
    }
    else if(senha==undefined){
        res.status(400).send("Sua senha está undefined")
    }
    else{
        usuarioModel.autenticar(email,senha,fk_empresa)
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

async function notificarSlack(req, res) {
    var mensagem = req.body.text;
    
    if (mensagem == undefined) {
        res.status(400).send("Mensagem está undefined");
        return;
    }

    try {
        const response = await fetch(
            'https://hooks.slack.com/services/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',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: mensagem }),
            }
        );

        if (response.ok) {
            console.log("Notificação enviada ao Slack com sucesso!");
            res.status(200).send("Notificação enviada ao Slack");
        } else {
            console.log("Erro ao enviar notificação ao Slack");
            res.status(response.status).send("Erro ao enviar para o Slack");
        }
    } catch (erro) {
        console.log("Erro ao notificar Slack:", erro);
        res.status(500).send("Erro interno ao notificar Slack");
    }
}



module.exports = {
    checaremail,
    cadastrar,
    autenticar,
    cadastrarFuncionario,
    checarEmpresa,
    notificarSlack
}