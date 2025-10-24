var database = require("../database/config")


function topRodovias(fk_empresa) {
    console.log("Executando topRodovias para empresa:", fk_empresa);
    
    var instrucaoSql = `
        SELECT IFNULL(rodovia_cod_numeric, 'Não identificado') as nomeRodovia, COUNT(fk_rodovias) as aparicoes 
        FROM acidente
        JOIN RODOVIAS ON idRODOVIAS = fk_rodovias
        WHERE fk_empresa = ${fk_empresa}
        GROUP BY rodovia_cod_numeric
        ORDER BY aparicoes DESC
        LIMIT 3
    `;
    
    console.log("SQL topRodovias:", instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscar_rodovias(codigoRodovia, municipio, tipoAcidente) {
    var instrucaoSql = '';
    var condicoes = [];
    var filtrosPreenchidos = 0;

    // Conta quantos filtros foram preenchidos
    if (codigoRodovia != undefined && codigoRodovia != '') {
        condicoes.push(`rodovia_cod_numeric = '${codigoRodovia}'`);
        filtrosPreenchidos++;
    }

    if (municipio != undefined && municipio != '') {
        condicoes.push(`municipio LIKE '%${municipio}%'`);
        filtrosPreenchidos++;
    }

    if (tipoAcidente != undefined && tipoAcidente != '') {
        // Busca pela descrição da classe de acidente
        condicoes.push(`CLASSE_ACIDENTE.descr = '${tipoAcidente}'`);
        filtrosPreenchidos++;
    }

    // Determina o agrupamento baseado no número de filtros
    if (filtrosPreenchidos === 0) {
        // SEM FILTRO: Mostra todas as rodovias com todos os tipos de acidente
        instrucaoSql = `
            SELECT 
                IFNULL(rodovia_cod_numeric, 'Não identificado') as codigoRodovia,
                municipio,
                CLASSE_ACIDENTE.descr as tipoAcidente,
                COUNT(*) as totalAcidentes
            FROM ACIDENTE
            JOIN RODOVIAS ON fk_rodovias = idRODOVIAS
            JOIN CLASSE_ACIDENTE ON fk_classe_acid = idClasse_acid
            GROUP BY rodovia_cod_numeric, municipio, CLASSE_ACIDENTE.descr
            ORDER BY totalAcidentes DESC
        `;
    } else if (filtrosPreenchidos === 1) {
        // UM FILTRO: Mostra detalhamento (rodovia aparece várias vezes com diferentes tipos)
        instrucaoSql = `
            SELECT 
                IFNULL(rodovia_cod_numeric, 'Não identificado') as codigoRodovia,
                municipio,
                CLASSE_ACIDENTE.descr as tipoAcidente,
                COUNT(*) as totalAcidentes
            FROM ACIDENTE
            JOIN RODOVIAS ON fk_rodovias = idRODOVIAS
            JOIN CLASSE_ACIDENTE ON fk_classe_acid = idClasse_acid
            WHERE ${condicoes.join(' AND ')}
            GROUP BY rodovia_cod_numeric, municipio, CLASSE_ACIDENTE.descr
            ORDER BY totalAcidentes DESC
        `;
    } else {
        // MÚLTIPLOS FILTROS: Mostra resultado mais específico/agrupado
        instrucaoSql = `
            SELECT 
                IFNULL(rodovia_cod_numeric, 'Não identificado') as codigoRodovia,
                municipio,
                CLASSE_ACIDENTE.descr as tipoAcidente,
                COUNT(*) as totalAcidentes
            FROM ACIDENTE
            JOIN RODOVIAS ON fk_rodovias = idRODOVIAS
            JOIN CLASSE_ACIDENTE ON fk_classe_acid = idClasse_acid
            WHERE ${condicoes.join(' AND ')}
            GROUP BY rodovia_cod_numeric, municipio, CLASSE_ACIDENTE.descr
            ORDER BY totalAcidentes DESC
        `;
    }

    console.log("SQL gerado:", instrucaoSql); // Para debug
    console.log("Filtros preenchidos:", filtrosPreenchidos); // Para debug

    return database.executar(instrucaoSql);
}

function listar_tipos_acidentes() {
    var instrucaoSql = `
        SELECT DISTINCT descr as tipoAcidente 
        FROM CLASSE_ACIDENTE 
        ORDER BY descr ASC
    `;
    console.log("Buscando tipos de acidentes...");
    return database.executar(instrucaoSql);
}

module.exports = {
    topRodovias,
    buscar_rodovias,
    listar_tipos_acidentes
}