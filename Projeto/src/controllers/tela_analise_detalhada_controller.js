var tela_analise_detalhada_model = require("../models/tela_analise_detalhada_model");


function listar_anos(req, res) {
    tela_analise_detalhada_model.listar_anos()
        .then(resposta => {
            console.log(`Anos presentes no banco de dados: ${resposta.length}`);
            res.json(resposta);
        })
        .catch(erro => {
            console.log("Erro ao buscar tipos de acidentes:", erro);
            res.status(500).json(erro.sqlMessage || erro);
        });
}

function listar_rodovias(req, res) {
    tela_analise_detalhada_model.listar_rodovias()
        .then(resposta => {
            console.log(`Anos presentes no banco de dados: ${resposta.length}`);
            res.json(resposta);
        })
        .catch(erro => {
            console.log("Erro ao buscar tipos de acidentes:", erro);
            res.status(500).json(erro.sqlMessage || erro);
        });
}

function listar_municipios(req, res) {
    tela_analise_detalhada_model.listar_municipios()
        .then(resposta => {
            console.log(`Tipos de acidentes encontrados: ${resposta.length}`);
            res.json(resposta);
        })
        .catch(erro => {
            console.log("Erro ao buscar tipos de acidentes:", erro);
            res.status(500).json(erro.sqlMessage || erro);
        });
}

function listar_tipos_acidente(req, res) {
    tela_analise_detalhada_model.listar_tipos_acidente()
        .then(resposta => {
            console.log(`Anos presentes no banco de dados: ${resposta.length}`);
            res.json(resposta);
        })
        .catch(erro => {
            console.log("Erro ao buscar tipos de acidentes:", erro);
            res.status(500).json(erro.sqlMessage || erro);
        });
}

function buscar_rodovias(req, res) {
    var municipio = req.body.municipio;
    var ano = req.body.ano;

    // Log para debug
    console.log("Filtros recebidos:", { municipio, ano });

    tela_analise_detalhada_model.buscar_rodovias(municipio, ano)
        .then(resposta => {
            console.log(`Busca retornou ${resposta.length} resultados`);
            res.json(resposta);
        })
        .catch(erro => {
            console.log("Erro na busca:", erro);
            res.status(500).json(erro.sqlMessage || erro);
        });
}

module.exports = {
    buscar_rodovias,
    listar_anos,
    listar_rodovias,
    listar_municipios,
    listar_tipos_acidente
}