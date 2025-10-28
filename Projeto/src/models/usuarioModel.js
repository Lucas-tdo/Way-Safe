var database = require("../database/config")


function checaremail(email){
    var instrucaoSql = `
        SELECT * FROM USUARIO WHERE email='${email}';
    `;
    return database.executar(instrucaoSql);
}
function checarEmpresa(empresa){
    var instrucaoSql = `
        SELECT * FROM USUARIO WHERE EMPRESA='${empresa}';
    `;
    return database.executar(instrucaoSql);
}


function cadastrar(nome,email,senha,fk_empresa){
    var instrucaoSql = `
        INSERT INTO USUARIO (nome,email,senha,fk_empresa) VALUES ('${nome}','${email}',SHA2('${senha}',256),${fk_empresa});
    `;
    return database.executar(instrucaoSql);
}

function autenticar(email,senha){
    var instrucaoSql = `
        SELECT * FROM USUARIO WHERE email="${email}" and senha =SHA2('${senha}', 256);
    `;
    return database.executar(instrucaoSql);
}
module.exports = {
    checaremail,
    cadastrar,
    autenticar,
    checarEmpresa
}