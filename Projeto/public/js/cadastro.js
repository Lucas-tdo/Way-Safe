function Validar() {
    var nome = input_nome.value
    var email = input_email.value
    var senha = input_senha.value
    var fk_empresa = input_fk_empresa.value

    var mensagem = ''

    if (nome == "" || email == "" || senha == "" || fk_empresa == "") {
        mensagem = "Todos campos devem estar preenchidos"
    }
    else {
        if (!(email.includes("@"))) {
            mensagem = `O email precisa conter @`
        }
        else if (!(email.includes("."))) {
            mensagem = `O email precisa conter .`
        }
        else {
            if (senha.length < 7) {
                mensagem = "A senha tem que ter pelo menos 8 caracteres"
            }
            else {
                var especiais = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_', '=', '+', '[', ']', '{', '}', ';', ':', "'", '"', '\\', '|', ',', '.', '<', '>', '/', '?', '`', '~']
                var maiusculas = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
                var minusculas = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
                var numeros = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
                var senha_especial = false
                var senha_maiuscula = false
                var senha_numeros = false
                var senha_minuscula = false

                for (i = 0; i < especiais.length; i++) {
                    if (senha.includes(especiais[i])) {
                        senha_especial = true
                        break
                    }
                }

                for (i = 0; i < maiusculas.length; i++) {
                    if (senha.includes(maiusculas[i])) {
                        senha_maiuscula = true
                        break
                    }
                }

                for (i = 0; i < minusculas.length; i++) {
                    if (senha.includes(minusculas[i])) {
                        senha_minuscula = true
                        break
                    }
                }

                for (i = 0; i < numeros.length; i++) {
                    if (senha.includes(numeros[i])) {
                        senha_numeros = true
                        break
                    }
                }

                if (!senha_especial || !senha_maiuscula || !senha_minuscula || !senha_numeros) {
                    if (!senha_especial) {
                        mensagem = "A senha precisa de pelo menos um caractere especial"
                    }
                    if (!senha_maiuscula) {
                        mensagem = "A senha precisa de pelo uma letra maiúscula"
                    }
                    if (!senha_minuscula) {
                        mensagem = "A senha precisa de pelo menos uma letra minúscula "
                    }
                    if (!senha_numeros) {
                        mensagem = "A senha precisa de pelo menos um número"
                    }
                }
            }


        }

    }


    if (mensagem == "") {
        checaremail()
    }
    else {
        alert(mensagem)
    }
}

function checaremail() {
    var email = input_email.value
    fetch(`/usuario/checaremail/${email}`, {
        method: "GET"
    })
        .then(resposta => {
            resposta.json().then(resposta => {
                if (resposta.length > 0) {
                    alert("Email já está em uso!")
                }
                else {

                    checarEmpresa()
                }
            })
        })
        .catch(erro => {
            console.log(erro)
        })
}

function checarEmpresa() {
    var empresa = input_fk_empresa.value
    fetch(`/usuario/checarEmpresa/${empresa}`, {
        method: "GET"
    })
        .then(resposta => {
            resposta.json().then(resposta => {
                if (resposta.length = 0) {
                    alert("Codigo de empresa inválido")
                }
                else {
                    cadastrar()
                }
            })
        })
        .catch(erro => {
            console.log(erro)
        })

}


function cadastrar() {
    var nome = input_nome.value
    var email = input_email.value
    var senha = input_senha.value
    var fk_empresa = input_fk_empresa.value

    fetch(`/usuario/cadastrar/`, {
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
            alert("Cadastro realizado")
            setTimeout(() => {
                window.location.href = '/login.html'
            }, 2000);
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);

        });
}
