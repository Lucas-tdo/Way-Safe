        var idExcluir;

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
                                                <a href="#" onclick="enviarEditar(${registro.idEMPRESA})"><img class="icon_tabela" src="../icons/lapisedit.png"></a>
                                                <a href="#" onclick="abrirExcluir(${registro.idEMPRESA})"><img class="icon_tabela" src="../icons/delete.png"></a>
                                            </td>
                                        </tr>
                `;
            }
        }

        window.addEventListener("load", (event) => {
            pegarEmpresa()
        });


       /* === MODAL JS === */
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
            alert(" Função de excluir no banco.");
            fetch(`/adm_waysafe/removerConc`,{
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
                    pegarEmpresa()
                })
                .catch(erro=>{
                    console.log(erro)
                })

            modal.style.display = "none";
        });


        function enviarEditar(id){
            sessionStorage.setItem("IDADM",id);
            window.location.href="editar_concessionaria.html";
        }

        function abrirExcluir(id){
            var divExcluir = document.getElementById("modalexcluir")
            divExcluir.style.display = "flex";
            idExcluir=id;
        }





