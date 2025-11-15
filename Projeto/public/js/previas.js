let anoSelecionado = null; // variável global
function chamarFuncoes() {

    // document.getElementById("nome_usuario").innerText = `Olá, ${sessionStorage.NOME_USUARIO}`

    top10(),
        top5MaisTiposAcidentes(),
        total_acidentes(),
        trechoMaisCritico(),
        PiorMes(),
        anosAcidentes()
}
function total_acidentes() {

    var fk_empresa = sessionStorage.FK_EMPRESA

    fetch(`/tela_previa_rota/qtdAcidentes/${fk_empresa}/${anoSelecionado}`)

        .then(res => res.json())
        .then(quantidade => {

            var qtd = quantidade[0].qtd_Acidente
            document.getElementById("qtd_acidentes_total").innerText = qtd;
        })
}

function anosAcidentes() {
    var fk_empresa = sessionStorage.FK_EMPRESA;

    fetch(`/tela_previa_rota/anosAcidentes/${fk_empresa}`)
        .then(res => res.json())
        .then(anos => {
            console.log("Anos recebidos:", anos);

            const select = document.getElementById("selectAnos");
            select.innerHTML = '<option value="">Selecione um ano</option>';

            anos.forEach(item => {
                // acessa item.ano
                const option = document.createElement("option");
                option.value = item.ano;
                option.textContent = item.ano;
                select.appendChild(option);
            });
        })
        .catch(err => {
            console.error("Erro ao buscar anos:", err);
        });
}

function trechoMaisCritico() {

    var fk_empresa = sessionStorage.FK_EMPRESA

    fetch(`/tela_previa_rota/trechoCritico/${fk_empresa}/${anoSelecionado}`)

        .then(res => res.json())
        .then(quantidade => {

            var qtd = quantidade[0].qtd
            var rodovia = quantidade[0].rodovia
            document.getElementById("trecho_critico").innerText = rodovia;

        })
}
function top10() {
    var fk_empresa = sessionStorage.FK_EMPRESA;

    fetch(`/tela_previa_rota/top10/${fk_empresa}/${anoSelecionado}`)
        .then(res => res.json())
        .then(dados => {
            var municipios = dados.map(item => item.municipio);
            var qtds = dados.map(item => item.qtd);

            chart.updateOptions({
                xaxis: { categories: municipios }
            });

            chart.updateSeries([{
                name: "Acidentes",
                data: qtds
            }]);
        })
        .catch(err => console.error("Erro ao buscar top 10 municípios:", err));
}

function PiorMes() {
    var fk_empresa = sessionStorage.FK_EMPRESA

    fetch(`/tela_previa_rota/PiorMes/${fk_empresa}/${anoSelecionado}`)

        .then(res => res.json())
        .then(quantidade => {

            MesAno = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"]

            var qtd = quantidade[0].total_acidente
            var mes = quantidade[0].mes
            document.getElementById("pior_mes").innerText = MesAno[mes - 1];

            document.getElementById("num_mes").innerText = qtd;
        })

}
function top5MaisTiposAcidentes() {
    let lista_img = [
        "atropelamento-animal.png", "atropelamento-pedestre.png",
        "capotamento.png", "colisao-frontal.png", "colisao-lateral.png",
        "colisao-traseira.png", "engavetamento.png", "incendio.png",
        "objeto-contra-veiculo.png", "saida-de-pita.png", "sem-informacao.png", "tombamento.png"
    ];

    var fk_empresa = sessionStorage.FK_EMPRESA

    fetch(`/tela_previa_rota/top5MaisTiposAcidentes/${fk_empresa}/${anoSelecionado}`)

        .then(res => res.json())
        .then(quantidade => {
            for (var i = 0; i < 5; i++) {
                var qtd = quantidade[i].qtd
                var tipo = quantidade[i].tipo
                var img = quantidade[i].classe
                var caminhoImagem = ""

                console.log(`top:${i + 1}º ${tipo} com ${qtd} de acidentes `)
                document.getElementById(`${i + 1}lugar`).innerText = `${tipo}`;
                document.getElementById(`${i + 1}qtd`).innerText = `${qtd} acidentes `;

                switch (img) {
                    case 1: caminhoImagem = "atropelamento-animal.png"; break;
                    case 2: caminhoImagem = "atropelamento-pedestre.png"; break;
                    case 3: caminhoImagem = "capotamento.png"; break;
                    case 4: caminhoImagem = "choque.png"; break;
                    case 5: caminhoImagem = "colisao-frontal.png"; break;
                    case 6: caminhoImagem = "colisao-lateral.png"; break;
                    case 7: caminhoImagem = "colisao-lateral.png"; break;
                    case 8: caminhoImagem = "colisao-traseira.png"; break;
                    case 9: caminhoImagem = "engavetamento.png"; break;
                    case 10: caminhoImagem = "incendio.png"; break;
                    case 11: caminhoImagem = "objeto-contra-veiculo.png"; break;
                    case 12: caminhoImagem = "sem-informacao.png"; break;
                    case 13: caminhoImagem = "queda.png"; break;
                    case 14: caminhoImagem = "saida-de-pita.png"; break;
                    case 15: caminhoImagem = "sem-informacao.png"; break;
                    case 16: caminhoImagem = "tombamento.png"; break;
                    default: caminhoImagem = "sem-informacao.png"; break;
                }

                document.getElementById(`${i + 1}img`).src = `/icons/${caminhoImagem}`;

            }

        })

}

// Funções padrão ----------------------------------------------------------------------------------------------------------------------------------------------------------------------

function mudarAno() {
    anoSelecionado = document.getElementById("selectAnos").value;
    console.log("Ano selecionado:", anoSelecionado);

    if (anoSelecionado) {
        total_acidentes();
        trechoMaisCritico();
        PiorMes();
        top10();
        top5MaisTiposAcidentes();
    }
}

// Alterna a classe "minimizado" no menu + filtro
document.querySelector('.toggle-nav')
    .addEventListener('click', () => {
        document.querySelector('.nav').classList.toggle('minimizado');
        document.querySelector('.filtro-box').classList.toggle('ativo');
    });

// Funções de grafico -----------------------------------------------------------------------------------------------------------------------------------------------------------------

var options = {
    chart: {
        type: 'bar',
        height: 300,
        toolbar: { show: false }
    },
    series: [{
        name: 'Acidentes',
        data: [120, 90, 80, 75, 60, 55, 50, 45, 40, 30]
    }],
    yaxis: {
        title: {
            text: 'Quantidade de acidentes',
            style: {
                fontSize: '14px',
                fontWeight: 'bold',
                color: '#555'
            }
        }
    },
    xaxis: {
        categories: [
            'São Paulo', 'Campinas', 'Sorocaba', 'Santos',
            'Ribeirão Preto', 'Bauru', 'Jundiaí', 'Marília', 'São José', 'Araraquara'
        ],
        labels: {
            style: { fontSize: '12px' }
        }
    },
    colors: ['#ED7D32'],
    plotOptions: {
        bar: {
            borderRadius: 6,
            horizontal: false,
        }
    },
    dataLabels: {
        enabled: true
    },
    title: {
        text: '10 Municípios com mais acidentes',
        align: 'left',
        style: { fontSize: '20px', fontWeight: '800' },
        offsety: -10
    }
};

var chart = new ApexCharts(document.querySelector("#grafico-municipios"), options);
chart.render();