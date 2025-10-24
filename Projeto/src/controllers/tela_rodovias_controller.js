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
    var rodovia = req.body.rodovia;
    var tipo_acidente = req.body.tipo_acidente;

    // Log para debug
    console.log("Filtros recebidos:", { municipio, rodovia, tipo_acidente });

    tela_rodovias_model.buscar_rodovias(rodovia, municipio, tipo_acidente)
        .then(resposta => {
            console.log(`Busca retornou ${resposta.length} resultados`);
            res.json(resposta);
        })
        .catch(erro => {
            console.log("Erro na busca:", erro);
            res.status(500).json(erro.sqlMessage || erro);
        });
}

function listar_tipos_acidentes(req, res) {
    tela_rodovias_model.listar_tipos_acidentes()
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
    listar_tipos_acidentes
}