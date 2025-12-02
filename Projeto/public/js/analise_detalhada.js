// Funções padrao ----------------------------------------------------------------------------------------------------------------------------------------------------------------------

window.onload = function () {
    carregar_anos()
    carregar_rodovias()
    carregar_municipios()
    carregar_tipos_acidente()
};

document.querySelector('.toggle-nav')
    .addEventListener('click', () => {
        document.querySelector('.nav').classList.toggle('minimizado');
        document.querySelector('.filtro-box').classList.toggle('ativo');
    });

async function carregar_anos() {
    fetch('/tela_analise_detalhada_rota/listar_anos')
        .then(res => res.json())
        .then(anos => {
            anos.forEach(ano => {
                document.getElementById("select-ano").innerHTML += `<option value=${ano.ano}>${ano.ano}</option>`
            });
            console.log(`${anos.length} anos de acidente`);
        })
        .catch(error => {
            console.error("Erro ao carregar anos de acidente:", error);
        });
}

async function carregar_rodovias() {
    fetch('/tela_analise_detalhada_rota/listar_rodovias')
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

async function carregar_municipios() {
    fetch('/tela_analise_detalhada_rota/listar_municipios')
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

            console.log(`${rodovias.length} rodovias carregadas`);
        })
        .catch(error => {
            console.error("Erro ao carregar tipos de acidentes:", error);
        });
}


async function carregar_denominacao() {
    fetch('/tela_analise_detalhada_rota/listar_denominacao')
        .then(res => res.json())
        .then(denominacoes => {
            denominacoes.forEach(denominacao => {

                var select = document.getElementById('data-denominacao');

                denominacoes.forEach(denominacao => {
                    var option = document.createElement('option');
                    option.value = denominacao.denominacao;
                    select.appendChild(option);
                });


            });
            console.log(`${anos.length} anos de acidente`);
        })
        .catch(error => {
            console.error("Erro ao carregar anos de acidente:", error);
        });
}

async function carregar_jurisdicao() {
    fetch('/tela_analise_detalhada_rota/listar_jurisdicao')
        .then(res => res.json())
        .then(anos => {
            anos.forEach(ano => {
                document.getElementById("select-ano").innerHTML += `<option value=${ano.ano}>${ano.ano}</option>`
            });
            console.log(`${anos.length} anos de acidente`);
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

