var database = require("../database/config")

function editarDados(nome,email, senha, id){
    console.log("to no model")
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
    editarDados
}