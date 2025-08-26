var database = require("../database/config")

function autenticar(email,senha){
    var instrucaoSql = `
        SELECT idusuario as id, nome , email, senha , imagem , nivel FROM usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
    return database.executar(instrucaoSql);
}

function cadastrar(nome,email,senha){
    var instrucaoSql = `
        INSERT INTO usuario (nome, email, senha, imagem) VALUES ('${nome}', '${email}', '${senha}','image/icon/perfil.png');
    `;
    return database.executar(instrucaoSql);
}

function checaremail(email){
    var instrucaoSql = `
        select * from usuario where email='${email}';
    `;
    return database.executar(instrucaoSql);
}

function cadastrar_foto(nome,email,senha,imagem){
    var instrucaoSql = `
        INSERT INTO usuario (nome, email, senha, imagem) VALUES ('${nome}', '${email}', '${senha}','image/fotousuarios/${imagem}');
    `;
    return database.executar(instrucaoSql);
}
module.exports = {
    autenticar,
    cadastrar,
    checaremail,
    cadastrar_foto

};