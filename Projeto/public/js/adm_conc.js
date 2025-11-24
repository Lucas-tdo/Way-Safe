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


       /* === MODAL JS === */
        const modal = document.getElementById("modal-confirmar");
        const cancelarBtn = document.getElementById("cancelar-excluir");
        const confirmarBtn = document.getElementById("confirmar-excluir");

        // Abre modal ao clicar na lixeira
        document.querySelectorAll('.icon_tabela[src="../icons/lixo.png"]').forEach(icon => {
            icon.addEventListener('click', (e) => {
                e.preventDefault();
                modal.style.display = "flex";
            });
        });

        // Cancelar fecha o modal
        cancelarBtn.addEventListener('click', () => {
            modal.style.display = "none";
        });

        // Clicar fora fecha
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = "none";
            }
        });

        // Aqui você faz a conexão depois
        confirmarBtn.addEventListener('click', () => {
            alert(" Função de excluir no banco.");
            modal.style.display = "none";
        });


        // Escuta todos cliques da página
        document.addEventListener("click", function (e) {

            // Se clicou no ícone de editar
            if (e.target.classList.contains("icon-tabela")) {

                e.preventDefault();

                // Aqui você coloca a página que vai abrir:
                window.location.href = "editar_concessionaria.html";

            }
        });




