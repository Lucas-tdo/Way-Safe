var camisaModel = require("../models/camisaModel")

function adicionarimagens(req,res){
        camisaModel.adicionarimagens()
    .then(resultado=>{
        console.log("Adicionando imagens do site")
        res.json(resultado)
    })
    .catch(erro=>{
        console.log(erro)
        console.log(`\n Houve um erro ao pegar os dados das camisas`,erro.sqlMessage)
        res.status(500).json(erro.sqlMessage)
    })
}

function favoritar(req,res){
    var camisa = req.body.idcamisa
    var usuario = req.body.iduser
    if(camisa==undefined){
        res.status(400).send("O id da camisa é undefined")
    }
    else if(usuario==undefined){
        res.status(400).send("Usuário não logado")
    }
    else{
        camisaModel.favoritar(usuario,camisa)
        .then(resposta=>{
            console.log(`Camisa com id ${camisa} favoritada por ${usuario}`)
            res.json(resposta)
        })
        .catch(erro=>{
            console.log(erro)
            res.status(500).json(erro.sqlMessage)
        })
    }
}

function desfavoritar (req,res){
    var camisa = req.body.idcamisa
    var usuario = req.body.iduser
    if(camisa==undefined){
        res.status(400).send("O id da camisa é undefined")
    }
    else if(usuario==undefined){
        res.status(400).send("Usuário não logado")
    }
    else{
        camisaModel.desfavoritar(usuario,camisa)
        .then(resposta=>{
            console.log(`Camisa com id ${camisa} desfavoritada por ${usuario}`)
            res.json(resposta)
        })
        .catch(erro=>{
            console.log(erro)
            res.status(500).json(erro.sqlMessage)
        })
    }
}


function checarfavoritos(req,res){
    var id = req.params.idUsuario
    if(id==undefined){
        res.status(400).send("Seu id está undefined")
    }
    else{
        camisaModel.checarfavoritos(id)
        .then(resposta=>{
            console.log("Listando camisas favoritadas pelo Usuário")
            res.json(resposta)
        })
        .catch(erro=>{
            console.log(erro)
            res.status(500).json(erro.sqlMessage)
        })
    }
}

function top_favoritas(req,res){
    camisaModel.top_favoritas()
    .then(resposta=>{
        console.log("Listando top 10 camisas mais favoritadas do site")
        res.json(resposta)
    })
    .catch(erro=>{
        console.log(erro)
        res.status(500).json(erro.sqlMessage)
    })
}

// pagina específica


function pegar_dados(req,res){
    var id = req.params.idCamisa
    if(id==undefined){
        res.status(400).send("Seu id está undefined")
    }
    else{
        camisaModel.pegar_dados(id)
        .then(resposta=>{
            console.log("Dados da camisa localizados")
            res.json(resposta)
        })
        .catch(erro=>{
            console.log(erro)
            res.status(500).send(erro.sqlMessage)
        })
    }
}

function enviarcomentario(req,res){
    var idusuario= req.body.idUsuarioServer
    var comentario = req.body.comentarioServer
    var idcamisa = req.body.idcamisaServer
    if (idusuario == undefined) {
        res.status(400).send("Seu usuário está está undefined!");
    } else if (comentario == undefined) {
        res.status(400).send("Seu comentário está undefined!");
    } else if (idcamisa == undefined) {
        res.status(400).send("A camisa está undefined!");
    }
    else{
        camisaModel.enviarcomentario(idusuario,comentario,idcamisa)
        .then(resposta=>{
            console.log("Comentário na pagína titulos adicionada")
            res.json(resposta)
        })
        .catch(erro=>{
            console.log(erro)
            res.status(500).send(erro.sqlMessage)
        })
    }
}


function pegarcomentarios(req,res){
    var id = req.params.idCamisa
    if(id==undefined){
        res.status(400).send("Seu id está undefined")
    }
    else{
        camisaModel.pegarcomentarios(id)
        .then(resposta=>{
            console.log("Pegando comentários")
            res.json(resposta)
        })
        .catch(erro=>{
            console.log(erro)
            res.status(500).send(erro.sqlMessage)
        })
    }
}

function cadastrar_camisa(req,res){
    var idusuario = req.body.idusuario 
    var tipo  = req.body.tipo 
    var preco = req.body.preco 
    var marca  = req.body.marca 
    var ano = req.body.ano 
    var imagem  = req.file.filename 

    if(idusuario == undefined){
        res.status(400).send("Seu id de usuário está undefined!")
    }
    else if(tipo == undefined){
        res.status(400).send("O tipo da sua camisa está undefined!")
    }
    else if(preco == undefined){
        res.status(400).send("O preco da sua camisa está undefined!")
    }
    else if(marca == undefined){
        res.status(400).send("A marca da sua camisa está undefined!")
    }
    else if(ano == undefined){
        res.status(400).send("O ano da sua camisa está undefined!")
    }
    else{
        camisaModel.cadastrar_camisa(idusuario,tipo,preco,marca,ano,imagem)
        .then(resposta=>{
            console.log("Camisa solicitada")
            res.json(resposta)
        })
        .catch(erro=>{
            console.log(erro)
            res.status(500).send(erro.sqlMessage)
        })
    }
}

module.exports = {
    adicionarimagens,
    favoritar,
    desfavoritar,
    checarfavoritos,
    top_favoritas,
    pegar_dados,
    pegarcomentarios,
    enviarcomentario,
    cadastrar_camisa
}