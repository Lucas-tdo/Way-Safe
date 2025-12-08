var database = require("../database/config");

function pegarDescricao() {
    return database.executar(`
        SELECT descricao FROM NIVEL_ACESSO;
    `);
}


function cadastrar(descricao) {
    return database.executar(`
        INSERT INTO NIVEL_ACESSO(descricao)
        VALUES ('${descricao}');
    `);
}


module.exports = {
    pegarDescricao,
    cadastrar
};