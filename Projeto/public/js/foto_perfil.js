logoEmpresa()
function logoEmpresa() {
    var fk_empresa = sessionStorage.FK_EMPRESA;

    let caminhoImagem;

    switch (Number(fk_empresa)) {
        case 1: caminhoImagem = "ccr-autoban-logo.png"; break; // AUTOBAN
        case 2: caminhoImagem = "logo_cart.png"; break; // CART
        case 3: caminhoImagem = "logo-colinas.png"; break; // COLINAS
        case 4: caminhoImagem = "Ecovias_Imigrantes_Logo.png"; break; // ECOVIAS IMIGRANTES
        case 5: caminhoImagem = "logo-eixosp.png"; break; // EIXOSP
        case 6: caminhoImagem = "logo-entrevias.png"; break; // ENTREVIAS
        case 7: caminhoImagem = "logo-intervias.png"; break; // INTERVIAS
        case 8: caminhoImagem = "Ecovias_LestePaulista_Logo.png"; break; // LESTE PAULISTA
        case 9: caminhoImagem = "LOGO_EcoVias_Noroeste_Paulista.png"; break; // NOROESTE PAULISTA
        case 10: caminhoImagem = "novo_litoral.png"; break; // NOVO LITORAL
        case 11: caminhoImagem = "Ecovias-Raposo-Castello_Logo.png"; break; // RAPOSO CASTELLO
        case 12: caminhoImagem = "Logo_renovias.png"; break; // RENOVIAS
        case 13: caminhoImagem = "ccr-rodoanel.png"; break; // RODOANEL
        case 14: caminhoImagem = "logo_rota.png"; break; // ROTA
        case 15: caminhoImagem = "logo_sorocabana.png"; break; // SOROCABANA
        case 16: caminhoImagem = "logos_SPMAR.png"; break; // SPMAR
        case 17: caminhoImagem = "spvias.png"; break; // SPVIAS
        case 18: caminhoImagem = "logo-tamoios.png"; break; // TAMOIOS
        case 19: caminhoImagem = "logo_tebe.png"; break; // TEBE
        case 20: caminhoImagem = "RODOVIAS-tiete-logo.png"; break; // TIETÊ
        case 21: caminhoImagem = "epr-triangulo-logo.png"; break; // TRIÂNGULO
        case 22: caminhoImagem = "CCR-VIAOESTE-logo.png"; break; // VIAOESTE
        case 23: caminhoImagem = "arteris-logo.png"; break; // VIAPAULISTA 
        case 24: caminhoImagem = "viaRondon_logo.png"; break; // VIARONDON
    }
    // Aplica no elemento
    document.getElementById("imagem-empresa").src = `Imagens/imagens_empresa/${caminhoImagem}`;
}