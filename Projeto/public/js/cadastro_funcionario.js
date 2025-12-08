document.querySelector('.toggle-nav')
            .addEventListener('click', () => {
                document.querySelector('.nav').classList.toggle('minimizado');
            });

        function abrirModal() {
            document.getElementById('modalConfirm').style.display = "flex";
        }

        function fecharModal() {
            document.getElementById('modalConfirm').style.display = "none";
        }

        function confirmarCadastro() {
            cadastrarFuncionario()
            input_nome.value=""
            input_email.value=""
            input_senha.value=""
            fecharModal();
            document.getElementById('modalSucesso').style.display = "flex";
        }

        function fecharModalSucesso() {
            document.getElementById('modalSucesso').style.display = "none";
        }

function Validar() {
    var nome =  input_nome.value
    var email = input_email.value
    var senha = input_senha.value
    // no caso, a fk não vai ser inserida de novo, mas chamada via session Storage
    var fk_empresa = sessionStorage.FK_EMPRESA

    // var fk_empresa = input_fk_empresa.value
    // var nivel_acesso = input_nivel.value

    var mensagem = ''

    if (email == "" || senha == "" || nome =="") {
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
        modalErro(mensagem)
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
                    modalErro("Email já está em uso!")
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
// não acho que vai precisar validar a empresa de novo, mas vou deixar em aguardo aqui por enquanto
function checarEmpresa(fk_empresa) {
    fetch(`/usuario/checarEmpresa/${fk_empresa}`, {
        method: "GET"
    })
        .then(resposta => {
            resposta.json().then(resposta => {
                if (resposta.length = 0) {
                    modalErro("Codigo de empresa inválido")
                }
                else {
                    abrirModal()
                }
            })
        })
        .catch(erro => {
            console.log(erro)
        })

}

function modalErro(mensagem){
        document.getElementById("modalErro").style.display="flex";
        document.getElementById("mensagem-Erro").innerHTML=mensagem
        setTimeout(() => {
            document.getElementById("modalErro").style.display="none";
        }, 2000);
    }

function cadastrarFuncionario() {
    var nome = input_nome.value
    var email = input_email.value
    var senha = input_senha.value
    var nivel_acesso = input_nivel.value
    var fk_empresa = sessionStorage.FK_EMPRESA

    console.log(fk_empresa)
    // var nivel_acesso = input_nivel.value

    fetch(`/usuario/cadastrarFuncionario/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nomeServer: nome,
            emailServer: email,
            senhaServer: senha,
            fk_empresaServer: fk_empresa,
            nivelAcessoServer: nivel_acesso
        }),
    })
        .then(function (resposta) {
            console.log("resposta: ", resposta);
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);

        });
}
