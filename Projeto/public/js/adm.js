//Função para pegar os usuários WaySafe
//Okay, mas como saber quem são os ADM?
// Como fazer também a respeito da senha?

document.querySelector('.toggle-nav')
            .addEventListener('click', () => {
                document.querySelector('.nav').classList.toggle('minimizado');
            });


        function refresh(){
            console.log("atualizando a página")
            window.location.reload();
        }

        /* === MODAL JS === */
        var idExcluir;
        const modal = document.getElementById("modalexcluir");
        const cancelarBtn = document.getElementById("cancelar-excluir");
        const confirmarBtn = document.getElementById("confirmar-excluir");


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
            fetch(`/adm_waysafe/removerADM`,{
                    method : "DELETE",
                    headers :{
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        idServer: idExcluir
                    })
                })
                .then(resposta=>{
                    console.log(resposta)
                    pegarAdm()
                })
                .catch(erro=>{
                    console.log(erro)
                })

            modal.style.display = "none";
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
                                      <a href="#" onclick="enviarEditar(${registro.idUSUARIO})"> <img class="icon-tabela" src="../icons/editar.png"></a>
                                      <a href="#" onclick="abrirExcluir(${registro.idUSUARIO})" ><img class="icon_tabela" src="../icons/lixo.png"></a>
                                  </td>
                              </tr>
      `;
  }
}

function enviarEditar(id){
    sessionStorage.setItem("IDADM",id);
    window.location.href="editar_ADM.html";
}

function abrirExcluir(id){
    var divExcluir = document.getElementById("modalexcluir")
    divExcluir.style.display = "flex";
    idExcluir=id;
}

window.addEventListener("load", (event) => {
  pegarAdm()
});
