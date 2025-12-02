// Alterna menu lateral
document.querySelector('.toggle-nav')
    .addEventListener('click', () => {
        document.querySelector('.nav').classList.toggle('minimizado');
    });

// function cadastrar() {
//     var nome = input_nome.value
//     var email = input_email.value
//     var senha = input_senha.value
        // var fk_empresa = sessionStorage.FK_EMPRESA

//     fetch(`/usuario/cadastrar`, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//             nomeServer: nome,
//             emailServer: email,
//             senhaServer: senha,
//             fk_empresaServer: fk_empresa,
//         }),
//     })
//         .then(function (resposta) {
//             console.log("resposta: ", resposta);
//             if (resposta.ok) {
//                 alert("Cadastro realizado");
//                 postarSlack(nome, email);
//             }
//         })
//         .catch(function (resposta) {
//             console.log(`#ERRO: ${resposta}`);
//         });
// }

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


// function removerFuncionario(nome, email) {
//     fetch(`/usuario/notificar-slack`, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//             text: `Funcionário removido: ${nome} Email: ${email}`,
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
    
    var fk_empresa = 12
    
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
                                    <a href="#"><img class="icon-tabela" src="../icons/editar.png" onclick="Editar_Funcionario(${ano.idUSUARIO})"></a>
                                    <a href="#"><img class="icon_tabela" src="../icons/lixo.png" onclick="Excluir_Funcionario(${ano.idUSUARIO})"></a>
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
        lista_funcs.innerHTML = ""
        listar_funcionarios()

    })
    .catch(error => {
        console.error("Erro ao excluir funcionário:", error);
        alert("Falha ao excluir funcionário. Verifique o console.");
    });
}