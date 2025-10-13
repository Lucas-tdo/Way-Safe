package school.sptech;

import java.util.List;

public abstract class Excel {
    private String arquivoTratar;
    private Integer[] posicaoCelulasExcel;
    private Integer idPadrao;

    public Excel(String arquivoTratar, Integer[] posicaoCelulasExcel, Integer idPadrao) {
        this.arquivoTratar = arquivoTratar;
        this.posicaoCelulasExcel = posicaoCelulasExcel;
        this.idPadrao=idPadrao;
    }

    public String getArquivoTratar() {
        return arquivoTratar;
    }

    public void setArquivoTratar(String arquivoTratar) {
        this.arquivoTratar = arquivoTratar;
    }

    public Integer[] getPosicaoCelulasExcel() {
        return posicaoCelulasExcel;
    }

    public void setPosicaoCelulasExcel(Integer[] posicaoCelulasExcel) {
        this.posicaoCelulasExcel = posicaoCelulasExcel;
    }

    public Integer getIdPadrao() {
        return idPadrao;
    }

    public void setIdPadrao(Integer idPadrao) {
        this.idPadrao = idPadrao;
    }

    abstract List<RegistroAcidente> tratarExcel();
}

//excelNovoPosicaoCeulas
//1,POSIÇÃO CÉLULA nomeConcessionaria
//2,POSIÇÃO CÉLULA rodovia
//5,POSIÇÃO CÉLULA data
//6,POSIÇÃO CÉLULA hora
//7,POSIÇÃO CÉLULA classeAcidente
//8,POSIÇÃO CÉLULA tipoAcidente
//10,POSIÇÃO CÉLULA meteoro
//11,POSIÇÃO CÉLULA VISIB
//13,POSIÇÃO CÉLULA ILESA_INT
//14,POSIÇÃO CÉLULA VIT_FATAL_INT
//15,POSIÇÃO CÉLULA VIT_GRAVE_INT
//16,POSIÇÃO CÉLULA VIT_LEVE_INT
//17,POSIÇÃO CÉLULA VIT_MODERADA_INT
//18,POSIÇÃO CÉLULA VIT_SEMINFO_INT
//20,POSIÇÃO CÉLULA DENOMINACAO
//21,POSIÇÃO CÉLULA MUNICÍPIO
//22,POSIÇÃO CÉLULA REGIONAL_DER
//23,POSIÇÃO CÉLULA JURISDICAO
//25,POSIÇÃO CÉLULA  LAT_FINAL
//26 POSIÇÃO CÉLULA  LAT_FINAL

//excelVelhoPosicaoCeulas
//0,POSIÇÃO CÉLULA nomeConcessionaria
//1,POSIÇÃO CÉLULA rodovia
//4,POSIÇÃO CÉLULA data
//5,POSIÇÃO CÉLULA classeAcidente
//6,POSIÇÃO CÉLULA tipoAcidente
//7,POSIÇÃO CÉLULA meteoro
//8,POSIÇÃO CÉLULA VISIB
//12,POSIÇÃO CÉLULA ILESA_INT
//13,POSIÇÃO CÉLULA VIT_FATAL_INT
//14,POSIÇÃO CÉLULA VIT_GRAVE_INT
//15,POSIÇÃO CÉLULA VIT_LEVE_INT
//16,POSIÇÃO CÉLULA VIT_MODERADA_INT
//17,POSIÇÃO CÉLULA VIT_SEMINFO_INT
//19,POSIÇÃO CÉLULA DENOMINACAO
//20,POSIÇÃO CÉLULA MUNICÍPIO
//21,POSIÇÃO CÉLULA REGIONAL_DER
//22,POSIÇÃO CÉLULA JURISDICAO
//24,POSIÇÃO CÉLULA  LAT_FINAL
//25 POSIÇÃO CÉLULA  LAT_FINAL

