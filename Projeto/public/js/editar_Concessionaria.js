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

        function confirmarEditar() {
            const cnpj = document.getElementById("input_cnpj").value ;
            const cep = document.getElementById("input_cep").value ;
            const complemento = document.getElementById("input_complemento").value ;
            const nome = document.getElementById("input_nome").value ;
            const email = document.getElementById("input_email").value ;
            const telefone = document.getElementById("input_telefone").value ;
            fetch(`/adm_waysafe/editarConc`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    cnpjServer: cnpj,
                    cepServer: cep,
                    complementoServer: complemento,
                    nomeServer: nome,
                    emailServer: email,
                    telefoneServer: telefone,
                    idServer: sessionStorage.getItem("IDADM")
                }),
            })

            fecharModal();
            document.getElementById('modalSucesso').style.display = "flex";
        }

        function fecharModalSucesso() {
            document.getElementById('modalSucesso').style.display = "none";
 
        }

        async function pegarDadosConc(){
            const id = sessionStorage.IDADM;
            const resp = await fetch(`/conc/pegarEmpresa`)
            const resp_json = await resp.json();
            const dados_conc = resp_json.filter(conc => conc.idEMPRESA==id)
            console.log(dados_conc);
            input_cnpj.value = dados_conc[0].CNPJ == null ? "" : dados_conc[0].CNPJ
            input_cep.value = dados_conc[0].CEP == null ? "" : dados_conc[0].CEP
            input_complemento.value = dados_conc[0].complemento == null ? "" : dados_conc[0].complemento
            input_nome.value = dados_conc[0].NOME == null ? "" : dados_conc[0].NOME
            input_email.value = dados_conc[0].EMAIL == null ? "" : dados_conc[0].EMAIL
            input_telefone.value = dados_conc[0].TELEFONE == null ? "" : dados_conc[0].TELEFONE
        }

        function Validar(){
            const cnpj = document.getElementById("input_cnpj");
            const cep = document.getElementById("input_cep");
            const complemento = document.getElementById("input_complemento");
            const nome = document.getElementById("input_nome");
            const email = document.getElementById("input_email");
            const telefone = document.getElementById("input_telefone");

            let mensagem = "";
            if(!cnpj.checkValidity() || !cep.checkValidity() || !complemento.checkValidity() || !nome.checkValidity() || !email.checkValidity() ||!telefone.checkValidity()){

                if (!cnpj.checkValidity()) {
                    mensagem += "CNPJ inválido (use o formato XXXXXXXX0001XX)";
                }
                else if (!cep.checkValidity()) {
                    mensagem += "CEP inválido (use o formato 00000000)";
                }
            
                // === Complemento (apenas max: 45) ===
                else if (!complemento.checkValidity()) {
                    mensagem += "Complemento muito longo (máximo 45 caracteres)";
                }
            
                // === Nome ===
                else if (!nome.checkValidity()) {
                    mensagem += "Nome inválido (mínimo 1 e máximo 45 caracteres)";
                }
            
                // === Email ===
                else if (!email.checkValidity()) {
                    mensagem += "Email inválido (mínimo 5 caracteres e formato válido)";
                }
            
                // === Telefone ===
                else if (!telefone.checkValidity()) {
                    mensagem += "Telefone inválido (mínimo 11, máximo 11 caracteres)";
                }
            }
            
            if (mensagem =="") {
                abrirModal()
            } else {
                modalErro(mensagem);
            }
    }

    function modalErro(mensagem){
        document.getElementById("modalErro").style.display="flex";
        document.getElementById("mensagem-Erro").innerHTML=mensagem
        setTimeout(() => {
            document.getElementById("modalErro").style.display="none";
        }, 2000);
    }


        window.addEventListener("load",(event)=>{
            pegarDadosConc()
        })