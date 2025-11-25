 // Menu lateral
    document.querySelector('.toggle-nav')
      .addEventListener('click', () => {
        document.querySelector('.nav').classList.toggle('minimizado');
      });





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
      const campos = ['nome', 'email', 'telefone', 'cep', 'endereco', 'senha'];
      campos.forEach(campo => {
        const p = document.getElementById(`${campo}View`);
        const valor = p.textContent;
        p.outerHTML = `<input style="background-color:#DEDEDE;" class="caixa-de-texto" id="${campo}Input" type="${campo === 'senha' ? 'password' : 'text'}" value="${valor}">`;
      });
    }

    function salvarAlteracoes() {
      const campos = ['nome', 'email', 'telefone', 'cep', 'endereco', 'senha'];
      campos.forEach(campo => {
        const input = document.getElementById(`${campo}Input`);
        const valor = input.value;
        
        if(campo == 'senha'){
            input.outerHTML = `<p class="caixa-de-texto" id="${campo}View">**********</p>`;
        }else{
            input.outerHTML = `<p class="caixa-de-texto" id="${campo}View">${valor}</p>`;
        }
      });
    }

    
    function pegarDadosUsuario(){
      var email = sessionStorage.EMAIL_USUARIO;
      var nomeUsuario = sessionStorage.NOME_USUARIO;
      var fkEmpresa = sessionStorage.FK_EMPRESA;
      var idUsuario = sessionStorage.ID_USUARIO;
      var senha = sessionStorage.SENHA_USUARIO;
      
      nomeTexto.innerHTML = nomeUsuario;
      emailTexto.innerHTML = email;
      console.log("oi")
        document.getElementById('nomeView').innerText = nomeUsuario
        document.getElementById('emailView').innerText = email
        document.getElementById('nomeTexto').innerText = nomeUsuario
      }
    
      window.addEventListener("load", (event) => {
        pegarDadosUsuario()
        });


