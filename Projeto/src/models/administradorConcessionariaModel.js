var database = require("../database/config")

function listar_funcionarios(fk_empresa){
    console.log("to no model")
        var instrucaoSql = `
        select * from USUARIO where fk_empresa = ${fk_empresa};
        `
    return database.executar(instrucaoSql);
}
function dados_funcionarios(funcionarioId){
    console.log("to no model")
        var instrucaoSql = `
        select * from USUARIO where idUSUARIO = ${funcionarioId}; ;
        `
    return database.executar(instrucaoSql);
}
function atualizar_dados(funcionarioId,nome,email){
    console.log("to no model")
        var instrucaoSql = `
            update USUARIO set email = "${email}", nome = "${nome}" where idUSUARIO = ${funcionarioId};
        `
    return database.executar(instrucaoSql);
}
function excluir_funf(funcionarioId){

        var instrucaoSql = `
            DELETE FROM USUARIO WHERE idUSUARIO = ${funcionarioId};
        `
    return database.executar(instrucaoSql);
}

module.exports = {
    listar_funcionarios,
    dados_funcionarios,
    atualizar_dados,
    excluir_funf
}