

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
            cadastrarConc()
            fecharModal();
            document.getElementById('modalSucesso').style.display = "flex";
        }

        function fecharModalSucesso() {
            document.getElementById('modalSucesso').style.display = "none";
 
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
            mensagem += "CNPJ inválido (use o formato XX.XXX.XXX/0001-XX)";
        }
        else if (!cep.checkValidity()) {
            mensagem += "CEP inválido (use o formato 00000-000)";
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
            mensagem += "Telefone inválido (mínimo 13, máximo 15 caracteres)";
        }
    }

    console.log(mensagem)
    
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

function cadastrarConc() {
            const cnpj = toNull(document.getElementById("input_cnpj").value);
            const cep = toNull(document.getElementById("input_cep").value);
            const complemento = toNull(document.getElementById("input_complemento").value);
            const nome = toNull(document.getElementById("input_nome").value);
            const email = toNull(document.getElementById("input_email").value);
            const telefone = toNull(document.getElementById("input_telefone").value);

            fetch(`/adm_waysafe/cadastrarConc`, {
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
                    telefoneServer: telefone
                }),
            })
                .then(function (resposta) {
                    console.log("resposta: ", resposta);
                console.log("Cadastro realizado")
                input_cnpj.value="";
                input_cep.value="";
                input_complemento.value="";
                input_nome.value="";
                input_email.value="";
                input_telefone.value="";
                fecharModal()
                })
                .catch(function (resposta) {
                    console.log(`#ERRO: ${resposta}`);

        });
            fecharModal();
            document.getElementById('modalSucesso').style.display = "flex";
    }

    function toNull(value) {
        return value == "" ? "vazio" : value;
    }