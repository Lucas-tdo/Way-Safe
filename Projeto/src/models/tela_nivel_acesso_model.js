var database = require("../database/config");

function pegarDescricao() {
    return database.executar(`
        SELECT * FROM NIVEL_ACESSO;
    `);
}


function cadastrar(descricao) {
    return database.executar(`
        INSERT INTO NIVEL_ACESSO(descricao)
        VALUES ('${descricao}');
    `);
}

function deletarNivel(idNivel) {
    return database.executar(`
        DELETE FROM NIVEL_ACESSO WHERE idNivelAcesso = ${idNivel};
    `);
}


module.exports = {
    pegarDescricao,
    cadastrar,
    deletarNivel
};