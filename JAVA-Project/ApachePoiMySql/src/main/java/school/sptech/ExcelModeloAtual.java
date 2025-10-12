package school.sptech;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import java.util.ArrayList;
import java.util.List;

public class ExcelModeloAtual extends Excel{

    private List<RegistroAcidente> registros;

    public ExcelModeloAtual(String arquivoTratar) {
        super(arquivoTratar,new Integer[]{1,2,5,6,7,8,10,11,13,14,15,16,17,18,20,21,22,23,25,26});
        this.registros = new ArrayList<>();
    }

    @Override
    public List<RegistroAcidente> tratarExcel( Integer idPadrao){
        Integer Id= 1;
        try {
            Workbook workbook = new XSSFWorkbook(getArquivoTratar());
            Sheet sheet = workbook.getSheetAt(0);
            DataFormatter formatter = new DataFormatter();
            Integer posicoes[] = getPosicaoCelulasExcel();

            for (Row row : sheet){
                if(row.getRowNum()==0){continue;}
                String registroArray[] = new String[posicoes.length];

                for (int i = 0; i < posicoes.length; i++) {
                    Cell cell = row.getCell(posicoes[i]);
                    registroArray[i]= cell!=null ? formatter.formatCellValue(cell) :"";
                }

                registros.add(new RegistroAcidente( Integer.parseInt(idPadrao +String.valueOf(Id)),registroArray[0],registroArray[1],registroArray[2] + " "+ registroArray[3],registroArray[4],registroArray[5],registroArray[6],registroArray[7],registroArray[8],registroArray[9],registroArray[10],registroArray[11],registroArray[12],registroArray[13],registroArray[14],registroArray[15],registroArray[16],registroArray[17],registroArray[18],registroArray[19]));
                Id++;
            }

            workbook.close();
        }
        catch (Exception e){
            e.printStackTrace();
            e.getMessage();
        }
        System.out.println("Foram tratados " + registros.size() + " registros");
        return registros;
    }


    public void analisarErros(){
        for (int i = 0; i < registros.size(); i++) {
            int fkConcessionaria = registros.get(i).getNomeConcessionaria();
            int fkRodovia = registros.get(i).getRodovia();
            int fkClasse = registros.get(i).getClasseAcidente();

            if(fkConcessionaria == -1 ){
                System.out.println("Registro com concessionaria inválida: " + registros.get(i).toString());
            }
            else if(fkRodovia == -1){
                System.out.println("Registro sem rodovia: " + registros.get(i).toString() );
            }
            else if(fkClasse == -1){
                System.out.println("Registro sem classe: " + registros.get(i).toString());
            }

        }
    }
}
