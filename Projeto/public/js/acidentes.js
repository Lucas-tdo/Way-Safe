async function municipio_mais_acidentes(ano) {
    var fk_empresa = sessionStorage.FK_EMPRESA
    
        ano = (ano == null || ano == "undefined" || ano === "") ? "erro" : ano


    const resp = await fetch(`/tela_acidentes_rota/municipio_mais_acidentes/${fk_empresa}/${ano}`)
    if (resp.ok) {
        const resp_municipio = await resp.json();
        console.log(resp_municipio);
        const municipio = resp_municipio.map(item => item.municipio)
        const quantidade = resp_municipio.map(item => item.total_vitima)
        
        document.getElementById("municipio_mais_vitimas").innerText = `${municipio[0]}(${quantidade[0]})`;
        graficoMunicipios.updateOptions({
            xaxis: {
                categories: municipio
            }
        });

        graficoMunicipios.updateSeries([{
            data: quantidade
        }]);
    }
    else {
        console.log("Erro municipio_mais_acidentes")
    }
}

async function total_de_acidentes(ano) {
    var fk_empresa = sessionStorage.FK_EMPRESA
    ano = (ano == null || ano == "undefined" || ano === "") ? "erro" : ano


    const resp = await fetch(`/tela_acidentes_rota/total_de_acidentes/${fk_empresa}/${ano}`)
    if (resp.ok) {
        
        const resp_total = await resp.json();
        const qtd = resp_total.map(item => item.total);
        
        document.getElementById("total_de_acidentes").innerText = `${qtd}`;
        
    }
    else {
        console.log("Erro")
    }
}

async function total_acidentes_por_tipo(ano) {
    var fk_empresa = sessionStorage.FK_EMPRESA;
    ano = (ano == null || ano == "undefined" || ano === "") ? "erro" : ano

    
    const resp = await fetch(`/tela_acidentes_rota/total_acidentes_por_tipo/${fk_empresa}/${ano}`)
    if (resp.ok) {
        const resp_municipio_tipo = await resp.json();
        const tipos = resp_municipio_tipo.map(item => item.descr);
        const tipoMaisRecorrente = resp_municipio_tipo.map(item => item.descr)[0];

        const quantidade_por_tipo = resp_municipio_tipo.map(item => item.total_vitima_fatais);

        document.getElementById("tipo_mais_recorrente").innerText = `${tipoMaisRecorrente}`;

        graficoTipos.updateOptions({
            xaxis: {
                categories: tipos
            }
        });

        graficoTipos.updateSeries([{
            data: quantidade_por_tipo
        }]);
    }
    else {
        console.log("Erro")
    }
}

// Funções padrão ----------------------------------------------------------------------------------------------------------------------------------------------------------------------

document.querySelector('.toggle-nav')
    .addEventListener('click', () => {
        document.querySelector('.nav').classList.toggle('minimizado');
    });

window.addEventListener("load", (event) => {
    carregar_anos()

    municipio_mais_acidentes()
    total_de_acidentes()
    total_acidentes_por_tipo()
});

function mudanca_seletor(ano) {

    municipio_mais_acidentes(ano);
    total_de_acidentes(ano);
    total_acidentes_por_tipo(ano)
}

function carregar_anos() {
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
// Grafico tipos de acidente --------------------------------------------------------------------------------------------------------------

var tiposOptions = {
    chart: {
        type: 'bar',
        height: 350,
        width: '100%',
        toolbar: { show: false },
    },
    series: [{
        name: 'Quantidade de acidentes',
        data: []
    }],
    xaxis: {
        categories: [],
        title: {
            text: 'TIPOS DE ACIDENTES',
            style: {
                fontWeight: 700,
                fontSize: '12px'
            }
        },
        labels: {
            rotate: -45,
            rotateAlways: true,
            style: {
                fontSize: '11px'
            },
            trim: true,
            hideOverlappingLabels: true
        }
    },
    yaxis: {
        title: {
            text: 'QUANTIDADE DE ACIDENTES',
            style: {
                fontWeight: 700,
                fontSize: '12px'
            }
        },
        labels: {
            style: {
                fontSize: '11px'
            }
        }
    },
    plotOptions: {
        bar: {
            borderRadius: 6,
            horizontal: false,
            columnWidth: '55%',
            distributed: true // 👈 faz cada barra ter uma cor diferente
        }
    },
    colors: [
        '#0077b6', '#0096c7', '#00b4d8', '#48cae4',
        '#90e0ef', '#ade8f4', '#caf0f8', '#ffafcc',
        '#ff758f', '#fb6f92', '#e36414', '#ffb703',
        '#ff9f1c', '#ff4d6d', '#9d4edd', '#5a189a'
    ], // 👈 paleta variada
    title: {
        text: 'Tipos de acidentes',
        align: 'left',
        style: {
            fontSize: '20px',
            fontWeight: '900',
            color: '#111'
        }
    },
    dataLabels: {
        enabled: false
    },
    grid: {
        borderColor: '#eee',
        padding: {
            left: 10,
            right: 10
        }
    },
    legend: {
        show: false
    },
    responsive: [{
        breakpoint: 768,
        options: {
            chart: {
                height: 320
            },
            title: {
                style: {
                    fontSize: '16px'
                }
            },
            xaxis: {
                labels: {
                    style: {
                        fontSize: '9px'
                    }
                },
                title: {
                    style: {
                        fontSize: '10px'
                    }
                }
            },
            yaxis: {
                labels: {
                    style: {
                        fontSize: '9px'
                    }
                },
                title: {
                    style: {
                        fontSize: '10px'
                    }
                }
            }
        }
    }, {
        breakpoint: 480,
        options: {
            chart: {
                height: 280
            },
            title: {
                style: {
                    fontSize: '14px'
                }
            },
            xaxis: {
                labels: {
                    style: {
                        fontSize: '8px'
                    },
                    rotate: -45
                },
                title: {
                    style: {
                        fontSize: '9px'
                    }
                }
            },
            yaxis: {
                labels: {
                    style: {
                        fontSize: '8px'
                    }
                },
                title: {
                    style: {
                        fontSize: '9px'
                    }
                }
            },
            plotOptions: {
                bar: {
                    columnWidth: '70%'
                }
            }
        }
    }]
};

var tiposOptions2 = {
    chart: {
        type: 'bar',
        height: 350,
        width: '100%',
        toolbar: { show: false },
    },
    series: [{
        name: 'Quantidade de acidentes',
        data: []
    }],
    xaxis: {
        categories: [],
        title: {
            text: 'Municípios',
            style: {
                fontWeight: 700,
                fontSize: '12px'
            }
        },
        labels: {
            rotate: -45,
            rotateAlways: true,
            style: {
                fontSize: '11px'
            },
            trim: true,
            hideOverlappingLabels: true
        }
    },
    yaxis: {
        title: {
            text: 'QUANTIDADE DE VÍTIMAS',
            style: {
                fontWeight: 700,
                fontSize: '12px'
            }
        },
        labels: {
            style: {
                fontSize: '11px'
            }
        }
    },
    plotOptions: {
        bar: {
            borderRadius: 6,
            horizontal: false,
            columnWidth: '55%',
            distributed: true // 👈 faz cada barra ter uma cor diferente
        }
    },
    colors: [
        '#0077b6', '#0096c7', '#00b4d8', '#48cae4',
        '#90e0ef', '#ade8f4', '#caf0f8', '#ffafcc',
        '#ff758f', '#fb6f92', '#e36414', '#ffb703',
        '#ff9f1c', '#ff4d6d', '#9d4edd', '#5a189a'
    ], // 👈 paleta variada
    title: {
        text: 'Municipios com mais vítimas',
        align: 'left',
        style: {
            fontSize: '20px',
            fontWeight: '900',
            color: '#111'
        }
    },
    dataLabels: {
        enabled: false
    },
    grid: {
        borderColor: '#eee',
        padding: {
            left: 10,
            right: 10
        }
    },
    legend: {
        show: false
    },
    responsive: [{
        breakpoint: 768,
        options: {
            chart: {
                height: 320
            },
            title: {
                style: {
                    fontSize: '16px'
                }
            },
            xaxis: {
                labels: {
                    style: {
                        fontSize: '9px'
                    }
                },
                title: {
                    style: {
                        fontSize: '10px'
                    }
                }
            },
            yaxis: {
                labels: {
                    style: {
                        fontSize: '9px'
                    }
                },
                title: {
                    style: {
                        fontSize: '10px'
                    }
                }
            }
        }
    }, {
        breakpoint: 480,
        options: {
            chart: {
                height: 280
            },
            title: {
                style: {
                    fontSize: '14px'
                }
            },
            xaxis: {
                labels: {
                    style: {
                        fontSize: '8px'
                    },
                    rotate: -45
                },
                title: {
                    style: {
                        fontSize: '9px'
                    }
                }
            },
            yaxis: {
                labels: {
                    style: {
                        fontSize: '8px'
                    }
                },
                title: {
                    style: {
                        fontSize: '9px'
                    }
                }
            },
            plotOptions: {
                bar: {
                    columnWidth: '70%'
                }
            }
        }
    }]
};

// Renderiza os gráficos
var graficoTipos = new ApexCharts(document.querySelector("#grafico-tipos"), tiposOptions);
var graficoMunicipios = new ApexCharts(document.querySelector("#grafico-municipios"), tiposOptions2);

graficoTipos.render();
graficoMunicipios.render();