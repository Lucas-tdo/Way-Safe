chamarDados()
function chamarDados(){
    
    var funcionarioId = sessionStorage.IDFUNCIONARIO
     fetch(`/adm_concessionaria_rota/dados_funcionarios/${funcionarioId}`)
        .then(res => res.json())
        .then(dados => {
            console.log(dados)
                 document.getElementById("nome_func").value = dados[0].nome
                 document.getElementById("email_func").value = dados[0].email
                //  document.getElementById("empresa_func").value = dados[0].fk_empresa
                  document.getElementById("nivel_func").value = dados[0].nivel_acesso_fk
        })
        .catch(error => {
            console.error("Erro ao carregar funcionarios:", error);
        });
}
function editarDados(){
    
    var funcionarioId = sessionStorage.IDFUNCIONARIO
            fetch(`/adm_concessionaria_rota/atualizar_dados/${funcionarioId}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                nome: nome_func.value,
                email: email_func.value,
                // fk_empresa: empresa_func.value,
                nivel_acesso_fk: nivel_func.value
            })
        })
        .then(res => res.json())
        .then(dados => {
            console.log(dados)
                 document.getElementById("nome_func").value = dados[0].nome
                 document.getElementById("email_func").value = dados[0].email
                //  document.getElementById("empresa_func").value = dados[0].fk_empresa
                 chamarDados()
        })
        .catch(error => {
            console.error("Erro ao carregar funcionarios:", error);
        });
}