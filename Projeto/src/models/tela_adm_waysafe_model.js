var database = require("../database/config");


// SELECT * FROM USUARIO;
// Não vai ficar 100% funcional pois não tem definição de usuário adm e comum...
function pegarFuncAdm(){
    var instrucaoSql = `
    SELECT * FROM USUARIO;
    `;

    return database.executar(instrucaoSql);
}

function editarDados(nome,email, senha, id){
    if(senha=="" || senha==null || senha==" "){
        var instrucaoSql = `
            UPDATE USUARIO SET nome='${nome}',email='${email}',senha =SHA2('${senha}', 256) WHERE idUSUARIO=${id};
        `
    }
    else{
        var instrucaoSql = `
            UPDATE USUARIO SET nome='${nome}',email='${email}' WHERE idUSUARIO=${id};
        `
    }
    return database.executar(instrucaoSql);
}


module.exports = {
  pegarFuncAdm,
  editarDados
};