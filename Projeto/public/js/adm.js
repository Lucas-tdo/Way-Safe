//Função para pegar os usuários WaySafe
//Okay, mas como saber quem são os ADM?
// Como fazer também a respeito da senha?

document.querySelector('.toggle-nav')
            .addEventListener('click', () => {
                document.querySelector('.nav').classList.toggle('minimizado');
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
                window.location.href = "editar_funcionario.html";

            }
        });


async function pegarAdm(){
  const resp = await fetch(`/adm_waysafe/pegarFuncAdm`)
  const resp_json = await resp.json();
  console.log(resp_json)
  tbAdm.innerHTML=""
  for (const registro of resp_json) {
    tbAdm.innerHTML += `
      <tr>
                                  <td>${registro.idUSUARIO}</td>
                                  <td>${registro.nome}</td>
                                  <td>${registro.email}</td>
                                  <td>*********</td>
                                  <td>
                                      <a href="#"><img class="icon_tabela" src="../icons/editar.png"></a>
                                      <a href="#"><img class="icon_tabela" src="../icons/lixo.png"></a>
                                  </td>
                              </tr>
      `;
  }
}

window.addEventListener("load", (event) => {
  pegarAdm()
});
