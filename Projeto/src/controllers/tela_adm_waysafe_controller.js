// novamente, copiado de concessionária pois é o mesmo processo.
// PRÓXIMO PASSO É A MODEL.
// Lembrar de alterar os nomes de chamada de variável e require também...
var tela_adm_waysafe_model = require("../models/tela_adm_waysafe_model");

// nome da função tem que ser o mesmo que será o módulo exportado.
function pegarFuncAdm(req, res){
    console.log("Pegando Funcionários Adminstradores:");
    
    tela_adm_waysafe_model.pegarFuncAdm()
            .then(resposta => {
                console.log(resposta);
                res.json(resposta); // A função já retorna o objeto formatado
            })
            .catch(erro => {
                console.log("Erro ao pegar empresas", erro);
                res.status(500).json(erro.sqlMessage || erro);
            });
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
        tela_adm_waysafe_model.cadastrar(nome,email,senha)
        .then(resposta=>{
            console.log(`Administrador com o email ${email} cadastrado!`);
            res.json(resposta)
        }
    ).catch(erro=>{
        console.log("Houve um erro ao realizar o cadastro");
        console.log(erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);

    })
    }
}


function cadastrarConc(req,res){
    var cnpj  =req.body.cnpjServer
    var cep =req.body.cepServer
    var complemento =req.body.complementoServer
    var nome =req.body.nomeServer
    var email =req.body.emailServer
    var telefone =req.body.telefoneServer
    
    console.log("BODY RECEBIDO:", req.body);
    console.log("CNPJ:", cnpj);
    console.log("CEP:", cep);
    console.log("COMPLEMENTO:", complemento);
    console.log("NOME:", nome);
    console.log("EMAIL:", email);
    console.log("TELEFONE:", telefone);


    
    if (nome == undefined) {
    res.status(400).send("O nome está undefined");
    } 
    else if (email == undefined) {
        res.status(400).send("O email está undefined");
    }
    else if (cnpj == undefined) {
        res.status(400).send("O CNPJ está undefined");
    }
    else if (cep == undefined) {
        res.status(400).send("O CEP está undefined");
    }
    else if (telefone == undefined) {
        res.status(400).send("O telefone está undefined");
    }
    else if (complemento == undefined) {
        res.status(400).send("O complemento está undefined");
    }
    else{
        tela_adm_waysafe_model.cadastrarConc(cnpj,cep,complemento,nome,email,telefone)
        .then(resposta=>{
            console.log(`Concessionaria com o email ${email} cadastrado!`);
            res.json(resposta)
        }
    ).catch(erro=>{
        console.log("Houve um erro ao realizar o cadastro");
        console.log(erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);

    })
    }
}



function editarDados(req,res){
    console.log("to no controller")

    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var id = req.body.idServer;

    if(nome==undefined){
        res.status(400).send('Seu nome está undefined!')
    }
    else if(email==undefined){
        res.status(400).send('Seu email está undefined!')
    }
    else if(id==undefined){
        res.status(400).send('Seu id está undefined!')
    }
    else{
        tela_adm_waysafe_model.editarDados(nome,email,id)
        .then(resposta=>{
            console.log("Dados alterados");
            res.status(200).send(resposta)
        })
        .catch(erro=>{
            console.log(erro)
            res.status(500).json(erro.sqlMessage)
        })
    }


}

function editarADM(req,res){
    console.log("to no controller")

    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var id = req.body.idServer;

    if(nome==undefined){
        res.status(400).send('Seu nome está undefined!')
    }
    else if(email==undefined){
        res.status(400).send('Seu email está undefined!')
    }
    else if(id==undefined){
        res.status(400).send('Seu id está undefined!')
    }
    else{
        tela_adm_waysafe_model.editarADM(nome,email,id)
        .then(resposta=>{
            console.log("Dados alterados");
            res.status(200).send(resposta)
        })
        .catch(erro=>{
            console.log(erro)
            res.status(500).json(erro.sqlMessage)
        })
    }
}


function editarConc(req,res){
    var id = req.body.idServer
    var cnpj  =req.body.cnpjServer
    var cep =req.body.cepServer
    var complemento =req.body.complementoServer
    var nome =req.body.nomeServer
    var email =req.body.emailServer
    var telefone =req.body.telefoneServer

    console.log(`CNPJ ${cnpj}`)
    if(nome==undefined){
        res.status(400).send('Seu nome está undefined!')
    }
    else if(email==undefined){
        res.status(400).send('Seu email está undefined!')
    }
    else if(id==undefined){
        res.status(400).send('Seu id está undefined!')
    }
    else{
        tela_adm_waysafe_model.editarConc(id,cnpj,cep,complemento,nome,email,telefone)
        .then(resposta=>{
            console.log("Dados alterados");
            res.status(200).send(resposta)
        })
        .catch(erro=>{
            console.log(erro)
            res.status(500).json(erro.sqlMessage)
        })
    }
}

function removerADM(req,res){
    var id = req.body.idServer;
    if(id==undefined){
        res.status(400).send('Seu id está undefined!')
    }
    else{
        tela_adm_waysafe_model.removerADM(id)
        .then(resposta=>{
            console.log(`ADM com id ${id} removido`);
            res.status(200).send(resposta)
        })
        .catch(erro=>{
            console.log(erro)
            res.status(500).json(erro.sqlMessage)
        })
    }


}

function removerConc(req,res){
    var id = req.body.idServer;
    if(id==undefined){
        res.status(400).send('Seu id está undefined!')
    }
    else{
        tela_adm_waysafe_model.removerConc(id)
        .then(resposta=>{
            console.log(`Concessionaria com id ${id} removido`);
            res.status(200).send(resposta)
        })
        .catch(erro=>{
            console.log(erro)
            res.status(500).json(erro.sqlMessage)
        })
    }


}




module.exports = {
  pegarFuncAdm,
  editarDados,
  cadastrar,
  editarADM,
  removerADM,
  cadastrarConc,
  removerConc,
  editarConc
};