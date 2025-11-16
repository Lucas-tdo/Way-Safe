package school.sptech;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.List;


public class Main {
    public static void main(String[] args) {
        ConexaoBanco cnx = new ConexaoBanco();
        ComandosJavaBanco comandos = new ComandosJavaBanco(cnx.getJdbcTemplate());
        comandos.apagarBanco();
        ExcelModeloAtual excel25 = new ExcelModeloAtual("acidentes_2025.xlsx",2025);
        ExcelModeloAntigo excel24 = new ExcelModeloAntigo("acidentes_2024.xlsx",2024);
        ExcelModeloAntigo excel23 = new ExcelModeloAntigo("acidentes_2023.xlsx",2023);
        excel25.extrairS3();
        excel25.tratarExcel();
        excel24.tratarExcel();
        excel23.tratarExcel();
        NotificarSlack.notificarSlack();

        ZoneId zoneId = ZoneId.of("America/Sao_Paulo");
        LocalDateTime dataHora = LocalDateTime.now(zoneId);
        DateTimeFormatter dataFormato = DateTimeFormatter.ofPattern(" dd/MM/yyyy '('EEEE')' hh:mm:ss a");
        String dataFormatada = dataHora.format(dataFormato);
        String mensagem = "Os dados foram alocados ao banco!";
        System.out.println(dataFormatada+" "+mensagem);
    }

    }
