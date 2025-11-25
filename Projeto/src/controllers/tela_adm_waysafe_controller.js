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


module.exports = {
  pegarFuncAdm
};