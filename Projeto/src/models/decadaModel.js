var database = require("../database/config")

function dadosidolo(){
    var instrucaoSql = `
    select * from idolo;
    `
    return database.executar(instrucaoSql);
}

function dadostitulo(){
    var instrucaoSql = `
    select * from titulo;
    `
    return database.executar(instrucaoSql);
}

module.exports = {
    dadosidolo,
    dadostitulo
}