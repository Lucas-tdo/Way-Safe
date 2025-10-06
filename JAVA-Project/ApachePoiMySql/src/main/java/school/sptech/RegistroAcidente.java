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
    private String MUNICÍPIO;
    private String REGIONAL_DER;
    private String JURISDICAO;
    private String LAT_FINAL;
    private String LON_FINAL;
    RetonarFKs retorno = new RetonarFKs();

    //Construtor com data e Hora
    public RegistroAcidente(Integer ID, String nomeConcessionaria, String rodovia, String data, String hora, String classeAcidente, String tipoAcidente, String meteoro, String VISIB, String ILESA_INT, String VIT_FATAL_INT, String VIT_GRAVE_INT, String VIT_LEVE_INT, String VIT_MODERADA_INT, String VIT_SEMINFO_INT, String DENOMINACAO, String MUNICÍPIO, String REGIONAL_DER, String JURISDICAO, String LAT_FINAL, String LON_FINAL) {
        this.ID = ID;
        this.nomeConcessionaria = retorno.FK_Concessionaria(nomeConcessionaria) ;
        this.rodovia =  retorno.Fk_rodovia(rodovia);
        this.data = data + " "+hora;
        this.classeAcidente = retorno.Fk_classeAcidente(classeAcidente);
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
        this.MUNICÍPIO = MUNICÍPIO;
        this.REGIONAL_DER = REGIONAL_DER;
        this.JURISDICAO = JURISDICAO;
        this.LAT_FINAL = LAT_FINAL;
        this.LON_FINAL = LON_FINAL;
    }

    public RegistroAcidente(Integer ID, String nomeConcessionaria, String rodovia, String data, String classeAcidente, String tipoAcidente, String meteoro, String VISIB, String ILESA_INT, String VIT_FATAL_INT, String VIT_GRAVE_INT, String VIT_LEVE_INT, String VIT_MODERADA_INT, String VIT_SEMINFO_INT, String DENOMINACAO, String MUNICÍPIO, String REGIONAL_DER, String JURISDICAO, String LAT_FINAL, String LON_FINAL) {
        this.ID = ID;
        this.nomeConcessionaria = retorno.FK_Concessionaria(nomeConcessionaria) ;
        this.rodovia =  retorno.Fk_rodovia(rodovia);
        this.data = data;
        this.classeAcidente = retorno.Fk_classeAcidente(classeAcidente);
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
        this.MUNICÍPIO = MUNICÍPIO;
        this.REGIONAL_DER = REGIONAL_DER;
        this.JURISDICAO = JURISDICAO;
        this.LAT_FINAL = LAT_FINAL;
        this.LON_FINAL = LON_FINAL;
    }

    public Integer getID() {
        return ID;
    }

    public void setID(Integer ID) {
        this.ID = ID;
    }

    public Integer getNomeConcessionaria() {
        return nomeConcessionaria;
    }

    public void setNomeConcessionaria(Integer nomeConcessionaria) {
        this.nomeConcessionaria = nomeConcessionaria;
    }

    public Integer getRodovia() {
        return rodovia;
    }

    public void setRodovia(Integer rodovia) {
        this.rodovia = rodovia;
    }

    public String getData() {
        return data;
    }

    public void setData(String data) {
        this.data = data;
    }

    public Integer getClasseAcidente() {
        return classeAcidente;
    }

    public void setClasseAcidente(Integer classeAcidente) {
        this.classeAcidente = classeAcidente;
    }

    public String getTipoAcidente() {
        return tipoAcidente;
    }

    public void setTipoAcidente(String tipoAcidente) {
        this.tipoAcidente = tipoAcidente;
    }

    public String getMeteoro() {
        return meteoro;
    }

    public void setMeteoro(String meteoro) {
        this.meteoro = meteoro;
    }

    public String getVISIB() {
        return VISIB;
    }

    public void setVISIB(String VISIB) {
        this.VISIB = VISIB;
    }

    public String getILESA_INT() {
        return ILESA_INT;
    }

    public void setILESA_INT(String ILESA_INT) {
        this.ILESA_INT = ILESA_INT;
    }

    public String getVIT_FATAL_INT() {
        return VIT_FATAL_INT;
    }

    public void setVIT_FATAL_INT(String VIT_FATAL_INT) {
        this.VIT_FATAL_INT = VIT_FATAL_INT;
    }

    public String getVIT_GRAVE_INT() {
        return VIT_GRAVE_INT;
    }

    public void setVIT_GRAVE_INT(String VIT_GRAVE_INT) {
        this.VIT_GRAVE_INT = VIT_GRAVE_INT;
    }

    public String getVIT_LEVE_INT() {
        return VIT_LEVE_INT;
    }

    public void setVIT_LEVE_INT(String VIT_LEVE_INT) {
        this.VIT_LEVE_INT = VIT_LEVE_INT;
    }

    public String getVIT_MODERADA_INT() {
        return VIT_MODERADA_INT;
    }

    public void setVIT_MODERADA_INT(String VIT_MODERADA_INT) {
        this.VIT_MODERADA_INT = VIT_MODERADA_INT;
    }

    public String getVIT_SEMINFO_INT() {
        return VIT_SEMINFO_INT;
    }

    public void setVIT_SEMINFO_INT(String VIT_SEMINFO_INT) {
        this.VIT_SEMINFO_INT = VIT_SEMINFO_INT;
    }

    public String getDENOMINACAO() {
        return DENOMINACAO;
    }

    public void setDENOMINACAO(String DENOMINACAO) {
        this.DENOMINACAO = DENOMINACAO;
    }

    public String getMUNICÍPIO() {
        return MUNICÍPIO;
    }

    public void setMUNICÍPIO(String MUNICÍPIO) {
        this.MUNICÍPIO = MUNICÍPIO;
    }

    public String getREGIONAL_DER() {
        return REGIONAL_DER;
    }

    public void setREGIONAL_DER(String REGIONAL_DER) {
        this.REGIONAL_DER = REGIONAL_DER;
    }

    public String getJURISDICAO() {
        return JURISDICAO;
    }

    public void setJURISDICAO(String JURISDICAO) {
        this.JURISDICAO = JURISDICAO;
    }

    public String getLAT_FINAL() {
        return LAT_FINAL;
    }

    public void setLAT_FINAL(String LAT_FINAL) {
        this.LAT_FINAL = LAT_FINAL;
    }

    public String getLON_FINAL() {
        return LON_FINAL;
    }

    public void setLON_FINAL(String LON_FINAL) {
        this.LON_FINAL = LON_FINAL;
    }

    public RetonarFKs getRetorno() {
        return retorno;
    }

    public void setRetorno(RetonarFKs retorno) {
        this.retorno = retorno;
    }

    public String RetornarVitimas(){
        return String.format(
                "INSERT INTO VITIMAS (\n" +
                        "    fk_acidente,\n" +
                        "    vitima_ilesa,\n" +
                        "    vitima_fatal,\n" +
                        "    vitima_fer_leve,\n" +
                        "    vitima_fer_media,\n" +
                        "    vitima_fer_grave\n" +
                        ") VALUES (\n" +
                        "    %d, %s, %s, %s, %s, %s\n" +
                        ");",
                        ID,
                        ILESA_INT,
                        VIT_FATAL_INT,
                        VIT_LEVE_INT,
                        VIT_MODERADA_INT,
                        VIT_GRAVE_INT

        );
    }

    public String RetornarAcidente(){
        return String.format(
                "INSERT INTO ACIDENTE (\n" +
                        "    idACIDENTE,\n" +
                        "    fk_rodovias,\n" +
                        "    fk_classe_acid,\n" +
                        "    fk_empresa,\n" +
                        "    data_hora,\n" +
                        "    tipo_acidente,\n" +
                        "    metereologia,\n" +
                        "    visibilidade,\n" +
                        "    denominacao,\n" +
                        "    municipio,\n" +
                        "    reginal_der,\n" +
                        "    jurisdicao,\n" +
                        "    latitude,\n" +
                        "    longitude\n" +
                        ") VALUES (\n" +
                        "    %d,%d, %d, %d, '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s'\n" +
                        ");\n\n" ,
                ID,
                rodovia,
                classeAcidente,
                nomeConcessionaria,
                data,
                tipoAcidente,
                meteoro,
                VISIB,
                DENOMINACAO,
                MUNICÍPIO,
                REGIONAL_DER,
                JURISDICAO,
                LAT_FINAL,
                LON_FINAL

        );
    }

}
