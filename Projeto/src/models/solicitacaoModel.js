var database = require("../database/config")

function adicionarimagens(idusuario){
        var instrucaoSql = `
        select * from camisa where idusuario=${idusuario} order by idcamisa desc ;
        `
    return database.executar(instrucaoSql);
    }

module.exports = {
    adicionarimagens
}