// Alterna menu lateral
var idExcluir;


        document.querySelector('.toggle-nav')
            .addEventListener('click', () => {
                document.querySelector('.nav').classList.toggle('minimizado');
            });

        /* === MODAL JS === */
        const cancelarBtn = document.getElementById("cancelar-excluir");
        const confirmarBtn = document.getElementById("confirmar-excluir");

        // Abre modal ao clicar na lixeira





        // Escuta todos cliques da página
        document.addEventListener("click", function (e) {

            // Se clicou no ícone de editar
            if (e.target.classList.contains("icon-tabela")) {

                e.preventDefault();

                // Aqui você coloca a página que vai abrir:
                window.location.href = "editar.html";

            }
        });



document.querySelector('.toggle-nav')
    .addEventListener('click', () => {
        document.querySelector('.nav').classList.toggle('minimizado');
    });


   
   

function listar_funcionarios(){
       lista_funcs.innerHTML = ""
    var fk_empresa = sessionStorage.FK_EMPRESA
    
     fetch(`/adm_concessionaria_rota/listar_funcionarios/${fk_empresa}`)
        .then(res => res.json())
        .then(anos => {
            lista_funcs.innerHTML=""; 
            console.log(anos)
            anos.forEach(ano => {
                document.getElementById("lista_funcs").innerHTML += `
                                            <tr>
                                <td>${ano.idUSUARIO}</td>
                                <td>${ano.nome}</td>
                                <td>${ano.email}</td>
                                <td>*******</td>
                                <td>
                                    <a href="#"><img class="icon-tabela" src="../icons/lapisedit.png" onclick="Editar_Funcionario(${ano.idUSUARIO})"></a>
                                    <a href="#"><img class="icon_tabela" src="../icons/delete2.png" onclick="abrirExcluir(${ano.idUSUARIO})"></a>
                                </td>
                            </tr>
                `
            });
            console.log(`${anos.length} anos de acidente`);
        })
        .catch(error => {
            console.error("Erro ao carregar funcionarios:", error);
        });
}

function Editar_Funcionario(Id){
    sessionStorage.IDFUNCIONARIO = Id;
}
function Excluir_Funcionario() {

    fetch(`/adm_concessionaria_rota/excluir_funf/${idExcluir}`, {
        method: "DELETE"
    })
    .then(res => {
        if (!res.ok) {
            throw new Error(`Erro ao excluir: ${res.status}`);
        }
        console.log("Funcionário excluído com sucesso!");
        fecharExcluir()
        listar_funcionarios()

    })
    .catch(error => {
        console.error("Erro ao excluir funcionário:", error);
        alert("Falha ao excluir funcionário. Verifique o console.");
    });
}


function abrirExcluir(id){
            var divExcluir = document.getElementById("modalexcluir")
            divExcluir.style.display = "flex";
            idExcluir=id;
}

function fecharExcluir(){
            var divExcluir = document.getElementById("modalexcluir")
            divExcluir.style.display = "none";
}

 window.addEventListener("load", (event) => {
               listar_funcionarios() 
        });