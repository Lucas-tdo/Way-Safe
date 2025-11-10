package school.sptech;

public class RegistroAcidente {

    private Integer ID;
    private Integer nomeConcessionaria;
    private Integer rodovia;
    private String data;
    private Integer classeAcidente;
    private String tipoAcidente;
    private String meteoro;
    private String VISIB;
    private String ILESA_INT;
    private String VIT_FATAL_INT;
    private String VIT_GRAVE_INT;
    private String VIT_LEVE_INT;
    private String VIT_MODERADA_INT;
    private String VIT_SEMINFO_INT;
    private String DENOMINACAO;
    private String MUNICIPIO;
    private String REGIONAL_DER;
    private String JURISDICAO;
    private String LAT_FINAL;
    private String LON_FINAL;


    public RegistroAcidente(Integer ID, String nomeConcessionaria, String rodovia, String data, String classeAcidente, String tipoAcidente, String meteoro, String VISIB, String ILESA_INT, String VIT_FATAL_INT, String VIT_GRAVE_INT, String VIT_LEVE_INT, String VIT_MODERADA_INT, String VIT_SEMINFO_INT, String DENOMINACAO, String MUNICIPIO, String REGIONAL_DER, String JURISDICAO, String LAT_FINAL, String LON_FINAL) {
        RetonarFKs retorno = new RetonarFKs();
        this.ID = ID;
        this.nomeConcessionaria = retorno.fk_Concessionaria(nomeConcessionaria) ;
        this.rodovia =  retorno.fk_rodovia(rodovia);
        this.data = data;
        this.classeAcidente = retorno.fk_classeAcidente(classeAcidente);
        this.tipoAcidente = tipoAcidente;
        this.meteoro = meteoro;
        this.VISIB = VISIB;
        this.ILESA_INT = ILESA_INT;
        this.VIT_FATAL_INT = VIT_FATAL_INT;
        this.VIT_GRAVE_INT = VIT_GRAVE_INT;
        this.VIT_LEVE_INT = VIT_LEVE_INT;
        this.VIT_MODERADA_INT = VIT_MODERADA_INT;
        this.VIT_SEMINFO_INT = VIT_SEMINFO_INT;
        this.DENOMINACAO = DENOMINACAO;
        this.MUNICIPIO = MUNICIPIO.replace("'","''");
        this.REGIONAL_DER = REGIONAL_DER;
        this.JURISDICAO = JURISDICAO;
        this.LAT_FINAL = LAT_FINAL;
        this.LON_FINAL = LON_FINAL;
    }

    public String atualizarVitimas(){
        return String.format(
                "UPDATE VITIMAS SET (" +
                        "vitima_ilesa = %s," +
                        "vitima_fatal =  %s," +
                        "vitima_fer_leve = %s," +
                        "vitima_fer_media = %s ," +
                        "vitima_fer_grave = %s," +
                        "vitimas_fer_seminfo =  %s) WHERE fk_acidente = %d",

                ILESA_INT,
                VIT_FATAL_INT,
                VIT_LEVE_INT,
                VIT_MODERADA_INT,
                VIT_GRAVE_INT ,
                VIT_SEMINFO_INT,
                ID

        );
    }




    public String atualizarAcidente(){
        return String.format(
                "UPDATE ACIDENTE SET ( " +
                        "fk_rodovias = %d" +
                        "fk_classe_acid = %d" +
                        "fk_empresa = %d" +
                        "data_hora = '%s'" +
                        "tipo_acidente = '%s'" +
                        "metereologia = '%s'" +
                        "visibilidade = '%s'" +
                        "denominacao = '%s'" +
                        "municipio = '%s'" +
                        "regional_der = '%s'" +
                        "jurisdicao = '%s'" +
                        "latitude ='%s'" +
                        "longitude = '%s'" +
                        ") WHERE id = %d",
                rodovia,
                classeAcidente,
                nomeConcessionaria,
                data,
                tipoAcidente,
                meteoro,
                VISIB,
                DENOMINACAO,
                MUNICIPIO,
                REGIONAL_DER,
                JURISDICAO,
                LAT_FINAL,
                LON_FINAL,
                ID

        );
    }

    public Integer getNomeConcessionaria() {
        return nomeConcessionaria;
    }

    public Integer getRodovia() {
        return rodovia;
    }

    public Integer getClasseAcidente() {
        return classeAcidente;
    }

    public Integer getID() {
        return ID;
    }

    @Override
    public String toString() {
        return "RegistroAcidente{" +
                "ID=" + ID +
                ", nomeConcessionaria=" + nomeConcessionaria +
                ", rodovia=" + rodovia +
                ", data='" + data + '\'' +
                ", classeAcidente=" + classeAcidente +
                ", tipoAcidente='" + tipoAcidente + '\'' +
                ", meteoro='" + meteoro + '\'' +
                ", VISIB='" + VISIB + '\'' +
                ", ILESA_INT='" + ILESA_INT + '\'' +
                ", VIT_FATAL_INT='" + VIT_FATAL_INT + '\'' +
                ", VIT_GRAVE_INT='" + VIT_GRAVE_INT + '\'' +
                ", VIT_LEVE_INT='" + VIT_LEVE_INT + '\'' +
                ", VIT_MODERADA_INT='" + VIT_MODERADA_INT + '\'' +
                ", VIT_SEMINFO_INT='" + VIT_SEMINFO_INT + '\'' +
                ", DENOMINACAO='" + DENOMINACAO + '\'' +
                ", MUNICIPIO='" + MUNICIPIO + '\'' +
                ", REGIONAL_DER='" + REGIONAL_DER + '\'' +
                ", JURISDICAO='" + JURISDICAO + '\'' +
                ", LAT_FINAL='" + LAT_FINAL + '\'' +
                ", LON_FINAL='" + LON_FINAL + '\'' +
                '}';
    }
}
