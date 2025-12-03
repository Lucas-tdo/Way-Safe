var database = require("../database/config")

function pegarSenha(email,senha){
    console.log("na model em pegar a senha do usuário")
    var instrucaoSql = `
        SELECT * FROM USUARIO WHERE email='${email}' and senha=SHA2('${senha}', 256); 
    `
     console.log(senha);   
    return database.executar(instrucaoSql);
}

function checaremail(email){
    var instrucaoSql = `
        SELECT * FROM USUARIO WHERE email='${email}';
    `;
    return database.executar(instrucaoSql);
}
function checarEmpresa(empresa){
    var instrucaoSql = `
        SELECT * FROM EMPRESA WHERE idEMPRESA='${empresa}';
    `;
    return database.executar(instrucaoSql);
}

function atualizarSenha(senha,idUSUARIO){
    var instrucaoSql = `
        UPDATE USUARIO SET senha =SHA2('${senha}', 256) WHERE idUSUARIO = ${idUSUARIO};
    `;
    return database.executar(instrucaoSql);

}


function cadastrarFuncionario(nome,email,senha,fk_empresa,nivel_acesso){
    var instrucaoSql = `
        INSERT INTO USUARIO (nome,email,senha,fk_empresa,nivel_acesso_fk) VALUES ('${nome}','${email}',SHA2('${senha}',256),${fk_empresa},${nivel_acesso});
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
    autenticar,
    checarEmpresa,
    pegarSenha,
    atualizarSenha,
    cadastrarFuncionario
}