var database = require("../database/config");

function pegarDescricao() {
    return database.executar(`
        SELECT descricao FROM NIVEL_ACESSO;
    `);
}


function cadastrar(idNivel, descricao) {
    return database.executar(`
        INSERT INTO nivelAcesso (nome, descricao)
        VALUES ('${idNivel}','${descricao}');
    `);
}


module.exports = {
    pegarDescricao,
    cadastrar
};