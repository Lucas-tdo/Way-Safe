package school.sptech;


import java.util.List;

public class Main {
    public static void main(String[] args) {
        ConexaoBanco cnx = new ConexaoBanco();
        ComandosJavaBanco comandos = new ComandosJavaBanco(cnx.getJdbcTemplate());

        DadosTratamento tratar = new DadosTratamento();
        List<RegistroAcidente> teste = tratar.TratarExcelNovaVersao("Acidentes_2025.xlsx",2025);
        comandos.save(teste.get(0).RetornarAcidente());
        comandos.save(teste.get(0).RetornarVitimas());
    }
    }
