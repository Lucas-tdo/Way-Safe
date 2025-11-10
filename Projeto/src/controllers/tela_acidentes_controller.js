var tela_acidentes_model = require("../models/tela_acidentes_model");


function municipio_mais_acidentes(req, res) {
    var fk_empresa = req.params.fk_empresa;
    var periodo = req.params.periodo;

    console.log("Filtros recebidos:", { fk_empresa, periodo });

    tela_acidentes_model.municipio_mais_acidentes(fk_empresa, periodo)
        .then(resposta => {
            console.log(`Busca retornou ${resposta.length} resultados`);
            res.json(resposta);
        })
        .catch(erro => {
            console.log("Erro na busca:", erro);
            res.status(500).json(erro.sqlMessage || erro);
        });
}

function evolucaoAcidentes(req, res) {
    var fk_empresa = req.params.fk_empresa;
    var periodo = req.params.periodo;

    // Log para debug
    console.log("Filtros recebidos:", { fk_empresa, periodo });

    tela_acidentes_model.evolucao_acidentes(fk_empresa, periodo)
        .then(resposta => {
            console.log(`Busca retornou ${resposta.length} resultados`);
            res.json(resposta);
        })
        .catch(erro => {
            console.log("Erro na busca:", erro);
            res.status(500).json(erro.sqlMessage || erro);
        });
}


function quantiaPorTipoAcidente(req, res) {
    var fk_empresa = req.params.fk_empresa;
    var ano = req.params.periodo;

    // Log para debug
    console.log("Filtros recebidos:", { fk_empresa, ano });

    tela_acidentes_model.quantiaPorTipoAcidente(fk_empresa, ano)
        .then(resposta => {
            console.log(resposta);
            res.json(resposta); // A função já retorna o objeto formatado
        })
        .catch(erro => {
            console.log("Erro ao buscar tipos de acidentes:", erro);
            res.status(500).json(erro.sqlMessage || erro);
        });
}

module.exports = {
    municipio_mais_acidentes,
    quantiaPorTipoAcidente,
    evolucaoAcidentes
}