document.querySelector('.toggle-nav')
            .addEventListener('click', () => {
                document.querySelector('.nav').classList.toggle('minimizado');
            });

async function pegarEmpresa(){
    const resp = await fetch(`/conc/pegarEmpresa`)
    const resp_json = await resp.json();
}