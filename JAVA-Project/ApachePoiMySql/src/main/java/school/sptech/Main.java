package school.sptech;


import java.util.List;

public class Main {
    public static void main(String[] args) {
        ExcelModeloAtual excel25 = new ExcelModeloAtual("acidentes_2025.xlsx",2025);
        ExcelModeloAntigo excel24 = new ExcelModeloAntigo("acidentes_2024.xlsx",2024);
        ExcelModeloAntigo excel23 = new ExcelModeloAntigo("acidentes_2023.xlsx",2023);
        excel25.extrairS3();
        excel25.tratarExcel();
        excel24.tratarExcel();
        excel23.tratarExcel();

    }
    }
