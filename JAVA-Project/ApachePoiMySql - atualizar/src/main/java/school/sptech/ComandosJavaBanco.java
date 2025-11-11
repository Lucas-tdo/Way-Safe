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
            jdbcTemplate.update(insertAcidente );
            jdbcTemplate.update(insertVitimas);
        }

        public void updateLog(String status , String mensagem, String arquivo){
            jdbcTemplate.update("insert into LOG(status,mensagem, arquivo) values (?,?,?)",status,mensagem,arquivo);
        }


    }
