

    var anoSelecionado = null;
    // let rodoviaSelecionada = sessionStorage.FK_RODOVIA;
    let rodoviaSelecionada = sessionStorage.codigoRodovia;
;

    chamarFuncoes()

    function chamarFuncoes(){

    // document.getElementById("nome").innerText=`Olá, ${sessionStorage.NOME_USUARIO}`
      anosAcidentes()
      top5MaisTiposAcidentes(),
      municipiosAcidentesQtd(),
      total_acidentes(),
      rodovia()

    }



  function anosAcidentes(){
  var fk_empresa = sessionStorage.FK_EMPRESA;

  fetch(`/tela_rodovia_esp_rota/anosAcidentes/${fk_empresa}/${rodoviaSelecionada}`)
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




    function mudarAno() {
    anoSelecionado = document.getElementById("selectAnos").value;
    console.log("Ano selecionado:", anoSelecionado);
  
    if (anoSelecionado) {
      anosAcidentes();
      top5MaisTiposAcidentes();
      municipiosAcidentesQtd();
      total_acidentes();
      rodovia()
    }
  }


    function top5MaisTiposAcidentes() {
  var fk_empresa = sessionStorage.FK_EMPRESA;

  fetch(`/tela_rodovia_esp_rota/top5MaisTiposAcidentes/${fk_empresa}/${anoSelecionado}/${rodoviaSelecionada}`)
    .then(res => {
      if (!res.ok) {
        throw new Error(`Erro na requisição: ${res.status}`);
      }
      return res.json();
    })
    .then(dados => {
      console.log("Top 5 tipos de acidente:", dados);

      if (!Array.isArray(dados) || dados.length === 0) {
        console.warn("Nenhum dado recebido para o gráfico de pizza.");
        chartPie.updateOptions({
          labels: [],
        });
        chartPie.updateSeries([]);
        return;
      }

      const tipos = dados.map(item => item.tipo);
      const quantidades = dados.map(item => item.qtd);

      chartPie.updateOptions({
        labels: tipos
      });

      chartPie.updateSeries(quantidades);
    })
    .catch(err => {
      console.error("Erro ao buscar top 5 tipos de acidente:", err);
    });

  }

 function municipiosAcidentesQtd() {
  const fk_empresa = sessionStorage.FK_EMPRESA;

  fetch(`/tela_rodovia_esp_rota/municipiosAcidentesQtd/${fk_empresa}/${anoSelecionado}/${rodoviaSelecionada}`)
    .then(res => {
      if (!res.ok) {
        throw new Error(`Erro na requisição: ${res.status}`);
      }
      return res.json();
    })
    .then(dados => {
      console.log("Municípios com acidentes:", dados);

      if (!Array.isArray(dados) || dados.length === 0) {
        console.warn("Nenhum dado recebido para o gráfico de municípios.");
        chartBar.updateOptions({
          xaxis: { categories: [] }
        });
        chartBar.updateSeries([{ name: "Acidentes", data: [] }]);
        return;
      }

      const municipios = dados.map(item => item.municipio);
      const quantidades = dados.map(item => item.total_acidentes);

      chartBar.updateOptions({
        xaxis: {
          categories: municipios
        }
      });

      chartBar.updateSeries([
        {
          name: "Acidentes",
          data: quantidades
        }
      ]);
    })
    .catch(err => {
      console.error("Erro ao buscar dados de municípios:", err);
    });
}


function total_acidentes(){
      
      var fk_empresa = sessionStorage.FK_EMPRESA
      
      fetch(`/tela_rodovia_esp_rota/qtdAcidentes/${fk_empresa}/${anoSelecionado}/${rodoviaSelecionada}`)
      
      .then(res => res.json())
      .then(quantidade => {

        var qtd = quantidade[0].qtd_Acidente
                document.getElementById("qtd_acidentes_total_rodovia").innerText = qtd;
            })
          }


    function rodovia(){
      
      fetch(`/tela_rodovia_esp_rota/nomeRodovia/${rodoviaSelecionada}`)
      
      .then(res => res.json())
      .then(rodovia => {

        var rodovia_nome = rodovia[0].rodovia_cod_numeric
                document.getElementById("nome-rodovia").innerText = rodovia_nome;
            })
          }


