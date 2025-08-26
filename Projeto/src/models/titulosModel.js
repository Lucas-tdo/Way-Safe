var database = require("../database/config")

function pegar_dados(id){
    var instrucaoSql = `
    select * from titulo where idtitulo=${id};
    `
    return database.executar(instrucaoSql);
}

function dados_idolos(id){
    var instrucaoSql = `
        select i.ididolo,i.nome,i.imagem,i.chegada,i.saida from titulo_dos_idolos ti
        join idolo i on
        i.ididolo = ti.ididolo where idtitulo=${id};
        `
    return database.executar(instrucaoSql);
}

function enviarcomentario(idusuario,comentario,idtitulo){
    var instrucaoSql = `
    insert into comentario value
    (default,${idusuario},'${comentario}',null,${idtitulo},null,default);
    `
    return database.executar(instrucaoSql);
}

function pegarcomentarios(idtitulo){
        var instrucaoSql = `
        select comentario,year(data) as ano,month(data) as mes,day(data) as dia,u.nome,u.imagem from comentario c join usuario u on
        u.idusuario=c.idusuario where c.idtitulo=${idtitulo} order by data desc;
        `
    return database.executar(instrucaoSql);
    }

module.exports = {
    pegar_dados,
    dados_idolos,
    enviarcomentario,
    pegarcomentarios
}