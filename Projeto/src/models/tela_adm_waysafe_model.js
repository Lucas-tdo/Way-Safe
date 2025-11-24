var database = require("../database/config");


// SELECT * FROM USUARIO;
// Não vai ficar 100% funcional pois não tem definição de usuário adm e comum...
function pegarFuncAdm(){
    var instrucaoSql = `
    SELECT * FROM USUARIO;
    `;

    return database.executar(instrucaoSql);
}

module.exports = {
  pegarFuncAdm
};