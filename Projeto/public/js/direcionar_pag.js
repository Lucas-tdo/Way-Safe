function direcionar(){
    if(sessionStorage.NIVEL_ACESSO==3){
        window.location.href="/Perfil funcionario/perfil.html"
    }
    else{
        window.location.href="/ADM concessionaria/add_func.html"
    }
}