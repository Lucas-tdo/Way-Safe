package school.sptech;


import java.util.List;

public class Main {
    public static void main(String[] args) {
        ConexaoBanco cnx = new ConexaoBanco();
        ComandosJavaBanco comandos = new ComandosJavaBanco(cnx.getJdbcTemplate());

        //ExcelModeloAtual excel = new ExcelModeloAtual("acidentes_2025.xlsx");
        ExcelModeloAntigo excel = new ExcelModeloAntigo("acidentes_2024.xlsx");

        List<RegistroAcidente> teste = excel.tratarExcel(2024);
        comandos.saveLote(teste);
    }
    }
