//Função para pegar os usuários WaySafe
//Okay, mas como saber quem são os ADM?
// Como fazer também a respeito da senha?
async function pegarAdm(){
  const resp = await fetch(`/adm_waysafe/pegarFuncAdm`)
  const resp_json = await resp.json();
  console.log(resp_json)
  tbAdm.innerHTML=""
  for (const registro of resp_json) {
    tbAdm.innerHTML += `
      <tr>
                                  <td>${registro.fkEMPRESA}</td>
                                  <td>${registro.NOME}</td>
                                  <td>${registro.EMAIL}</td>
                                  <td>${registro.senha}</td>
                                  <td>
                                      <a href="#"><img class="icon_tabela" src="../icons/editar.png"></a>
                                      <a href="#"><img class="icon_tabela" src="../icons/lixo.png"></a>
                                  </td>
                              </tr>
      `;
  }
}

window.addEventListener("load", (event) => {
  pegarAdm()
});
