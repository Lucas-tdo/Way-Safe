
document.querySelector('.toggle-nav')
            .addEventListener('click', () => {
                document.querySelector('.nav').classList.toggle('minimizado');
            });


function Validar() {
    var nome = input_nome.value
    var descricao = input_descricao.value
    var mensagem = ''

    if (nome == "" || descricao == "" ) {
        mensagem = "Todos campos devem estar preenchidos"
    }
   


    if (mensagem == "") {
        abrirModal();
    }
    else {
        modalErro(mensagem);
    }
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
    const nome = input_nome.value;
    const descricao = input_descricao.value;

    fetch("../nivelAcessoRouter/cadastrar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            descricaoServer: descricao
        })
    })
    .then(res => {
        if (res.ok) {
            fecharModal();
            document.getElementById('modalSucesso').style.display = "flex";
        } else {
            modalErro("Erro ao cadastrar");
        }
    });
}

function carregarNiveis() {
    fetch("/tela_nivel_acesso_rota/pegarDescricao")
        .then(res => res.json())
        .then(pegarDescricao => {
            console.log(pegarDescricao)
            const tabela = document.getElementById("tbNivelAcesso");
            tabela.innerHTML = "";

            pegarDescricao.forEach(item => {
                tabela.innerHTML += `
                    <tr>
                        <td>${item.descricao}</td>
                        <td style="text-align:center;"><p class="nivelAcesso1">Adicionar</p></td>
                        <td>
                            <a href="#"><img src="../icons/lapisedit.png" class="icon-tabela"></a>
                            <a href="#"><img src="../icons/delete2.png" class="icon_tabela"></a>
                        </td>
                    </tr>
                `;
            });
        });
}



    function fecharModalSucesso() {
        document.getElementById('modalSucesso').style.display = "none";

    }

window.addEventListener("load", (event) => {
   carregarNiveis()
});

    