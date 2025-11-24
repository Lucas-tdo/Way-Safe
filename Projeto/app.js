var ambiente_processo = 'desenvolvimento';
// var ambiente_processo = 'producao';
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
var tela_previaRouter = require  ("./src/routes/tela_previa_rota")
var tela_rodoviasRouter = require  ("./src/routes/tela_rodovias_rota")
var tela_acidentesRouter = require  ("./src/routes/tela_acidentes_rota")
var tela_rodovia_espRouter = require  ("./src/routes/tela_rodovia_esp_rota")
var concessionariaRouter = require ("./src/routes/concessionaria_rota");
var adm_waysafeRouter = require ("./src/routes/adm_waysafe_rota");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

app.use("/", indexRouter);
app.use("/tela_previa_rota", tela_previaRouter);
app.use("/usuario",usuarioRouter)
app.use("/tela_rodovias_rota",tela_rodoviasRouter);
app.use("/tela_acidentes_rota",tela_acidentesRouter);
app.use("/tela_rodovia_esp_rota",tela_rodovia_espRouter);
app.use("/conc", concessionariaRouter)
app.use("/adm_waysafe", adm_waysafeRouter);


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
