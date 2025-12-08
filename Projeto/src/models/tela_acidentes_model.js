var database = require("../database/config")


function municipio_mais_acidentes(fk_empresa, ano) {
    console.log("Executando municipio_mais_vitimas para empresa:", fk_empresa);

    var instrucaoSql = `
        select a.municipio as municipio, (
        SUM(v.vitima_fatal) +
        SUM(v.vitima_fer_leve) +
        SUM(v.vitima_fer_media) +
        SUM(v.vitima_fer_grave) +
        SUM(v.vitimas_fer_seminfo) +
        SUM(v.vitima_ilesa)
    ) as total_vitima from ACIDENTE as a
    JOIN VITIMAS as v on a.idACIDENTE=v.fk_acidente 
    WHERE a.municipio is not null and a.fk_empresa=${fk_empresa} ${(!ano || ano === 'undefined') ? '' : `and year(a.data_hora)=${ano}`}
    group by a.municipio
    order by total_vitima desc
    limit 10;
    `;

    console.log("SQL municipio mais acidentes:", instrucaoSql);
    return database.executar(instrucaoSql);
}

function quantiaPorTipoAcidente(fk_empresa, ano) {
    console.log("Executando quantiaPorTipoAcidente para empresa:", fk_empresa, ano);

    var instrucaoSql = `
    select c.descr, (
        SUM(v.vitima_fatal) +
        SUM(v.vitima_fer_leve) +
        SUM(v.vitima_fer_media) +
        SUM(v.vitima_fer_grave) +
        SUM(v.vitimas_fer_seminfo) +
        SUM(v.vitima_ilesa)
    ) as total_vitima_fatais from ACIDENTE as a
    JOIN VITIMAS as v on a.idACIDENTE=v.fk_acidente 
    JOIN classe_acidente as c on a.fk_classe_acid=c.idClasse_acid
    WHERE a.municipio is not null and a.fk_empresa=${fk_empresa} 
    ${(!ano || ano === 'undefined') ? '' : `and year(a.data_hora)=${ano}`}
    group by c.descr
    order by total_vitima_fatais desc;
    `

    console.log("SQL quantidade por tipo de acidente:", instrucaoSql);
    return database.executar(instrucaoSql);
}

function total_de_acidentes(fk_empresa, ano) {
    console.log("Executando totalDeAcidentes para empresa:", fk_empresa, ano);

var instrucaoSql = `
    select 
        count(*) as total
    from acidente 
    where fk_empresa = ${fk_empresa} 
    ${(!ano || ano === 'undefined') ? '' : `and year(data_hora)="${ano}"`}
`;


    console.log("SQL total de acidentes:", instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    municipio_mais_acidentes,
    quantiaPorTipoAcidente,
    total_de_acidentes
};