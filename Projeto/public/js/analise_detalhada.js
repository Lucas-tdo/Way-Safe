function buscar_rodovias() {
    var fk_empresa = sessionStorage.FK_EMPRESA;

    var rodovia = document.getElementById('inputRodovia').value;
    var municipio = document.getElementById('inputMunicipio').value;
    var denominacao = document.getElementById('inputDenominacao').value;
    var jurisdicao = document.getElementById('inputJurisdicao').value;
    var dtInicio = document.getElementById('inputDiaInicio').value;
    var dtFim = document.getElementById('inputDiaFinal').value;
    var tipo = document.getElementById('inputTipo').value;
    var meteoro = document.getElementById('inputMetereologia').value;

    var dados = {
        rodovia: rodovia !== '' ? rodovia : undefined,
        municipio: municipio !== '' ? municipio : undefined,
        denominacao: denominacao !== '' ? denominacao : undefined,
        jurisdicao: jurisdicao !== '' ? jurisdicao : undefined,
        dtInicio: dtInicio !== '' ? dtInicio : undefined,
        dtFim: dtFim !== '' ? dtFim : undefined,
        tipo: tipo !== '' ? tipo : undefined,
        meteoro: meteoro !== '' ? meteoro : undefined,
        fk_empresa: fk_empresa !== '' ? fk_empresa : undefined
    };

    console.log("Dados enviados:", dados);

    fetch(`/tela_analise_detalhada_rota/buscar_rodovias`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dados)
    })
        .then(res => res.json())
        .then(resultado => {
            console.log("Resultado recebido:", resultado);

            var tabela = document.querySelector(".tabela-rodovias tbody");
            tabela.innerHTML = "";

            if (resultado.length === 0) {
                tabela.innerHTML = `
              <tr>
                <td colspan="5" style="text-align: center; padding: 20px;">
                  Nenhum resultado encontrado
                </td>
              </tr>
            `;
                return;
            }
            resultado.slice(0, 100).forEach((item, index) => {

                var linha = document.createElement("tr");
                linha.innerHTML = `
              <td>${index + 1}#</td>
              <td>${item.codigoRodovia}</td>
              <td>${item.municipio}</td>
              <td>${item.tipoAcidente}</td>
              <td>${item.totalAcidentes}</td>
              <td><button class="btn-relatorio" onclick="guardarSessionStorage('${item.codigoRodovia}')">Visualizar</button></td>
            `;
                tabela.appendChild(linha);
            });
        })
        .catch(error => {
            console.error("Erro ao buscar rodovias:", error);
            alert("Erro ao buscar dados. Verifique o console.");
        });
}


// Funções padrao ----------------------------------------------------------------------------------------------------------------------------------------------------------------------

window.onload = function () {
    carregar_anos()
    carregar_rodovias()
    carregar_municipios()
    carregar_denominacao()
    carregar_jurisdicao()
    carregar_tipos_acidente()
    buscar_rodovias();
};

function mudar() {
    buscar_rodovias()
}

document.querySelector('.toggle-nav')
    .addEventListener('click', () => {
        document.querySelector('.nav').classList.toggle('minimizado');
        document.querySelector('.filtro-box').classList.toggle('ativo');
    });

function changeDatas() {

    var rodovia = document.getElementById('inputRodovia').value;
    var municipio = document.getElementById('inputMunicipio').value;
    var denominacao = document.getElementById('inputDenominacao').value;
    var jurisdicao = document.getElementById('inputJurisdicao').value;

    carregar_rodovias(municipio, denominacao, jurisdicao);
    carregar_municipios(rodovia, denominacao, jurisdicao);
    carregar_denominacao(rodovia, municipio, jurisdicao);
    carregar_jurisdicao(rodovia, denominacao, municipio);
}

async function carregar_anos() {
    fetch('/tela_analise_detalhada_rota/listar_anos')
        .then(res => res.json())
        .then(anos => {
            
            console.log(`${anos.length} anos de acidente`);
        })
        .catch(error => {
            console.error("Erro ao carregar anos de acidente:", error);
        });
}

async function carregar_rodovias(municipio, denominacao, jurisdicao) {
    var fk_empresa = sessionStorage.FK_EMPRESA;

    var municipio = remove_acentos(municipio);
    var denominacao = remove_acentos(denominacao);
    var jurisdicao = remove_acentos(jurisdicao);

    var dados = {
        fk_empresa: fk_empresa !== '' ? fk_empresa : undefined,
        municipio: municipio !== '' ? municipio : undefined,
        denominacao: denominacao !== '' ? denominacao : undefined,
        jurisdicao: jurisdicao !== '' ? jurisdicao : undefined
    };


    fetch(`tela_analise_detalhada_rota/listar_rodovias`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dados)
    })
        .then(res => res.json())
        .then(rodovias => {
            var select = document.getElementById('data-rodovia');

            rodovias.forEach(rodovia => {
                var option = document.createElement('option');
                option.value = rodovia.rodovia;
                select.appendChild(option);
            });

            console.log(`${rodovias.length} rodovias carregadas`);
        })
        .catch(error => {
            console.error("Erro ao carregar tipos de acidentes:", error);
        });
}

async function carregar_municipios(rodovia, denominacao, jurisdicao) {

    var rodovia = remove_acentos(rodovia);
    var denominacao = remove_acentos(denominacao);
    var jurisdicao = remove_acentos(jurisdicao);

    var dados = {
        rodovia: rodovia !== '' ? rodovia : undefined,
        denominacao: denominacao !== '' ? denominacao : undefined,
        jurisdicao: jurisdicao !== '' ? jurisdicao : undefined
    };

    fetch(`/tela_analise_detalhada_rota/listar_municipios`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dados)
    })
        .then(res => res.json())
        .then(municipios => {
            var select = document.getElementById('data-municipio');

            municipios.forEach(municipio => {
                var option = document.createElement('option');
                option.value = municipio.municipio;
                select.appendChild(option);
            });

            console.log(`${municipios.length} tipos de acidentes carregados`);
        })
        .catch(error => {
            console.error("Erro ao carregar tipos de acidentes:", error);
        });
}

async function carregar_tipos_acidente() {
    fetch('/tela_analise_detalhada_rota/listar_tipos_acidente')
        .then(res => res.json())
        .then(tipos => {
            var select = document.getElementById('data-tipo');

            tipos.forEach(tipo => {
                var option = document.createElement('option');
                option.value = tipo.tipo;
                select.appendChild(option);
            });

            console.log(`${tipos.length} rodovias carregadas`);
        })
        .catch(error => {
            console.error("Erro ao carregar tipos de acidentes:", error);
        });
}


async function carregar_denominacao(rodovia, municipio, jurisdicao) {

    var rodovia = remove_acentos(rodovia);
    var municipio = remove_acentos(municipio);
    var jurisdicao = remove_acentos(jurisdicao);

    var dados = {
        rodovia: rodovia !== '' ? rodovia : undefined,
        municipio: municipio !== '' ? municipio : undefined,
        jurisdicao: jurisdicao !== '' ? jurisdicao : undefined
    };


    fetch(`/tela_analise_detalhada_rota/listar_denominacao`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dados)
    })
        .then(res => res.json())
        .then(ds => {
            var select = document.getElementById('data-denominacao');

            ds.forEach(d => {
                var option = document.createElement('option');
                option.value = d.denominacao;
                select.appendChild(option);
            });
            console.log(`${ds.length} anos de acidente`);
        })
        .catch(error => {
            console.error("Erro ao carregar anos de acidente:", error);
        });
}

async function carregar_jurisdicao(rodovia, denominacao, municipio) {

    var rodovia = remove_acentos(rodovia);
    var denominacao = remove_acentos(denominacao);
    var municipio = remove_acentos(denominacao);

    var dados = {
        rodovia: rodovia !== '' ? rodovia : undefined,
        denominacao: denominacao !== '' ? denominacao : undefined,
        municipio: municipio !== '' ? municipio : undefined
    };

    fetch(`/tela_analise_detalhada_rota/listar_jurisdicao`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dados)
    })
        .then(res => res.json())
        .then(js => {
            var select = document.getElementById('data-jurisdicao');

            js.forEach(j => {
                var option = document.createElement('option');
                option.value = j.jurisdicao;
                select.appendChild(option);
            });
            console.log(`${js.length} anos de acidente`);
        })
        .catch(error => {
            console.error("Erro ao carregar anos de acidente:", error);
        });
}

function remove_acentos(str) {
    if (str != undefined && str != '' && str != null) {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    } else {
        return str
    }
}




