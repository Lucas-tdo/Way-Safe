package school.sptech;


import java.util.List;

public class Main {
    public static void main(String[] args) {
        ConexaoBanco cnx = new ConexaoBanco();
        ComandosJavaBanco comandos = new ComandosJavaBanco(cnx.getJdbcTemplate());

        ExcelModeloAtual excel25 = new ExcelModeloAtual("./Jar/acidentes_2025.xlsx",2025);
        ExcelModeloAntigo excel24 = new ExcelModeloAntigo("./Jar/acidentes_2024.xlsx",2024);
        ExcelModeloAntigo excel23 = new ExcelModeloAntigo("./Jar/acidentes_2023.xlsx",2023);

        excel23.extrairS3();
        List<RegistroAcidente> lote25 = excel25.tratarExcel();
        List<RegistroAcidente> lote24 = excel24.tratarExcel();
        List<RegistroAcidente> lote23 = excel23.tratarExcel();
        comandos.saveLote(lote25,excel25.getArquivoTratar());
        comandos.saveLote(lote24,excel24.getArquivoTratar());
        comandos.saveLote(lote23,excel23.getArquivoTratar());
    }
    }
