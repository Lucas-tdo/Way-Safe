var database = require("../database/config")

function buscar_rodovias(municipio, ano) {
    var instrucaoSql = '';
    var condicoes = [];
    var filtrosPreenchidos = 0;

    if (municipio != undefined && municipio != '') {
        condicoes.push(`municipio LIKE '%${municipio}%'`);
        filtrosPreenchidos++;
    }

    if (ano != undefined && ano != '') {
        condicoes.push(`YEAR(data_hora) LIKE '%${ano}%'`);
        filtrosPreenchidos++;
    }

    // Determina o agrupamento baseado no número de filtros
    if (filtrosPreenchidos === 0) {
        // SEM FILTRO: Mostra todas as rodovias com todos os tipos de acidente
        instrucaoSql = `
                SELECT 
                    IFNULL(rodovia_cod_numeric, 'Não identificado') as codigoRodovia,
                    municipio,
                    classe_acidente.descr as tipoAcidente,
                    COUNT(*) as totalAcidentes
                FROM ACIDENTE
                JOIN RODOVIAS ON fk_rodovias = idRODOVIAS
                JOIN classe_acidente ON fk_classe_acid = idClasse_acid
                GROUP BY rodovia_cod_numeric, municipio, classe_acidente.descr
                ORDER BY totalAcidentes DESC;
        `;
    } else if (filtrosPreenchidos === 1) {
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
    } else {
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
    }

    console.log("SQL gerado:", instrucaoSql); 
    console.log("Filtros preenchidos:", filtrosPreenchidos);

    return database.executar(instrucaoSql);
}

function listar_anos() {
    var instrucaoSql = `
        SELECT DISTINCT YEAR(data_hora) as ano 
        FROM ACIDENTE; 
    `;
    console.log("Buscando anos de acidente...");
    return database.executar(instrucaoSql);
}


function listar_municipios() {
    var instrucaoSql = `
        SELECT DISTINCT municipio 
        FROM ACIDENTE; 
    `;
    console.log("Buscando tipos de acidentes...");
    return database.executar(instrucaoSql);
}

module.exports = {
    buscar_rodovias,
    listar_anos,
    listar_municipios
}
