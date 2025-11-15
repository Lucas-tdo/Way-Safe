// Alterna menu lateral
document.querySelector('.toggle-nav')
    .addEventListener('click', () => {
        document.querySelector('.nav').classList.toggle('minimizado');
    });

function cadastrar() {
    var nome = input_nome.value
    var email = input_email.value
    var senha = input_senha.value
    var fk_empresa = sessionStorage.FK_EMPRESA

    fetch(`/usuario/cadastrar`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nomeServer: nome,
            emailServer: email,
            senhaServer: senha,
            fk_empresaServer: fk_empresa,
        }),
    })
        .then(function (resposta) {
            console.log("resposta: ", resposta);
            if (resposta.ok) {
                alert("Cadastro realizado");
                postarSlack(nome, email);
            }
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}

function adicionarFuncionario(nome, email) {
    fetch(`/usuario/notificar-slack`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            text: `Novo funcionário cadastrado: ${nome} Email: ${email}`,
        }),
    })
        .then(function (resposta) {
            console.log("Notificação Slack enviada:", resposta);
        })
        .catch(function (erro) {
            console.log(`#ERRO ao notificar Slack: ${erro}`);
        });
}


function removerFuncionario(nome, email) {
    fetch(`/usuario/notificar-slack`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            text: `Funcionário removido: ${nome} Email: ${email}`,
        }),
    })
        .then(function (resposta) {
            console.log("Notificação Slack enviada:", resposta);
        })
        .catch(function (erro) {
            console.log(`#ERRO ao notificar Slack: ${erro}`);
        });
}