document.querySelector('.toggle-nav')
            .addEventListener('click', () => {
                document.querySelector('.nav').classList.toggle('minimizado');
            });


function Validar() {
    var nome = input_nome.value
    var email = input_email.value
    var senha = input_senha.value
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

//Função para surgir input
async function surgirInput() {
  var checkbox = document.getElementById('opcao1');
  var input = document.getElementById('inputcheckbox'); 
  var label = document.getElementById('label-checkbox');

  if (checkbox && checkbox.checked) {
    const resp = await fetch(`/conc/pegarEmpresa`)
            const resp_json = await resp.json();
            console.log(resp_json)
            input.innerHTML=""
            for (const registro of resp_json) {
                input.innerHTML += `
                    <option value="${registro.idEMPRESA}">${registro.NOME}</option>
                `;
        }
    
    // Adicionamos 'checkbox &&' por segurança
    console.log('Está marcado');
    input.style.display = 'block';
    label.style.display = 'block';


  } else {
    console.log('Não está marcado');
    input.style.display = 'none';
    label.style.display = 'none';

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
                        abrirModal()
                    }
                })
            })
            .catch(erro => {
                console.log(erro)
            })
    }
    function abrirModal() {
        document.getElementById('modalConfirm').style.display = "flex";
    }
    function modalErro(mensagem){
        document.getElementById("modalErro").style.display="flex";
        document.getElementById("mensagem-Erro").innerHTML=mensagem
        setTimeout(() => {
            document.getElementById("modalErro").style.display="none";
        }, 2000);
    }
    function fecharModal() {
        document.getElementById('modalConfirm').style.display = "none";
    }
    function confirmarCadastro() {
        var nome = input_nome.value
        var email = input_email.value
        var senha = input_senha.value
        var checkbox = document.getElementById('opcao1');
        var input = document.getElementById('inputcheckbox'); 
        var empresa = -1;
        if(checkbox.checked){
            empresa=input.value
        }
        fetch(`/adm_waysafe/cadastrarAdm`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nomeServer: nome,
                emailServer: email,
                senhaServer: senha,
                empresaServer : empresa
            }),
        })
            .then(function (resposta) {
                console.log("resposta: ", resposta);
            console.log("Cadastro realizado")
            input_nome.value=""
            input_email.value=""
            input_senha.value=""
            checkbox.checked=false
            fecharModal()
            })
            .catch(function (resposta) {
                console.log(`#ERRO: ${resposta}`);
    });
        fecharModal();
        document.getElementById('modalSucesso').style.display = "flex";
    }
    function fecharModalSucesso() {
        document.getElementById('modalSucesso').style.display = "none";

    }
    