package school.sptech;
import org.springframework.jdbc.core.JdbcTemplate;

import java.time.Period;
import java.util.List;

public class ComandosJavaBanco {
    private final JdbcTemplate jdbcTemplate;

    public ComandosJavaBanco(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public void saveLote(List<RegistroAcidente> registros){
        String acidentes = "";
        String vitimas="";
        Integer qtdRegistros=0;
        Integer ultimaAdicionada=0;

        for (int i = 0; i < registros.size(); i++) {
            if(!(acidentes.isEmpty()) && !(vitimas.isEmpty())){
                acidentes+=",";
                vitimas+=",";
            }

            acidentes+=registros.get(i).RetornarAcidente();
            vitimas+=registros.get(i).RetornarVitimas();
            qtdRegistros++;

            if(i==registros.size()-1 ||qtdRegistros==1000){
                System.out.println("Registro de "+ (ultimaAdicionada)+" a "+ (i+1) + " adicionados");
                save(acidentes,vitimas);
                qtdRegistros=0;
                ultimaAdicionada=i;
                acidentes="";
                vitimas="";
            }



        }
    }

    public void save(String insertAcidente,String insertVitimas) {
        jdbcTemplate.update( "INSERT INTO ACIDENTE (idACIDENTE,fk_rodovias, fk_classe_acid, fk_empresa, data_hora, tipo_acidente, metereologia, visibilidade, denominacao, municipio, regional_der, jurisdicao, latitude, longitude) VALUES ".concat(insertAcidente) );
        jdbcTemplate.update("INSERT INTO VITIMAS (fk_acidente, vitima_ilesa, vitima_fatal, vitima_fer_leve, vitima_fer_media, vitima_fer_grave) VALUES ".concat(insertVitimas));
    }


}
