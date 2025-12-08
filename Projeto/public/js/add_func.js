// Alterna menu lateral
document.querySelector('.toggle-nav')
    .addEventListener('click', () => {
        document.querySelector('.nav').classList.toggle('minimizado');
    });

   listar_funcionarios() 
// function adicionarFuncionario(nome, email) {
//     fetch(`/usuario/notificar-slack`, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//             text: `Novo funcionário cadastrado: ${nome} Email: ${email}`,
//         }),
//     })
//         .then(function (resposta) {
//             console.log("Notificação Slack enviada:", resposta);
//         })
//         .catch(function (erro) {
//             console.log(`#ERRO ao notificar Slack: ${erro}`);
//         });
// }


function listar_funcionarios(){
       lista_funcs.innerHTML = ""
    var fk_empresa = sessionStorage.FK_EMPRESA
    
     fetch(`/adm_concessionaria_rota/listar_funcionarios/${fk_empresa}`)
        .then(res => res.json())
        .then(anos => {
            console.log(anos)
            anos.forEach(ano => {
                document.getElementById("lista_funcs").innerHTML += `
                                            <tr>
                                <td>${ano.idUSUARIO}</td>
                                <td>${ano.nome}</td>
                                <td>${ano.email}</td>
                                <td>${ano.senha}</td>
                                <td>
                                    <a href="#"><img class="icon-tabela" src="../icons/lapisedit.png" onclick="Editar_Funcionario(${ano.idUSUARIO})"></a>
                                    <a href="#"><img class="icon_tabela" src="../icons/delete2.png" onclick="Excluir_Funcionario(${ano.idUSUARIO})"></a>
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
function Excluir_Funcionario(Id) {
    const funcionarioId = Id

    fetch(`/adm_concessionaria_rota/excluir_funf/${funcionarioId}`, {
        method: "DELETE"
    })
    .then(res => {
        if (!res.ok) {
            throw new Error(`Erro ao excluir: ${res.status}`);
        }
        console.log("Funcionário excluído com sucesso!");
        alert("Funcionário excluído com sucesso!");
 
        listar_funcionarios()

    })
    .catch(error => {
        console.error("Erro ao excluir funcionário:", error);
        alert("Falha ao excluir funcionário. Verifique o console.");
    });
}