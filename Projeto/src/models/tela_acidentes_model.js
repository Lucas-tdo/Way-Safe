var database = require("../database/config")


function municipio_mais_acidentes(fk_empresa, ano) {
    console.log("Executando total_acidentes para empresa:", fk_empresa);

    var instrucaoSql = `
        select a.municipio, (
        SUM(v.vitima_fatal) +
        SUM(v.vitima_fer_leve) +
        SUM(v.vitima_fer_media) +
        SUM(v.vitima_fer_grave) +
        SUM(v.vitimas_fer_seminfo) +
        SUM(v.vitima_ilesa)
    ) as total_vitima_fatais from ACIDENTE as a
    JOIN VITIMAS as v on a.idACIDENTE=v.fk_acidente 
    WHERE year(a.data_hora)=${ano} and a.municipio is not null and a.fk_empresa=${fk_empresa}
    group by a.municipio
    order by total_vitima_fatais desc
    limit 2;
    `;

    console.log("SQL municipio mais acidentes:", instrucaoSql);
    return database.executar(instrucaoSql);
}



function quantiaPorTipoAcidente(fk_empresa, ano) {
    console.log("Executando quantiaPorTipoAcidente para empresa:", fk_empresa, ano);

    var instrucaoSql= `
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
    WHERE year(a.data_hora)=${ano} and a.municipio is not null and a.fk_empresa=${fk_empresa}
    group by c.descr
    order by total_vitima_fatais desc;
    `
    return database.executar(instrucaoSql);
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
    quantiaPorTipoAcidente,
    evolucao_acidentes,
    municipio_mais_acidentes
}