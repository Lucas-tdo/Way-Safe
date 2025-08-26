var database = require("../database/config")

function pegar_dados(id){
    var instrucaoSql = `
    select * from idolo where ididolo=${id};
    `
    return database.executar(instrucaoSql);
}

function dados_titulos(id){
    var instrucaoSql = `
    select t.idtitulo,t.nome,t.imagem,t.ano from titulo_dos_idolos ti
    join titulo t on
    t.idtitulo = ti.idtitulo where ididolo=${id};
    `
    return database.executar(instrucaoSql);
}

function enviarcomentario(idusuario,comentario,ididolo){
    var instrucaoSql = `
    insert into comentario value
    (default,${idusuario},'${comentario}','${ididolo}',null,null,default);
    `
    return database.executar(instrucaoSql);
}

    function pegarcomentarios(ididolo){
        var instrucaoSql = `
        select comentario,year(data) as ano,month(data) as mes,day(data) as dia,u.nome,u.imagem from comentario c join usuario u on
        u.idusuario=c.idusuario where c.ididolo=${ididolo} order by data desc;
        `
    return database.executar(instrucaoSql);
    }

module.exports = {
    pegar_dados,
    dados_titulos,
    enviarcomentario,
    pegarcomentarios
}