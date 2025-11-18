var tela_concessionaria_model = require("../models/tela_concessionaria_model");

function pegarEmpresas(req, res){
    console.log("Pegando Empresas:");
    
        tela_concessionaria_model.pegarEmpresas()
            .then(resposta => {
                console.log(resposta);
                res.json(resposta); // A função já retorna o objeto formatado
            })
            .catch(erro => {
                console.log("Erro ao pegar empresas", erro);
                res.status(500).json(erro.sqlMessage || erro);
            });
}


module.exports = {
    pegarEmpresas
};