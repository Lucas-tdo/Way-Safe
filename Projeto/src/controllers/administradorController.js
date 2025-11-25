var administradorModel = require("../models/administradorModel");

function editarDados(req,res){
    console.log("to no controller")

    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var id = req.body.idServer;

    if(nome==undefined){
        res.status(400).send('Seu nome está undefined!')
    }
    else if(email==undefined){
        res.status(400).send('Seu email está undefined!')
    }
    else if(senha==undefined){
        res.status(400).send('Sua senha está undefined!')
    }
    else if(id==undefined){
        res.status(400).send('Seu id está undefined!')
    }
    else{
        administradorModel.editarDados(nome,email,senha,id)
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
module.exports={
    editarDados
}