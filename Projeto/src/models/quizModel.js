var database = require("../database/config")

function addpontuacao(pontuacao,acertos,id){
    var instrucaoSql = `
    insert into quiz(acertos,pontos,fkusuario) values (${pontuacao},${acertos},${id});
    `
    return database.executar(instrucaoSql);
}

function ultimaspont(id){
    var instrucaoSql = `
        select (select count(idquiz) from quiz where fkusuario=${id}) as qtdjogadas,idquiz,acertos,pontos from quiz where fkusuario=${id} order by idquiz desc limit 5; 
    `;
    return database.executar(instrucaoSql);
}

function dadosquiz(id){
    var instrucaoSql = `
            select max(acertos) as maximo,round(avg(acertos),0) as media ,(select round(avg(acertos),0) from quiz) as mediageral from quiz where fkusuario=${id}; 
    `;
    return database.executar(instrucaoSql);
}
module.exports = {
    addpontuacao,
    ultimaspont,
    dadosquiz
}