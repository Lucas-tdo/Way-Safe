var database = require("../database/config")


function qtdAcidentes(fk_empresa){
    var instrucaoSql = `
        select count(*) as qtd_Acidente from acidente where fk_empresa = ${fk_empresa};
    `;
    return database.executar(instrucaoSql);
}

function trechoCritico(fk_empresa){
    var instrucaoSql = `
            select rodovia_cod_numeric as rodovia ,count(*) as qtd from RODOVIAS join acidente on  idRODOVIAS = fk_rodovias where fk_empresa = ${fk_empresa} group by rodovia_cod_numeric order by qtd desc limit 1 ;

    `;
    return database.executar(instrucaoSql);
}

function top10(fk_empresa){
    var instrucaoSql = `
               select municipio,count(*)as qtd from acidente where fk_empresa = ${fk_empresa} group by municipio order by qtd desc limit 10 ;
`    
return database.executar(instrucaoSql);
}
function PiorMes(fk_empresa){
    var instrucaoSql = `
              select month(data_hora) as mes, count(*) as total_acidente from acidente where fk_empresa = ${fk_empresa} group by mes order by total_acidente desc;
`    
return database.executar(instrucaoSql);
}

function top5MaisTiposAcidentes(fk_empresa){
    var instrucaoSql = `
              select  descr as tipo, count(*) as qtd  from acidente join classe_acidente on fk_classe_acid = idClasse_acid  where fk_empresa = ${fk_empresa} group by tipo order by qtd desc limit 5;
`    
return database.executar(instrucaoSql);
}

module.exports = {
    qtdAcidentes,
    trechoCritico,
    top10,
    PiorMes,
    top5MaisTiposAcidentes

}