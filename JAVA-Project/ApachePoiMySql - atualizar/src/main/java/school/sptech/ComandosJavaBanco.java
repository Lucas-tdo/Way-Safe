    package school.sptech;
    import org.springframework.jdbc.core.JdbcTemplate;

    import java.time.LocalDateTime;
    import java.time.format.DateTimeFormatter;
    import java.util.List;

    public class ComandosJavaBanco {
        private final JdbcTemplate jdbcTemplate;
        private Integer inicioLote=0;
        private Integer ultimaAdicionada=1;

        public ComandosJavaBanco(JdbcTemplate jdbcTemplate) {
            this.jdbcTemplate = jdbcTemplate;
        }

        public void atualizarLote(List<RegistroAcidente> registros, String arquivoTratar){
            for (RegistroAcidente r : registros) {
                update(r.atualizarAcidente(),r.atualizarVitimas());
                LocalDateTime dataHora = LocalDateTime.now();
                DateTimeFormatter dataFormato = DateTimeFormatter.ofPattern(" dd/MM/yyyy '('EEEE')' hh:mm:ss a");
                String dataFormatada = dataHora.format(dataFormato);
                String mensagem = "Registro do ID"+r.getID()+" foi atualizado, usando o arquivo: "+arquivoTratar;
                System.out.println(dataFormatada+" "+mensagem);
            }
            LocalDateTime dataHora = LocalDateTime.now();
            DateTimeFormatter dataFormato = DateTimeFormatter.ofPattern(" dd/MM/yyyy '('EEEE')' hh:mm:ss a");
            String dataFormatada = dataHora.format(dataFormato);
            String mensagem = "Registro do ID"+ (registros.getFirst().getID())+" ao ID"+ (registros.getLast().getID()) + " foram atualizados no banco de dados, utilizando o arquivo "+arquivoTratar;
            System.out.println(dataFormatada+" "+mensagem);
            updateLog("Sucesso",mensagem,arquivoTratar);
            inicioLote=inicioLote+registros.size();
        }

        public void update(String insertAcidente,String insertVitimas) {
            jdbcTemplate.update("(fk_rodovias, fk_classe_acid, fk_empresa, data_hora, tipo_acidente, metereologia, visibilidade, denominacao, municipio, regional_der, jurisdicao, latitude, longitude) VALUES ".concat(insertAcidente) );
            jdbcTemplate.update("(vitima_ilesa, vitima_fatal, vitima_fer_leve, vitima_fer_media, vitima_fer_grave , vitimas_fer_seminfo) VALUES ".concat(insertVitimas));
        }

        public void updateLog(String status , String mensagem, String arquivo){
            jdbcTemplate.update("insert into LOG(status,mensagem, arquivo) values (?,?,?)",status,mensagem,arquivo);
        }


    }
