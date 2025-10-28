var database = require("../database/config")


function total_acidentes(fk_empresa, periodo) {
    console.log("Executando total_acidentes para empresa:", fk_empresa);

    var instrucaoSql = `
        SELECT COUNT(*) as qtd_Acidente from ACIDENTE
        WHERE fk_empresa = ${fk_empresa} 
        AND data_hora BETWEEN DATE_SUB(NOW(), INTERVAL ${periodo} DAY) AND NOW();
    `;

    console.log("SQL contarAcidentesPorPeriodo:", instrucaoSql);
    return database.executar(instrucaoSql);
}

function quantiaPorTipoAcidente(fk_empresa, periodo) {
    console.log("Executando quantiaPorTipoAcidente para empresa:", fk_empresa, periodo);

    // Lista completa com todos os 16 tipos de acidentes possíveis
    const todosOsTipos = [
        'Colisão frontal',
        'Colisão lateral',
        'Atropelamento de pedestre',
        'Capotamento',
        'Tombamento',
        'Saída de pista',
        'Engavetamento',
        'Queda de moto',
        'Choque com objeto fixo',
        'Animal na pista',
        'Derrapagem',
        'Incêndio em veículo',
        'Colisão traseira',
        'Queda de ocupante',
        'Explosão',
        'Outros'
    ];

    if (periodo === undefined || periodo === null) {
        var instrucaoSql = `
        SELECT COUNT(*) as total_aparicoes,
        descr as tipo_acidente
        from ACIDENTE
        join classe_acidente on fk_classe_acid = idClasse_acid
        WHERE fk_empresa = ${fk_empresa}
        GROUP BY descr
        ORDER BY total_aparicoes DESC;`
    } else {
        var instrucaoSql = `
        SELECT COUNT(*) as total_aparicoes,
        descr as tipo_acidente
        from ACIDENTE
        join classe_acidente on fk_classe_acid = idClasse_acid
        WHERE fk_empresa = ${fk_empresa}
        AND data_hora BETWEEN DATE_SUB(NOW(), INTERVAL ${periodo} DAY) AND NOW()
        GROUP BY descr
        ORDER BY total_aparicoes DESC;
    `;
    }

    console.log("SQL topTiposAcidentes:", instrucaoSql);
    return database.executar(instrucaoSql).then(resultados => {
        // Inicializar arrays com os dados da query
        const quantidades = [];
        const tiposAcidentes = [];

        // Primeiro, adicionar todos os resultados da query
        resultados.forEach(item => {
            quantidades.push(item.total_aparicoes);
            tiposAcidentes.push(item.tipo_acidente);
        });

        // Depois, verificar quais tipos estão faltando e adicionar no final
        todosOsTipos.forEach(tipo => {
            // Verificar se o tipo já existe na lista de resultados (comparação case-insensitive e sem espaços extras)
            const jaExiste = tiposAcidentes.some(tipoExistente => 
                tipoExistente.toLowerCase().trim() === tipo.toLowerCase().trim()
            );
            
            if (!jaExiste) {
                // Se não existe, adicionar no final com quantidade 0
                quantidades.push(0);
                tiposAcidentes.push(tipo);
            }
        });

        return {
            quantidades: quantidades,
            tipos: tiposAcidentes
        };
    });
}


module.exports = {
    total_acidentes,
    quantiaPorTipoAcidente
}