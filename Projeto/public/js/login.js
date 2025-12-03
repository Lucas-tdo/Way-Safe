function Validar() {
    var email = input_email.value
    var senha = input_senha.value
    var mensagem = ''

    if (email == "" || senha == "") {
        mensagem = "Todos campos devem estar preenchidos"
    }
    else {
        if (!(email.includes("@"))) {
            mensagem = `O email precisa conter @`
        }
        else{
            if(!(email.includes("."))) {
            mensagem = `O email precisa conter .`
            }
        } 
    }


    if (mensagem == "") {

        fetch(`/usuario/autenticar/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: input_email.value,
                senha: input_senha.value,
                "erro": "senhaIncorreta"
            })
        })
            .then(resposta => {
                carregamento('<img style="background-blend-mode: multiply;" src="https://imgs.search.brave.com/JSAO89d1G0SIReS6qEJuOn8LN-Y8bvyD89el8cH4w6U/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLmdp/ZmVyLmNvbS9vcmln/aW4vMzQvMzQzMzhk/MjYwMjNlNTUxNWY2/Y2M4OTY5YWEwMjdi/Y2FfdzIwMC5naWY.gif" alt="">')
                resposta.json().then(resposta => {
                    console.log(resposta)
                    if (resposta.length == 1) {
                        
                        console.log(resposta)
                        sessionStorage.ID_USUARIO = resposta[0].idUSUARIO
                        sessionStorage.EMAIL_USUARIO = resposta[0].email
                        sessionStorage.NOME_USUARIO = resposta[0].nome
                        sessionStorage.FK_EMPRESA = resposta[0].fk_empresa
                        sessionStorage.NIVEL_ACESSO = resposta[0].nivel_acesso_fk
                        setTimeout(() => {
                            window.location.href = '/previas.html'
                        }, 2000);
                    }
                    else {
                        mensagemErro("Usuário não localizado")
                    }
                }
                )
            })
            .catch(erro => {
                console.log(erro)
            })

    }
    else {
        mensagemErro(mensagem)
    }
}

function mensagemErro(mensagem){
    const msg = document.getElementById("msg");
    msg.classList.add("ativa");
    const atributoMensagem = document.getElementById("texto-caixa");
    atributoMensagem.innerHTML=`${mensagem}`;
    setTimeout(() => {
        msg.classList.remove("ativa")
    }, 1500);
}

function carregamento(mensagem){
    const msg = document.getElementById("msg");
    msg.classList.add("ativa");
    const atributoMensagem = document.getElementById("texto-caixa");
    atributoMensagem.innerHTML=`${mensagem}`;
}