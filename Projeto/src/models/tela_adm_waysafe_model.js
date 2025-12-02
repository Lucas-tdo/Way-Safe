var database = require("../database/config");


// SELECT * FROM USUARIO;
// Não vai ficar 100% funcional pois não tem definição de usuário adm e comum...
function pegarFuncAdm(){
    var instrucaoSql = `
    SELECT * FROM USUARIO WHERE nivel_acesso_fk=1 ;
    `;

    return database.executar(instrucaoSql);
}

function editarDados(nome,email,id){
        var instrucaoSql = `
            UPDATE USUARIO SET nome='${nome}',email='${email}' WHERE idUSUARIO=${id};
        `
    return database.executar(instrucaoSql);
}

function cadastrar(nome,email,senha){
    var instrucaoSql = `
        INSERT INTO USUARIO (nome,email,senha,nivel_acesso_fk) VALUES ('${nome}','${email}',SHA2('${senha}',256),1);
    `;
    return database.executar(instrucaoSql);
}

function editarADM(nome,email,id){
    var instrucaoSql = `
        UPDATE usuario SET nome='${nome}',email='${email}' WHERE idUSUARIO=${id};
    `;
    return database.executar(instrucaoSql);
}

function removerADM(id){
  var instrucaoSql = `
        DELETE from usuario WHERE idUSUARIO=${id};
    `;
    return database.executar(instrucaoSql);
}

function cadastrarConc(CNPJ,CEP,complemento,NOME,EMAIL,TELEFONE){

    var instrucaoSql = "";
    if (CNPJ == "vazio" && CEP == "vazio" && complemento == "vazio" && TELEFONE == "vazio") {
        instrucaoSql = `
            INSERT INTO EMPRESA (NOME, EMAIL)
            VALUES ('${NOME}', '${EMAIL}');
        `;
    }
    else if (CEP == "vazio" && complemento == "vazio" && TELEFONE == "vazio") {
        instrucaoSql = `
            INSERT INTO EMPRESA (CNPJ, NOME, EMAIL)
            VALUES ('${CNPJ}', '${NOME}', '${EMAIL}');
        `;
    }
    else if (CNPJ == "vazio" && complemento == "vazio" && TELEFONE == "vazio") {
        instrucaoSql = `
            INSERT INTO EMPRESA (CEP, NOME, EMAIL)
            VALUES ('${CEP}', '${NOME}', '${EMAIL}');
        `;
    }
    else if (CNPJ == "vazio" && CEP == "vazio" && TELEFONE == "vazio") {
        instrucaoSql = `
            INSERT INTO EMPRESA (complemento, NOME, EMAIL)
            VALUES ('${complemento}', '${NOME}', '${EMAIL}');
        `;
    }
    else if (CNPJ == "vazio" && CEP == "vazio" && complemento == "vazio") {
        instrucaoSql = `
            INSERT INTO EMPRESA (TELEFONE, NOME, EMAIL)
            VALUES ('${TELEFONE}', '${NOME}', '${EMAIL}');
        `;
    }
    else if (complemento == "vazio" && TELEFONE == "vazio") {
        instrucaoSql = `
            INSERT INTO EMPRESA (CNPJ, CEP, NOME, EMAIL)
            VALUES ('${CNPJ}', '${CEP}', '${NOME}', '${EMAIL}');
        `;
    }
    else if (CEP == "vazio" && TELEFONE == "vazio") {
        instrucaoSql = `
            INSERT INTO EMPRESA (CNPJ, complemento, NOME, EMAIL)
            VALUES ('${CNPJ}', '${complemento}', '${NOME}', '${EMAIL}');
        `;
    }
    else if (CEP == "vazio" && complemento == "vazio") {
        instrucaoSql = `
            INSERT INTO EMPRESA (CNPJ, TELEFONE, NOME, EMAIL)
            VALUES ('${CNPJ}', '${TELEFONE}', '${NOME}', '${EMAIL}');
        `;
    }
    else {
        instrucaoSql = `
            INSERT INTO EMPRESA (CNPJ, CEP, complemento, NOME, EMAIL, TELEFONE)
            VALUES ('${CNPJ}', '${CEP}', '${complemento}', '${NOME}', '${EMAIL}', '${TELEFONE}');
        `;
    }

    return database.executar(instrucaoSql);   
}

function removerConc(id){
  var instrucaoSql = `
        DELETE FROM EMPRESA	WHERE idEMPRESA=${id};
    `;
    return database.executar(instrucaoSql);
}

function editarConc(idEMPRESA, CNPJ, CEP, complemento, NOME, EMAIL, TELEFONE) {
    let instrucaoSql = "";
    if (CNPJ == "vazio" && CEP == "vazio" && complemento == "vazio" && TELEFONE == "vazio") {
        instrucaoSql = `
            UPDATE EMPRESA SET
                NOME = '${NOME}',
                EMAIL = '${EMAIL}'
            WHERE idEMPRESA = ${idEMPRESA};
        `;
    }
    else if (CEP == "vazio" && complemento == "vazio" && TELEFONE == "vazio") {
        instrucaoSql = `
            UPDATE EMPRESA SET
                CNPJ = '${CNPJ}',
                NOME = '${NOME}',
                EMAIL = '${EMAIL}'
            WHERE idEMPRESA = ${idEMPRESA};
        `;
    }
    else if (CNPJ == "vazio" && complemento == "vazio" && TELEFONE == "vazio") {
        instrucaoSql = `
            UPDATE EMPRESA SET
                CEP = '${CEP}',
                NOME = '${NOME}',
                EMAIL = '${EMAIL}'
            WHERE idEMPRESA = ${idEMPRESA};
        `;
    }
    else if (CNPJ == "vazio" && CEP == "vazio" && TELEFONE == "vazio") {
        instrucaoSql = `
            UPDATE EMPRESA SET
                complemento = '${complemento}',
                NOME = '${NOME}',
                EMAIL = '${EMAIL}'
            WHERE idEMPRESA = ${idEMPRESA};
        `;
    }
    else if (CNPJ == "vazio" && CEP == "vazio" && complemento == "vazio") {
        instrucaoSql = `
            UPDATE EMPRESA SET
                TELEFONE = '${TELEFONE}',
                NOME = '${NOME}',
                EMAIL = '${EMAIL}'
            WHERE idEMPRESA = ${idEMPRESA};
        `;
    }
    else if (complemento == "vazio" && TELEFONE == "vazio") {
        instrucaoSql = `
            UPDATE EMPRESA SET
                CNPJ = '${CNPJ}',
                CEP = '${CEP}',
                NOME = '${NOME}',
                EMAIL = '${EMAIL}'
            WHERE idEMPRESA = ${idEMPRESA};
        `;
    }
    else if (CEP == "vazio" && TELEFONE == "vazio") {
        instrucaoSql = `
            UPDATE EMPRESA SET
                CNPJ = '${CNPJ}',
                complemento = '${complemento}',
                NOME = '${NOME}',
                EMAIL = '${EMAIL}'
            WHERE idEMPRESA = ${idEMPRESA};
        `;
    }
    else if (CEP == "vazio" && complemento == "vazio") {
        instrucaoSql = `
            UPDATE EMPRESA SET
                CNPJ = '${CNPJ}',
                TELEFONE = '${TELEFONE}',
                NOME = '${NOME}',
                EMAIL = '${EMAIL}'
            WHERE idEMPRESA = ${idEMPRESA};
        `;
    }
    else {
        instrucaoSql = `
            UPDATE EMPRESA SET
                CNPJ = '${CNPJ}',
                CEP = '${CEP}',
                complemento = '${complemento}',
                NOME = '${NOME}',
                EMAIL = '${EMAIL}',
                TELEFONE = '${TELEFONE}'
            WHERE idEMPRESA = ${idEMPRESA};
        `;
    }

    return database.executar(instrucaoSql);
}



module.exports = {
  pegarFuncAdm,
  editarDados,
  cadastrar,
  editarADM,
  removerADM,
  cadastrarConc,
  removerConc,
  editarConc
};