var tela_rodovias_model = require("../models/tela_rodovias_model");


function topRodovias(req, res) {
    var fk_empresa = req.params.fk_empresa;
    
    console.log("===== topRodovias Controller =====");
    console.log("fk_empresa recebido:", fk_empresa);
    console.log("Tipo:", typeof fk_empresa);
    
    if (fk_empresa == undefined || fk_empresa == '') {
        console.log("ERRO: fk_empresa está undefined ou vazio!");
        res.status(400).send('Seu fk_empresa está undefined!');
    } else {
        tela_rodovias_model.topRodovias(fk_empresa)
            .then(resposta => {
                console.log("Top Rodovias - Resultado:", resposta);
                console.log("Número de resultados:", resposta.length);
                res.json(resposta);
            })
            .catch(erro => {
                console.log("ERRO ao buscar top rodovias:", erro);
                console.log("Mensagem SQL:", erro.sqlMessage);
                res.status(500).json({
                    erro: erro.sqlMessage || "Erro desconhecido",
                    detalhes: erro
                });
            });
    }
}

function buscar_rodovias(req, res) {
    var municipio = req.body.municipio;
    var ano = req.body.ano;
    var fk_empresa = req.body.fk_empresa;

    console.log("abacate: " + fk_empresa)

    // Log para debug
    console.log("Filtros recebidos banana:", { municipio, ano, fk_empresa });

    tela_rodovias_model.buscar_rodovias(municipio, ano, fk_empresa)
        .then(resposta => {
            console.log(`Busca retornou ${resposta.length} resultados`);
            res.json(resposta);
        })
        .catch(erro => {
            console.log("Erro na busca:", erro);
            res.status(500).json(erro.sqlMessage || erro);
        });
}

function listar_anos(req, res) {
    tela_rodovias_model.listar_anos()
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
    tela_rodovias_model.listar_municipios()
        .then(resposta => {
            console.log(`Tipos de acidentes encontrados: ${resposta.length}`);
            res.json(resposta);
        })
        .catch(erro => {
            console.log("Erro ao buscar tipos de acidentes:", erro);
            res.status(500).json(erro.sqlMessage || erro);
        });
}

module.exports = {
    topRodovias,
    buscar_rodovias,
    listar_anos,
    listar_municipios
}