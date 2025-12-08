var database = require("../database/config")

var fk_empresa = 0

function listar_anos() {
    var instrucaoSql = `
        SELECT DISTINCT YEAR(data_hora) as ano 
        FROM ACIDENTE; 
    `;
    console.log("Buscando anos de acidente...");
    return database.executar(instrucaoSql);
}

function listar_rodovias(municipio, denominacao, jurisdicao, fk) {

    var condicoes = [];

    fk_empresa = fk

    condicoes.push(`fk_empresa = ${fk_empresa}`)

    if (municipio != undefined && municipio != '') {
        condicoes.push(`municipio LIKE '${municipio}'`);
    }

    if (denominacao != undefined && denominacao != '') {
        condicoes.push(`denominacao LIKE '${denominacao}'`);
    }

    if (jurisdicao != undefined && jurisdicao != '') {
        condicoes.push(`jurisdicao = ${jurisdicao}`);
    }

    var instrucaoSql = `
        SELECT DISTINCT r.rodovia_cod_numeric as rodovia 
        FROM ACIDENTE 
        JOIN RODOVIAS r ON fk_rodovias = idRodovias
        WHERE ${condicoes.join(' AND ')};  
    `;
    console.log("Buscando anos de acidente...");
    return database.executar(instrucaoSql);
}

function listar_municipios(rodovia, denominacao, jurisdicao) {

    var condicoes = [];

    condicoes.push(`fk_empresa = ${fk_empresa}`)

    if (rodovia != undefined && rodovia != '') {
        condicoes.push(`fk_rodovias = (SELECT idRodovia FROM RODOVIAS where rodovia_cod_numeric = '${rodovia}')`);
    }

    if (denominacao != undefined && denominacao != '') {
        condicoes.push(`denominacao LIKE '${denominacao}'`);
    }

    if (jurisdicao != undefined && jurisdicao != '') {
        condicoes.push(`jurisdicao = '${jurisdicao}'`);
    }

    var instrucaoSql = `
        SELECT DISTINCT municipio 
        FROM ACIDENTE
        WHERE ${condicoes.join(' AND ')};  
    `;
    console.log("Buscando tipos de acidentes...");
    return database.executar(instrucaoSql);
}

function listar_tipos_acidente() {
    var instrucaoSql = `
        SELECT descr as tipo 
        FROM classe_acidente; 
    `;
    console.log("Buscando anos de acidente...");
    return database.executar(instrucaoSql);
}

function listar_denominacao(rodovia, municipio, jurisdicao) {

    var condicoes = [];

    condicoes.push(`fk_empresa = ${fk_empresa}`)

    if (rodovia != undefined && rodovia != '') {
        condicoes.push(`fk_rodovias = (SELECT idRodovia FROM RODOVIAS where rodovia_cod_numeric = '${rodovia}')`);
    }

    if (municipio != undefined && municipio != '') {
        condicoes.push(`municipio LIKE '${municipio}'`);
    }

    if (jurisdicao != undefined && jurisdicao != '') {
        condicoes.push(`jurisdicao = ${jurisdicao}`);
    }

    var instrucaoSql = `
        SELECT DISTINCT denominacao 
        FROM ACIDENTE
        WHERE ${condicoes.join(' AND ')}  
        ; 
    `;
    console.log("Buscando tipos de acidentes...");
    return database.executar(instrucaoSql);
}

function listar_jurisdicao(rodovia, municipio, denominacao) {

    var condicoes = [];

    condicoes.push(`fk_empresa = ${fk_empresa}`)

    if (rodovia != undefined && rodovia != '') {
        condicoes.push(`fk_rodovias = (SELECT idRodovia FROM RODOVIAS where rodovia_cod_numeric = '${rodovia}')`);
    }

    if (municipio != undefined && municipio != '') {
        condicoes.push(`municipio LIKE '${municipio}'`);
    }

    if (denominacao != undefined && denominacao != '') {
        condicoes.push(`denominacao = ${denominacao}`);
    }

    var instrucaoSql = `
        SELECT DISTINCT jurisdicao 
        FROM ACIDENTE; 
    `;
    console.log("Buscando tipos de acidentes...");
    return database.executar(instrucaoSql);
}

function buscar_rodovias(rodovia, municipio, jurisdicao, denominacao, tipoAcidente, dtInicio, dtFim, meteoro, visibilidade, fk_empresa) {
    var instrucaoSql = '';
    var condicoes = [];
    var filtrosPreenchidos = 0;

    if (rodovia != undefined && rodovia != '') {
        condicoes.push(`fk_rodovias = (SELECT idRODOVIAS FROM RODOVIAS where rodovia_cod_numeric = '${rodovia}')`);
    }

    if (municipio != undefined && municipio != '') {
        condicoes.push(`municipio LIKE '${municipio}'`);
    }

    if (jurisdicao != undefined && jurisdicao != '') {
        condicoes.push(`jurisdicao LIKE '${jurisdicao}'`);
    }

    if (denominacao != undefined && denominacao != '') {
        condicoes.push(`denominacao LIKE = '${denominacao}'`);
    }

    if (tipoAcidente != undefined && tipoAcidente != '') {
        condicoes.push(`fk_classe_acid = (SELECT idClasse_acid FROM classe_acidente WHERE descr = '${tipoAcidente}')`);
    }

    if (dtInicio != undefined && dtInicio != '' && dtFim != undefined && dtFim != '') {
        condicoes.push(`data_hora BETWEEN '${dtInicio}' AND '${dtFim}'`);
    }

    if (meteoro != undefined && meteoro != '') {
        condicoes.push(`metereologia LIKE '${meteoro}'`);
    }

    if (visibilidade != undefined && visibilidade != '') {
        condicoes.push(`visibilidade LIKE '${visibilidade}'`);
    }

    if (fk_empresa != undefined && fk_empresa != '') {
        condicoes.push(`fk_empresa = ${fk_empresa}`);
    }

    instrucaoSql = `
                SELECT 
                    IFNULL(rodovia_cod_numeric, 'Não identificado') as codigoRodovia,
                    municipio,
                    classe_acidente.descr as tipoAcidente,
                    COUNT(*) as totalAcidentes
                FROM ACIDENTE
                JOIN RODOVIAS ON fk_rodovias = idRODOVIAS
                JOIN classe_acidente ON fk_classe_acid = idClasse_acid
                WHERE ${condicoes.join(' AND ')}
                GROUP BY rodovia_cod_numeric, municipio, classe_acidente.descr
                ORDER BY totalAcidentes DESC;
        `;
    console.log("SQL gerado:", instrucaoSql);

    return database.executar(instrucaoSql);
}



module.exports = {
    buscar_rodovias,
    listar_anos,
    listar_rodovias,
    listar_municipios,
    listar_tipos_acidente,
    listar_jurisdicao,
    listar_denominacao
}
