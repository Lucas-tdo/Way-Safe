var database = require("../database/config")


function total_acidentes(fk_empresa, periodo) {
    console.log("Executando total_acidentes para empresa:", fk_empresa);

    var instrucaoSql = `
        SELECT COUNT(*) as total from ACIDENTE
        WHERE fk_empresa = ${fk_empresa} 
        AND data_hora BETWEEN DATE_SUB(NOW(), INTERVAL ${periodo} DAY) AND NOW();
    `;

    console.log("SQL total acidentes:", instrucaoSql);
    return database.executar(instrucaoSql);
}

function quantiaPorTipoAcidente(fk_empresa, periodo) {
    console.log("Executando quantiaPorTipoAcidente para empresa:", fk_empresa, periodo);

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
        const quantidades = [];
        const tiposAcidentes = [];

        resultados.forEach(item => {
            quantidades.push(item.total_aparicoes);
            tiposAcidentes.push(item.tipo_acidente);
        });

        todosOsTipos.forEach(tipo => {
            const jaExiste = tiposAcidentes.some(tipoExistente => 
                tipoExistente.toLowerCase().trim() === tipo.toLowerCase().trim()
            );
            
            if (!jaExiste) {
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

function evolucao_acidentes(fk_empresa, dias) {
    console.log("Executando evolucao_acidentes para empresa:", fk_empresa, "período:", dias, "dias");

    let agrupamento = '';
    let formato = '';
    let tipoAgrupamento = '';

    if (dias <= 30) {
        agrupamento = 'DATE(data_hora)';
        formato = '%Y-%m-%d';
        tipoAgrupamento = 'dia';
    } else if (dias <= 200) {
        agrupamento = 'YEARWEEK(data_hora, 1)';
        formato = '%x-W%v';
        tipoAgrupamento = 'semana';
    } else if (dias <= 1000) {
        agrupamento = 'DATE_FORMAT(data_hora, "%Y-%m")';
        formato = '%Y-%m';
        tipoAgrupamento = 'mês';
    } else {
        agrupamento = 'YEAR(data_hora)';
        formato = '%Y';
        tipoAgrupamento = 'ano';
    }

    var instrucaoSql = `
        SELECT 
            ${agrupamento} as periodo,
            COUNT(*) as qtd_acidentes,
            MIN(DATE(data_hora)) as data_inicio,
            MAX(DATE(data_hora)) as data_fim
        FROM ACIDENTE 
        WHERE fk_empresa = ${fk_empresa} 
        AND data_hora BETWEEN DATE_SUB(NOW(), INTERVAL ${dias} DAY) AND NOW()
        GROUP BY ${agrupamento}
        ORDER BY periodo ASC;
    `;

    console.log("SQL acidentesPorPeriodo:", instrucaoSql);
    return database.executar(instrucaoSql).then(resultados => {
        const periodos = [];
        const quantidades = [];
        const labels = [];

        resultados.forEach(item => {
            periodos.push(item.periodo);
            quantidades.push(item.qtd_acidentes);
            
            if (tipoAgrupamento === 'dia') {
                labels.push(new Date(item.data_inicio).toLocaleDateString('pt-BR'));
            } else if (tipoAgrupamento === 'semana') {
                const ano = item.periodo.toString().substring(0, 4);
                const semana = item.periodo.toString().substring(4);
                labels.push(`${ano} - Semana ${semana}`);
            } else if (tipoAgrupamento === 'mês') {
                const [ano, mes] = item.periodo.split('-');
                const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 
                             'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
                labels.push(`${meses[parseInt(mes) - 1]} ${ano}`);
            } else if (tipoAgrupamento === 'ano') {
                labels.push(item.periodo.toString());
            }
        });

        return {
            periodos: periodos,
            quantidades: quantidades,
            labels: labels,
            tipoAgrupamento: tipoAgrupamento,
            totalPeriodos: resultados.length
        };
    });
}


module.exports = {
    total_acidentes,
    quantiaPorTipoAcidente,
    evolucao_acidentes
}