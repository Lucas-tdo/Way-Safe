var database = require("../database/config");

//SELECT * FROM EMPRESA;
function pegarEmpresas(){
    var instrucaoSql = `
    SELECT * FROM EMPRESA;
    `;

    return database.executar(instrucaoSql);
}

module.exports = {
    pegarEmpresas
};