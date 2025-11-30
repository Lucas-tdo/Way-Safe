var database = require("../database/config");

function qtdAcidentes(fk_empresa, anoSelecionado,rodoviaSelecionada) {
    var instrucaoSql = `
        SELECT COUNT(*) AS qtd_Acidente 
        FROM ACIDENTE 
        WHERE fk_empresa = ${fk_empresa} AND fk_rodovias = (SELECT idRODOVIAS FROM RODOVIAS where rodovia_cod_numeric = "${rodoviaSelecionada}")
    `;

    if (anoSelecionado &&  anoSelecionado != "null") {
        instrucaoSql += ` AND YEAR(data_hora) = ${anoSelecionado}`;
    }

    instrucaoSql += ";";
    return database.executar(instrucaoSql);
}

function nomeRodovia(rodoviaSelecionada){
    var instrucaoSql = `
        SELECT rodovia_cod_numeric
        FROM RODOVIAS WHERE idRODOVIAS = "${rodoviaSelecionada}";
        `

    return database.executar(instrucaoSql);
}

function anosAcidentes(fk_empresa,rodoviaSelecionada) {
    var instrucaoSql = `
        SELECT DISTINCT YEAR(data_hora) AS ano
        FROM ACIDENTE
        WHERE fk_empresa = ${fk_empresa}
        ORDER BY ano DESC;
    `;
    return database.executar(instrucaoSql);
}

function top5MaisTiposAcidentes(fk_empresa, anoSelecionado,rodoviaSelecionada) {
    var instrucaoSql = `
        SELECT descr AS tipo,
               COUNT(*) AS qtd,
               fk_classe_acid AS classe  
        FROM ACIDENTE 
        JOIN classe_acidente ON fk_classe_acid = idClasse_acid  
        WHERE fk_empresa = ${fk_empresa} AND fk_rodovias = (SELECT idRODOVIAS FROM RODOVIAS where rodovia_cod_numeric = "${rodoviaSelecionada}")
    `;

    if (anoSelecionado &&  anoSelecionado != "null") {
        instrucaoSql += ` AND YEAR(data_hora) = ${anoSelecionado}`;
    }

    instrucaoSql += `
        GROUP BY tipo, classe 
        ORDER BY qtd DESC 
        LIMIT 5;
    `;
    return database.executar(instrucaoSql);
}
function municipiosAcidentesQtd(fk_empresa, anoSelecionado,rodoviaSelecionada) {
    var instrucaoSql = `
        SELECT 
            municipio,
            COUNT(*) AS total_acidentes
            FROM ACIDENTE
        WHERE fk_rodovias = (SELECT idRODOVIAS FROM RODOVIAS where rodovia_cod_numeric = "${rodoviaSelecionada}") AND fk_empresa = ${fk_empresa} 
        `;
        
        if (anoSelecionado != "null") {
            instrucaoSql += ` AND YEAR(data_hora) = ${anoSelecionado}`;
        }
        
        console.log(anoSelecionado)

        instrucaoSql += ` 
        GROUP BY municipio
        ORDER BY total_acidentes DESC;
    `;
    return database.executar(instrucaoSql);
}

module.exports = {
    qtdAcidentes,
    top5MaisTiposAcidentes,
    anosAcidentes,
    nomeRodovia,
    municipiosAcidentesQtd
};
