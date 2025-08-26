var database = require("../database/config")

function qtd_camisas(id){
    var instrucaoSql = `
    select count(*) as quantidade from favoritas where idusuario=${id};
    `
    return database.executar(instrucaoSql);
}

function listar(id){
    var instrucaoSql = `
   select c.nome,c.imagem,c.preco,c.marca,c.ano from camisa c join favoritas f on 
    f.idcamisa=c.idcamisa where f.idusuario=${id};
    `
    return database.executar(instrucaoSql);
}

function anofavoritado(id){
    var instrucaoSql = `
    select ano,count(*) as quantidade from favoritas f join camisa c on
    c.idcamisa=f.idcamisa
    where f.idusuario=${id} group by ano order by count(*) desc limit 5;
    `
    return database.executar(instrucaoSql);
}

function marcafavoritada(id){
    var instrucaoSql = `
    select marca,count(*) as quantidade from favoritas f join camisa c on 
    f.idcamisa=c.idcamisa
    where f.idusuario=${id} group by marca order by count(*) desc limit 5;
    `
    return database.executar(instrucaoSql);
}
module.exports = {
    qtd_camisas,
    listar,
    anofavoritado,
    marcafavoritada
}