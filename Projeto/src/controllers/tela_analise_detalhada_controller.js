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

    var municipio = req.body.municipio;
    var denominacao = req.body.denominacao;
    var jurisdicao = req.body.jurisdicao;
    var fk = req.body.fk_empresa;

    tela_analise_detalhada_model.listar_rodovias(municipio, denominacao, jurisdicao, fk)
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

    var rodovia = req.body.rodovia;
    var denominacao = req.body.denominacao;
    var jurisdicao = req.body.jurisdicao;

    tela_analise_detalhada_model.listar_municipios(rodovia, denominacao, jurisdicao)
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

function listar_denominacao(req, res) {

    var rodovia = req.body.rodovia;
    var municipio = req.body.municipio;
    var jurisdicao = req.body.jurisdicao;

    tela_analise_detalhada_model.listar_denominacao(rodovia, municipio, jurisdicao)
        .then(resposta => {
            console.log(`Denominacoes encontrados: ${resposta.length}`);
            res.json(resposta);
        })
        .catch(erro => {
            console.log("Erro ao buscar tipos de acidentes:", erro);
            res.status(500).json(erro.sqlMessage || erro);
        });
}

function listar_jurisdicao(req, res) {

    var rodovia = req.body.rodovia;
    var municipio = req.body.municipio;
    var denominacao = req.body.denominacao;

    tela_analise_detalhada_model.listar_jurisdicao(rodovia, municipio, denominacao)
        .then(resposta => {
            console.log(`Jurisdicoes encontradas: ${resposta.length}`);
            res.json(resposta);
        })
        .catch(erro => {
            console.log("Erro ao buscar tipos de acidentes:", erro);
            res.status(500).json(erro.sqlMessage || erro);
        });
}

function buscar_rodovias(req, res) {
    var rodovia = req.body.rodovia;
    var municipio = req.body.municipio;
    var jurisdicao = req.body.jurisdicao;
    var denominacao = req.body.denominacao;
    var qtdVitimas = req.body.qtdVitimas;
    var tipoAcidente = req.body.tipoAcidente;
    var dtInicio = req.body.dtInicio;
    var dtFim = req.body.dtFim;
    var meteoro = req.body.meteoro;
    var visibilidade = req.body.visibilidade;    
    var fk_empresa = req.body.fk_empresa;

    console.log("Filtros recebidos:", {rodovia, municipio, jurisdicao, denominacao, tipoAcidente, dtInicio, dtFim, meteoro, visibilidade, fk_empresa });

    tela_analise_detalhada_model.buscar_rodovias(rodovia, municipio, jurisdicao, denominacao, tipoAcidente, dtInicio, dtFim, meteoro, visibilidade, fk_empresa)
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
    listar_tipos_acidente,
    listar_denominacao,
    listar_jurisdicao
}