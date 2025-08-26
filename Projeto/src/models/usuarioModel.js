var database = require("../database/config")

function cadastrar(nome,email,senha){
    var instrucaoSql = `
        INSERT INTO usuario (nome,email,senha) VALUES ('${nome}','${email}','${senha}');
    `;
    return database.executar(instrucaoSql);
}

function autenticar(email,senha){
    var instrucaoSql = `
        SELECT * FROM usuario WHERE email="${email}" and senha="${senha}";
    `;
    return database.executar(instrucaoSql);
}
module.exports = {
    cadastrar,
    autenticar
}