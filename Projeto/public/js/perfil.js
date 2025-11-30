 // Menu lateral
    document.querySelector('.toggle-nav')
      .addEventListener('click', () => {
        document.querySelector('.nav').classList.toggle('minimizado');
      });

    // INICIO: Abertura e fechamento de popup
      const abrePopup = document.getElementById("abrir-popup");
      const fechaPopup = document.getElementById("fechar-popup");
      const popup = document.getElementById("popup");

      abrePopup.addEventListener("click", () =>{
        popup.classList.add("abrir-popup");
      })
      fechaPopup.addEventListener("click", () =>{
        popup.classList.remove("abrir-popup");
      })
      // FIM: Abertura e fechamento de popup
      
      // INICIO: VALIDAÇÃO PEGAR SENHA 

  function pegarSenha() {
    var email = sessionStorage.EMAIL_USUARIO;
    var senha = input_senha_atual.value;
    fetch(`/usuario/pegarSenha/${email}/${encodeURIComponent(senha)}`, {
        method: "GET"
    })
        .then(resposta => {
            resposta.json().then(resposta => {
              console.log(resposta);
                if (resposta.length <= 0) {
                    console.log("Erro ao pegar senha atual")
                } else {
                    console.log("Deu certo!");
                    validarInputsSenha()
                    
                  
                  }
                
                  // nova função para validar e inserir a senha atual ao input.
                  // fazer comparação da senha atual no bd, com a que o usuário inseriu, confirmando que são a mesma.
                
            })
        })
        .catch(erro => {
            console.log(erro)
        })
  }

  function validarInputsSenha() {
    var senhaNova = input_senha_nova.value
    var senhaConfirmacao = input_senha_confirmacao.value
    
    var mensagem = ''

    if (senhaNova == "" || senhaConfirmacao == "") {
      mensagem = "Todos campos devem estar preenchidos"
    }
    else {
            if (senhaNova.length < 7 || senhaConfirmacao.length < 7) {
                mensagem = "A nova senha tem que ter pelo menos 8 caracteres"
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
                var senhas_compativeis = false

                for (i = 0; i < especiais.length; i++) {
                    if (senhaNova.includes(especiais[i])) {
                        senha_especial = true
                        break
                    }
                }

                for (i = 0; i < maiusculas.length; i++) {
                    if (senhaNova.includes(maiusculas[i])) {
                        senha_maiuscula = true
                        break
                    }
                }

                for (i = 0; i < minusculas.length; i++) {
                    if (senhaNova.includes(minusculas[i])) {
                        senha_minuscula = true
                        break
                    }
                }

                for (i = 0; i < numeros.length; i++) {
                    if (senhaNova.includes(numeros[i])) {
                        senha_numeros = true
                        break
                    }
                }

                if(senhaNova == senhaConfirmacao){
                  senhas_compativeis = true
                }

                if (!senha_especial || !senha_maiuscula || !senha_minuscula || !senha_numeros || !senhas_compativeis) {
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
                    if (!senhas_compativeis) {
                        mensagem = "As senhas precisam ser compatíveis"
                    }
                }

                
            }

        }
        if (mensagem == "") {
          console.log("Senha Validada!")
          var senha = input_senha_nova.value
          var idUSUARIO = sessionStorage.ID_USUARIO
          registrarNovaSenha(senha, idUSUARIO)
          

      }
      else {
        console.log("Erro ao tentar atualizar senha!")
        console.log(mensagem)
      }
    }

    async function registrarNovaSenha(){
      var senha = input_senha_nova.value
      const idUSUARIO = sessionStorage.ID_USUARIO;

      if (!idUSUARIO) {
        return console.log('Usuário não identificado');
      }

      fetch(`/usuario/atualizarSenha/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idUSUARIO: idUSUARIO,
          senha: senha,
        }),
    })
        .then(function (resposta) {
            console.log("resposta: ", resposta);
            console.log("Senha atualizada!")
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
    }

      // FIM: VALIDAÇÃO PEGAR SENHA 


    // Foto de perfil
    const inputFoto = document.getElementById('input-foto');
    const fotoPreview = document.getElementById('fotoPreview');
    const fotoContainer = document.getElementById('fotoContainer');

    inputFoto.addEventListener('change', function () {
      const arquivo = this.files[0];
      if (arquivo) {
        const leitor = new FileReader();
        leitor.onload = function (e) {
          fotoPreview.src = e.target.result;
          fotoPreview.style.display = 'block';
          fotoContainer.querySelector('span').style.display = 'none';
        }
        leitor.readAsDataURL(arquivo);
      }
    });
    //Fim da lógica para colocar a foto de perfil

    // Alternar modo de edição
    const editarBtn = document.getElementById('editarBtn');
    let editando = false;

    editarBtn.addEventListener('click', () => {
      if (!editando) {
        // Entrar no modo edição
        transformarEmInputs();
        editarBtn.innerHTML = '<img src="../icons/check.svg" alt="" height="18px"> Salvar';
        editando = true;
      } else {
        // Salvar e voltar para visualização
        const msg = document.getElementById("msg");

        msg.classList.add("ativa");

        setTimeout(() => {
          msg.classList.remove("ativa");
        }, 1000); // some depois de 2s

        salvarAlteracoes();
        editarBtn.innerHTML = '<img src="../icons/lapisPreto.png" alt="" height="18px"> Editar';
        editando = false;
      }
    });

    function transformarEmInputs() {
      const campos = ['nome', 'email', 'senha'];
      campos.forEach(campo => {
        const p = document.getElementById(`${campo}View`);
        const valor = p.textContent;
        if(campo=="senha"){
          p.outerHTML = `<input style="background-color:#DEDEDE;" class="caixa-de-texto" id="${campo}Input" placeholder="Digite a nova senha" type="${campo === 'senha' ? 'password' : 'text'}" >`;
        }
        else{
          p.outerHTML = `<input style="background-color:#DEDEDE;" class="caixa-de-texto" id="${campo}Input" type="${campo === 'senha' ? 'password' : 'text'}" value="${valor}">`;

        }
      });
    }

    function salvarAlteracoes() {
      var nome = nomeInput.value; 
      var email = emailInput.value;
      

      fetch(`/adm_waysafe/editarDados/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nomeServer: nome,
            emailServer: email,
            idServer: sessionStorage.ID_USUARIO
            
        }),
    })
        .then(function (resposta) {
            console.log("resposta: ", resposta);
            alert("Funcionou!")
            sessionStorage.EMAIL_USUARIO = email
            sessionStorage.NOME_USUARIO = nome

            const campos = ['nome', 'email', 'senha'];
            campos.forEach(campo => {
            const input = document.getElementById(`${campo}Input`);
            const valor = input.value;
        
        if(campo == 'senha'){
            input.outerHTML = `<p class="caixa-de-texto" id="${campo}View">**********</p>`;
        }else{
            input.outerHTML = `<p class="caixa-de-texto" id="${campo}View">${valor}</p>`;
        }
      });

        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);

        });



      

    }


      document.getElementById('nomeTexto').textContent = document.getElementById('nomeView').textContent;
      document.getElementById('emailTexto').textContent = document.getElementById('emailView').textContent;

      function pegarDadosUsuario(){
        var email = sessionStorage.EMAIL_USUARIO;
        var nomeUsuario = sessionStorage.NOME_USUARIO;
        var fkEmpresa = sessionStorage.FK_EMPRESA;
        var idUsuario = sessionStorage.ID_USUARIO;
        var senha = sessionStorage.SENHA_USUARIO;

        nomeTexto.innerHTML = sessionStorage.NOME_USUARIO;
        emailTexto.innerHTML = sessionStorage.EMAIL_USUARIO;

        nomeView.innerHTML = sessionStorage.NOME_USUARIO;
        emailView.innerHTML = sessionStorage.EMAIL_USUARIO;

      }
       window.addEventListener("load", (event) => {
        pegarDadosUsuario()
        });