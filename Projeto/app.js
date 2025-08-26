// var ambiente_processo = 'desenvolvimento';
var ambiente_processo = 'producao';
var caminho_env = ambiente_processo === 'producao' ? '.env' : '.env.dev';


require("dotenv").config({ path: caminho_env });

var express = require("express");
var cors = require("cors");
var path = require("path");
var PORTA_APP = process.env.APP_PORT;
var HOST_APP = process.env.APP_HOST;

var app = express();

var indexRouter = require("./src/routes/index");
var usuarioRouter = require  ("./src/routes/usuario")
var quizRouter = require ("./src/routes/quiz")
var camisaRouter = require("./src/routes/camisa")
var favoritaRouter = require("./src/routes/favorita")
var decadaRouter= require("./src/routes/decada")
var idoloRouter = require("./src/routes/idolos")
var titulosRouter = require ("./src/routes/titulos")
var solicitacaoRouter = require("./src/routes/solicitacao")
var gerenciaRouter = require("./src/routes/gerencia")
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

app.use("/", indexRouter);
app.use("/usuario",usuarioRouter)
app.use("/quiz",quizRouter)
app.use("/camisa",camisaRouter)
app.use("/favorita",favoritaRouter)
app.use("/decada",decadaRouter)
app.use("/idolos",idoloRouter)
app.use("/titulos",titulosRouter)
app.use("/solicitacao",solicitacaoRouter)
app.use("/gerencia",gerenciaRouter)
app.listen(PORTA_APP, function () {
    console.log(`
    ##   ##  ######   #####             ####       ##     ######     ##              ##  ##    ####    ######  
    ##   ##  ##       ##  ##            ## ##     ####      ##      ####             ##  ##     ##         ##  
    ##   ##  ##       ##  ##            ##  ##   ##  ##     ##     ##  ##            ##  ##     ##        ##   
    ## # ##  ####     #####    ######   ##  ##   ######     ##     ######   ######   ##  ##     ##       ##    
    #######  ##       ##  ##            ##  ##   ##  ##     ##     ##  ##            ##  ##     ##      ##     
    ### ###  ##       ##  ##            ## ##    ##  ##     ##     ##  ##             ####      ##     ##      
    ##   ##  ######   #####             ####     ##  ##     ##     ##  ##              ##      ####    ######  
    \n\n\n                                                                                                 
    Servidor do seu site já está rodando! Acesse o caminho a seguir para visualizar .: http://${HOST_APP}:${PORTA_APP} :. \n\n
    Você está rodando sua aplicação em ambiente de .:${process.env.AMBIENTE_PROCESSO}:. \n\n
    \tSe .:desenvolvimento:. você está se conectando ao banco local. \n
    \tSe .:producao:. você está se conectando ao banco remoto. \n\n
    \t\tPara alterar o ambiente, comente ou descomente as linhas 1 ou 2 no arquivo 'app.js'\n\n`);
});
