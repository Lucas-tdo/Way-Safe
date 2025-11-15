
async function carregar_municipios() {
    fetch('/tela_rodovias_rota/listar_municipios')
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

async function buscar_rodovias(municipio, ano) {
    var fk_empresa = sessionStorage.FK_EMPRESA

    var municipio = remove_acentos(municipio);
    var ano = remove_acentos(ano);

    var dados = {
        fk_empresa,
        municipio: municipio !== '' ? municipio : undefined,
        ano: ano !== '' ? ano : undefined,
    };

    console.log("Dados enviados:", dados);

    fetch(`/tela_rodovias_rota/aplicar_filtro`, {
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
            var topRodovias = []

            resultado.slice(0, 100).forEach((item, index) => {

                if (topRodovias.length < 3) {
                    if (topRodovias.includes(item.codigoRodovia)) {
                    } else {
                        topRodovias.push(item.codigoRodovia)
                        document.getElementById(`nome-rodovia${topRodovias.length}`).innerHTML = `${item.codigoRodovia}`
                    }
                }

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
    carregar_municipios()
    buscar_rodovias(
        document.getElementById("select-municipio").value,
        document.getElementById("select-ano").value
    )
};

function guardarSessionStorage(rodovia) {
    sessionStorage.codigoRodovia = rodovia;
}

async function carregar_anos() {
    fetch('/tela_rodovias_rota/listar_anos')
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

document.querySelector('.toggle-nav')
    .addEventListener('click', () => {
        document.querySelector('.nav').classList.toggle('minimizado');
        document.querySelector('.filtro-box').classList.toggle('ativo');
    });

function remove_acentos(str) {
    if (str != undefined && str != '' && str != null) {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    } else {
        return str
    }
}

