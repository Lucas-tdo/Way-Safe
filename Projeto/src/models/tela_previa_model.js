var database = require("../database/config");

function qtdAcidentes(fk_empresa, anoSelecionado) {
    var instrucaoSql = `
        SELECT COUNT(*) AS qtd_Acidente 
        FROM ACIDENTE 
        WHERE fk_empresa = ${fk_empresa}
    `;

    if (anoSelecionado && !isNaN(anoSelecionado)) {
        instrucaoSql += ` AND YEAR(data_hora) = ${anoSelecionado}`;
    }

    instrucaoSql += ";";
    return database.executar(instrucaoSql);
}

function trechoCritico(fk_empresa, anoSelecionado) {
    var instrucaoSql = `
        SELECT rodovia_cod_numeric AS rodovia,
               COUNT(*) AS qtd 
        FROM RODOVIAS 
        JOIN ACIDENTE ON idRODOVIAS = fk_rodovias 
        WHERE fk_empresa = ${fk_empresa}
    `;

    if (anoSelecionado && !isNaN(anoSelecionado)) {
        instrucaoSql += ` AND YEAR(data_hora) = ${anoSelecionado}`;
    }

    instrucaoSql += `
        GROUP BY rodovia_cod_numeric 
        ORDER BY qtd DESC 
        LIMIT 1;
    `;
    return database.executar(instrucaoSql);
}

function top10(fk_empresa, anoSelecionado) {
    var instrucaoSql = `
        SELECT municipio,
               COUNT(*) AS qtd 
        FROM ACIDENTE 
        WHERE fk_empresa = ${fk_empresa}
    `;

    if (anoSelecionado && !isNaN(anoSelecionado)) {
        instrucaoSql += ` AND YEAR(data_hora) = ${anoSelecionado}`;
    }

    instrucaoSql += `
        GROUP BY municipio 
        ORDER BY qtd DESC 
        LIMIT 10;
    `;
    return database.executar(instrucaoSql);
}

function anosAcidentes(fk_empresa) {
    var instrucaoSql = `
        SELECT DISTINCT YEAR(data_hora) AS ano
        FROM ACIDENTE
        WHERE fk_empresa = ${fk_empresa}
        ORDER BY ano DESC;
    `;
    return database.executar(instrucaoSql);
}

function PiorMes(fk_empresa, anoSelecionado) {
    var instrucaoSql = `
        SELECT MONTH(data_hora) AS mes,
               COUNT(*) AS total_acidente 
        FROM ACIDENTE 
        WHERE fk_empresa = ${fk_empresa}
    `;

    if (anoSelecionado && !isNaN(anoSelecionado)) {
        instrucaoSql += ` AND YEAR(data_hora) = ${anoSelecionado}`;
    }

    instrucaoSql += `
        GROUP BY mes 
        ORDER BY total_acidente DESC;
    `;
    return database.executar(instrucaoSql);
}

function top5MaisTiposAcidentes(fk_empresa, anoSelecionado) {
    var instrucaoSql = `
        SELECT descr AS tipo,
               COUNT(*) AS qtd,
               fk_classe_acid AS classe  
        FROM ACIDENTE 
        JOIN classe_acidente ON fk_classe_acid = idClasse_acid  
        WHERE fk_empresa = ${fk_empresa}
    `;

    if (anoSelecionado && !isNaN(anoSelecionado)) {
        instrucaoSql += ` AND YEAR(data_hora) = ${anoSelecionado}`;
    }

    instrucaoSql += `
        GROUP BY tipo, classe 
        ORDER BY qtd DESC 
        LIMIT 5;
    `;
    return database.executar(instrucaoSql);
}

module.exports = {
    qtdAcidentes,
    trechoCritico,
    top10,
    PiorMes,
    top5MaisTiposAcidentes,
    anosAcidentes
};
