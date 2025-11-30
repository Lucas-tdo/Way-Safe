document.querySelector('.toggle-nav')
            .addEventListener('click', () => {
                document.querySelector('.nav').classList.toggle('minimizado');
            });

        // Referências
        const btnEditar = document.getElementById("btn-editar");
        const modalConfirmar = document.getElementById("modal-confirmar");
        const modalSucesso = document.getElementById("modal-sucesso");

        const cancelarEdicao = document.getElementById("cancelar-edicao");
        const confirmarEdicao = document.getElementById("confirmar-edicao");
        const fecharSucesso = document.getElementById("fechar-sucesso");

        function modalErro(mensagem){
            document.getElementById("modalErro").style.display="flex";
            document.getElementById("mensagem-Erro").innerHTML=mensagem
            setTimeout(() => {
                document.getElementById("modalErro").style.display="none";
            }, 2000);
        }

        // Abrir modal de confirmação
        function abrirModal() {
            modalConfirmar.style.display = "flex";
        }

        // Cancelar
        cancelarEdicao.addEventListener("click", () => {
            modalConfirmar.style.display = "none";
        });

        // Confirmar edição → abre sucesso
        confirmarEdicao.addEventListener("click", () => {
            var nome = input_nome.value
            var email = input_email.value
            fetch(`/adm_waysafe/editarADM`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    nomeServer: nome,
                    emailServer: email,
                    idServer: sessionStorage.getItem("IDADM")
                }),
            })
            modalConfirmar.style.display = "none";
            modalSucesso.style.display = "flex";

            // aqui você faz a requisição ao banco
        });

        // Fechar sucesso
        fecharSucesso.addEventListener("click", () => {
            modalSucesso.style.display = "none";
        });

        async function pegarDadosUsuario(){
            const id = sessionStorage.IDADM;
            const resp = await fetch(`/adm_waysafe/pegarFuncAdm`)
            const resp_json = await resp.json();
            const dados_usuario = resp_json.filter(usuario => usuario.idUSUARIO==id)
            console.log(dados_usuario);
            input_nome.value=dados_usuario[0].nome
            input_email.value=dados_usuario[0].email
        }


        function Validar() {
            var nome = input_nome.value
            var email = input_email.value
            var mensagem = ''

            if (email == ""|| nome =="") {
                mensagem = "Todos campos devem estar preenchidos"
            }
            else {
                if (!(email.includes("@"))) {
                    mensagem = `O email precisa conter @`
                }
                else if (!(email.includes("."))) {
                    mensagem = `O email precisa conter .`
                }
            }

            if (mensagem == "") {
                    abrirModal()
                }
            else {
                modalErro(mensagem)
            }
        }

        window.addEventListener("load",(event)=>{
            pegarDadosUsuario()
        })