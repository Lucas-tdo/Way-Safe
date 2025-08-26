var database = require("../database/config")

function listar(situacao){
        var instrucaoSql = `
        select * from camisa where situacao="${situacao}" order by idcamisa desc;
        `
    return database.executar(instrucaoSql);
}

function aprovar(idcamisa){
    var instrucaoSql = `
        update camisa set situacao="aprovado" where idcamisa=${idcamisa};
        `
    return database.executar(instrucaoSql);
}

 async function deletar(idcamisa){
    await deletarcomentarios(idcamisa)
    await deletarfavoritos(idcamisa)
    var instrucaoSql = `
        delete from camisa where idcamisa=${idcamisa};
        `
    return database.executar(instrucaoSql);
}

 async function deletarcomentarios(idcamisa){
    var instrucaoSql = `
        delete from comentario where idcamisa=${idcamisa};
        `
    return database.executar(instrucaoSql);
}

 async function deletarfavoritos(idcamisa){
    var instrucaoSql = `
        delete from favoritas where idcamisa=${idcamisa};
        `
    return database.executar(instrucaoSql);
}


module.exports = {
    listar,
    aprovar,
    deletar
}