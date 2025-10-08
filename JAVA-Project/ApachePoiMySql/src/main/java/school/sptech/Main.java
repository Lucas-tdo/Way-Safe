package school.sptech;


import java.util.List;

public class Main {
    public static void main(String[] args) {
        ConexaoBanco cnx = new ConexaoBanco();
        ComandosJavaBanco comandos = new ComandosJavaBanco(cnx.getJdbcTemplate());

        DadosTratamento tratar = new DadosTratamento();
        List<RegistroAcidente> teste = tratar.TratarExcelVersaoAntiga("acidentes_2024.xlsx",2024);
        comandos.save(teste.get(0).RetornarAcidente());
        comandos.save(teste.get(0).RetornarVitimas());
    }
    }
