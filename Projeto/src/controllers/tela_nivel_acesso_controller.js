var tela_nivel_acesso_model = require("../models/tela_nivel_acesso_model");

function pegarDescricao(req, res){
    console.log("Pegando descrição:");

    tela_nivel_acesso_model.pegarDescricao()
        .then(resposta => {
            console.log(resposta);
            res.json(resposta);
        })
        .catch(erro => {
            console.log("Erro ao pegar descrição", erro);
            res.status(500).json(erro.sqlMessage || erro);
        });
}

function cadastrar(req, res) {
    const idNivel = req.body.idNivelServer
    const descricao = req.body.descricaoServer;

    tela_nivel_acesso_model.cadastrar(descricao)
        .then(() => {
             res.status(200).json("OK")
        })
        .catch(erro => {
            console.log(erro);
            res.status(500).json("Falha ao cadastrar");
        });
}  

    function deletarNivel(req,res){

        var idNivel = req.params.idNivel


        if(idNivel==undefined){
            res.status(400).send('Seu idUsuario está undefined!')
        }
        else{
            tela_nivel_acesso_model.deletarNivel(idNivel)
            .then(resposta=>{
                res.json(resposta)
            })
            .catch(erro=>{
                console.log(erro)
                res.status(500).json(erro.sqlMessage)
            })
        }
    }


module.exports = {
    pegarDescricao,
    cadastrar,
     deletarNivel
};