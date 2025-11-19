document.querySelector('.toggle-nav')
            .addEventListener('click', () => {
                document.querySelector('.nav').classList.toggle('minimizado');
            });


async function pegarEmpresa(){
    const resp = await fetch(`/conc/pegarEmpresa`)
    const resp_json = await resp.json();
    console.log(resp_json)
    tbConc.innerHTML=""
    for (const registro of resp_json) {
        tbConc.innerHTML += `
        <tr>
                                    <td>${registro.idEMPRESA}</td>
                                    <td>${registro.NOME}</td>
                                    <td>${registro.EMAIL}</td>
                                    <td>${registro.TELEFONE}</td>
                                    <td>
                                        <a href="#"><img class="icon_tabela" src="../icons/editar.png"></a>
                                        <a href="#"><img class="icon_tabela" src="../icons/lixo.png"></a>
                                    </td>
                                </tr>
        `;
    }
}

window.addEventListener("load", (event) => {
    pegarEmpresa()
});


