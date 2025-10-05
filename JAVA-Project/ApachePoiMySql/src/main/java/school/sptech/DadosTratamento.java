package school.sptech;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;


import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class DadosTratamento {
    List<RegistroAcidente> registros = new ArrayList<>();

    public DadosTratamento() {
    }

    public void TratarExcel25(){
        Integer Id= 1;
        Integer posicaoColunas[]= {
                1,//POSIÇÃO CÉLULA nomeConcessionaria
                2,//POSIÇÃO CÉLULA rodovia
                5,//POSIÇÃO CÉLULA data
                6,//POSIÇÃO CÉLULA hora
                7,//POSIÇÃO CÉLULA classeAcidente
                8,//POSIÇÃO CÉLULA tipoAcidente
                10,//POSIÇÃO CÉLULA meteoro
                11,//POSIÇÃO CÉLULA VISIB
                13,//POSIÇÃO CÉLULA ILESA_INT
                14,//POSIÇÃO CÉLULA VIT_FATAL_INT
                15,//POSIÇÃO CÉLULA VIT_GRAVE_INT
                16,//POSIÇÃO CÉLULA VIT_LEVE_INT
                17,//POSIÇÃO CÉLULA VIT_MODERADA_INT
                18,//POSIÇÃO CÉLULA VIT_SEMINFO_INT
                20,//POSIÇÃO CÉLULA DENOMINACAO
                21,//POSIÇÃO CÉLULA MUNICÍPIO
                22,//POSIÇÃO CÉLULA REGIONAL_DER
                23,//POSIÇÃO CÉLULA JURISDICAO
                25,//POSIÇÃO CÉLULA  LAT_FINAL
                26 ////POSIÇÃO CÉLULA  LAT_FINAL
        };
        try {
            Workbook workbook = new XSSFWorkbook("Acidentes_2025.xlsx");
            Sheet sheet = workbook.getSheetAt(0);
            DataFormatter formatter = new DataFormatter();

            for (Row row : sheet){
                if(row.getRowNum()==0){continue;}
                Integer posicao = 0;
                String RegistroArray[] = new String[20];
                for (Integer posicaoColuna : posicaoColunas) {
                    Cell cell = row.getCell(posicaoColuna);

                    RegistroArray[posicao]= cell!=null ? formatter.formatCellValue(cell) :"";
                    posicao++;
                }


                registros.add(new RegistroAcidente( Integer.parseInt(2025+String.valueOf(Id)),RegistroArray[0],RegistroArray[1],RegistroArray[2],RegistroArray[3],RegistroArray[4],RegistroArray[5],RegistroArray[6],RegistroArray[7],RegistroArray[8],RegistroArray[9],RegistroArray[10],RegistroArray[11],RegistroArray[12],RegistroArray[13],RegistroArray[14],RegistroArray[15],RegistroArray[16],RegistroArray[17],RegistroArray[18],RegistroArray[19]));
                Id++;
            }

            workbook.close();
        }
        catch (Exception e){
            e.printStackTrace();
            e.getMessage();
        }

        for (int i = 0; i < registros.size(); i++) {
            System.out.println(registros.get(i));
        }
        System.out.println(registros.size());
    }

    public void TratarExcel24(){
        Integer Id= 1;
        Integer posicaoColunas[]= {
                1,//POSIÇÃO CÉLULA nomeConcessionaria
                2,//POSIÇÃO CÉLULA rodovia
                5,//POSIÇÃO CÉLULA data
                6,//POSIÇÃO CÉLULA hora
                7,//POSIÇÃO CÉLULA classeAcidente
                8,//POSIÇÃO CÉLULA tipoAcidente
                10,//POSIÇÃO CÉLULA meteoro
                11,//POSIÇÃO CÉLULA VISIB
                13,//POSIÇÃO CÉLULA ILESA_INT
                14,//POSIÇÃO CÉLULA VIT_FATAL_INT
                15,//POSIÇÃO CÉLULA VIT_GRAVE_INT
                16,//POSIÇÃO CÉLULA VIT_LEVE_INT
                17,//POSIÇÃO CÉLULA VIT_MODERADA_INT
                18,//POSIÇÃO CÉLULA VIT_SEMINFO_INT
                20,//POSIÇÃO CÉLULA DENOMINACAO
                21,//POSIÇÃO CÉLULA MUNICÍPIO
                22,//POSIÇÃO CÉLULA REGIONAL_DER
                23,//POSIÇÃO CÉLULA JURISDICAO
                25,//POSIÇÃO CÉLULA  LAT_FINAL
                26 ////POSIÇÃO CÉLULA  LAT_FINAL
        };
        try {
            Workbook workbook = new XSSFWorkbook("Acidentes_2024.xlsx");
            Sheet sheet = workbook.getSheetAt(0);
            DataFormatter formatter = new DataFormatter();

            for (Row row : sheet){
                if(row.getRowNum()==0){continue;}
                Integer posicao = 0;
                String RegistroArray[] = new String[20];
                for (Integer posicaoColuna : posicaoColunas) {
                    Cell cell = row.getCell(posicaoColuna);

                    RegistroArray[posicao]= cell!=null ? formatter.formatCellValue(cell) :"";
                    posicao++;
                }


                registros.add(new RegistroAcidente( Integer.parseInt(2024+String.valueOf(Id)),RegistroArray[0],RegistroArray[1],RegistroArray[2],RegistroArray[3],RegistroArray[4],RegistroArray[5],RegistroArray[6],RegistroArray[7],RegistroArray[8],RegistroArray[9],RegistroArray[10],RegistroArray[11],RegistroArray[12],RegistroArray[13],RegistroArray[14],RegistroArray[15],RegistroArray[16],RegistroArray[17],RegistroArray[18],RegistroArray[19]));
                Id++;
            }

            workbook.close();
        }
        catch (Exception e){
            e.printStackTrace();
            e.getMessage();
        }

        for (int i = 0; i < registros.size(); i++) {
            System.out.println(registros.get(i));
        }
        System.out.println(registros.size());
    }
}
