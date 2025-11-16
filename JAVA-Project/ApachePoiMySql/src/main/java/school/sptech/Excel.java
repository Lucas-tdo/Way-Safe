package school.sptech;

import software.amazon.awssdk.core.exception.SdkClientException;
import software.amazon.awssdk.core.sync.ResponseTransformer;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.model.ListObjectsRequest;
import software.amazon.awssdk.services.s3.model.S3Exception;
import software.amazon.awssdk.services.s3.model.S3Object;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
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

    abstract void tratarExcel();

    public void extrairS3() {
        try {
            S3Client s3Cliente = new S3Provider().getS3Client();

            ListObjectsRequest listObjects = ListObjectsRequest.builder()
                    .bucket("s3-lab-sptech-lucas-tdo")
                    .build();
            List<S3Object> objects = s3Cliente.listObjects(listObjects).contents();

            for (S3Object object : objects) {
                GetObjectRequest getObjectRequest = GetObjectRequest.builder()
                        .bucket("s3-lab-sptech-lucas-tdo")
                        .key(object.key())
                        .build();

                InputStream objectContent = s3Cliente.getObject(getObjectRequest, ResponseTransformer.toInputStream());
                Files.copy(objectContent, new File(object.key()).toPath());
            }
        }
        catch (IOException e){
            LocalDateTime dataHora = LocalDateTime.now();
            DateTimeFormatter dataFormato = DateTimeFormatter.ofPattern(" dd/MM/yyyy '('EEEE')' hh:mm:ss a");
            String dataFormatada = dataHora.format(dataFormato);
            String mensagem = "Erro ao pegar arquivos S3 ou arquivos já existem na máquina";
            System.out.println(dataFormatada+" "+mensagem);
        }
        catch (S3Exception e){
            LocalDateTime dataHora = LocalDateTime.now();
            DateTimeFormatter dataFormato = DateTimeFormatter.ofPattern(" dd/MM/yyyy '('EEEE')' hh:mm:ss a");
            String dataFormatada = dataHora.format(dataFormato);
            String mensagem = "Erro ao pegar arquivos S3 as credenciais não estão setadas, ou arquivos já existem na máquina";
            System.out.println(dataFormatada+" "+mensagem);
        }
        catch (SdkClientException e){
            LocalDateTime dataHora = LocalDateTime.now();
            DateTimeFormatter dataFormato = DateTimeFormatter.ofPattern(" dd/MM/yyyy '('EEEE')' hh:mm:ss a");
            String dataFormatada = dataHora.format(dataFormato);
            String mensagem = "Erro ao pegar arquivos S3 as credenciais não estão setadas, ou arquivos já existem na máquina";
            System.out.println(dataFormatada+" "+mensagem);
        }

    }
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
