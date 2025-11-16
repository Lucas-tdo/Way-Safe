    package school.sptech;
    import org.springframework.jdbc.core.JdbcTemplate;

    import java.time.LocalDateTime;
    import java.time.ZoneId;
    import java.time.format.DateTimeFormatter;
    import java.util.List;

    public class ComandosJavaBanco {
        private final JdbcTemplate jdbcTemplate;
        private Integer inicioLote=0;
        private Integer ultimaAdicionada=1;

        public ComandosJavaBanco(JdbcTemplate jdbcTemplate) {
            this.jdbcTemplate = jdbcTemplate;
        }

        public void apagarBanco(){
            jdbcTemplate.update("SET foreign_key_checks = 0");
            jdbcTemplate.update("TRUNCATE TABLE ACIDENTE");
            jdbcTemplate.update("TRUNCATE TABLE VITIMAS");
            ZoneId zoneId = ZoneId.of("America/Sao_Paulo");
            LocalDateTime dataHora = LocalDateTime.now(zoneId);
            DateTimeFormatter dataFormato = DateTimeFormatter.ofPattern(" dd/MM/yyyy '('EEEE')' hh:mm:ss a");
            String dataFormatada = dataHora.format(dataFormato);
            String mensagem = "O Banco foi apagado para inserção dos dados!";
            System.out.println(dataFormatada+" "+mensagem);
        }

        public void saveLote(List<RegistroAcidente> registros , String arquivoTratar){
            String acidentes = "";
            String vitimas="";


            for (int i = 0; i < registros.size(); i++) {
                if(!(acidentes.isEmpty()) && !(vitimas.isEmpty())){
                    acidentes+=",";
                    vitimas+=",";
                }

                acidentes+=registros.get(i).retornarAcidente();
                vitimas+=registros.get(i).retornarVitimas();
            }

                ZoneId zoneId = ZoneId.of("America/Sao_Paulo");
                LocalDateTime dataHora = LocalDateTime.now(zoneId);
                DateTimeFormatter dataFormato = DateTimeFormatter.ofPattern(" dd/MM/yyyy '('EEEE')' hh:mm:ss a");
                String dataFormatada = dataHora.format(dataFormato);
                String mensagem = "Registro de "+ (inicioLote)+" a "+ (inicioLote+registros.size()-1) + " adicionados ao banco de dados, do arquivo "+arquivoTratar;
                System.out.println(dataFormatada+" "+mensagem);
                save(acidentes,vitimas);
                saveLog("Sucesso",mensagem,arquivoTratar);
                inicioLote=inicioLote+registros.size();

        }

        public void save(String insertAcidente,String insertVitimas) {
            jdbcTemplate.update( "INSERT INTO ACIDENTE (idACIDENTE,fk_rodovias, fk_classe_acid, fk_empresa, data_hora, tipo_acidente, metereologia, visibilidade, denominacao, municipio, regional_der, jurisdicao, latitude, longitude) VALUES ".concat(insertAcidente) );
            jdbcTemplate.update("INSERT INTO VITIMAS (fk_acidente, vitima_ilesa, vitima_fatal, vitima_fer_leve, vitima_fer_media, vitima_fer_grave , vitimas_fer_seminfo) VALUES ".concat(insertVitimas));
        }

        public void saveLog(String status , String mensagem,String arquivo){
            jdbcTemplate.update("insert into LOG(status,mensagem, arquivo) values (?,?,?)",status,mensagem,arquivo);
        }


    }
