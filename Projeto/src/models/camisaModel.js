var database = require("../database/config")

function adicionarimagens(){
    var instrucaoSql = `
    select * from camisa order by ano desc;
    `
    return database.executar(instrucaoSql);
}

function checarfavoritos(id){
    var instrucaoSql = `
    select idcamisa from favoritas where idusuario=${id};
    `
    return database.executar(instrucaoSql);
}

function favoritar(usuario,camisa){
    var instrucaoSql = `
    insert into favoritas values(${usuario},${camisa});
    `
    return database.executar(instrucaoSql);
}

function desfavoritar(usuario,camisa){
    var instrucaoSql = `
    delete from favoritas where idusuario=${usuario} and idcamisa=${camisa};
    `
    return database.executar(instrucaoSql);
}

function top_favoritas(){
    var instrucaoSql = `
        select c.imagem,count(*) as ordem from camisa c join
        favoritas f on
        f.idcamisa=c.idcamisa  group by f.idcamisa,c.imagem order by count(*) desc limit 10 ;
    `
    return database.executar(instrucaoSql);
}

function pegar_dados(id){
    var instrucaoSql = `
    select c.nome,c.imagem,c.preco,c.marca,c.ano,u.nome as nome_user,u.imagem as imagem_user from camisa c join usuario u on
    c.idusuario = u.idusuario
    where idcamisa=${id} ;
    `
    return database.executar(instrucaoSql);
}

function enviarcomentario(idusuario,comentario,idcamisa){
    var instrucaoSql = `
    insert into comentario value
    (default,${idusuario},'${comentario}',null,null,${idcamisa},default);
    `
    return database.executar(instrucaoSql);
}

function pegarcomentarios(idcamisa){
        var instrucaoSql = `
        select comentario,year(data) as ano,month(data) as mes,day(data) as dia,u.nome,u.imagem from comentario c join usuario u on
        u.idusuario=c.idusuario where c.idcamisa=${idcamisa} order by data desc;
        `
    return database.executar(instrucaoSql);
    }

function cadastrar_camisa(idusuario,tipo,preco,marca,ano,imagem){
    var instrucaoSql = `
        insert into camisa values
        (default,${idusuario},'${tipo}','image/camisas/${imagem}','${preco}','${marca}','${ano}',default);
        `
    return database.executar(instrucaoSql);
}


module.exports = {
    adicionarimagens,
    favoritar,
    desfavoritar,
    checarfavoritos,
    top_favoritas,
    pegar_dados,
    pegarcomentarios,
    enviarcomentario,
    cadastrar_camisa
}