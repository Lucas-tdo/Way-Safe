package school.sptech;

    import com.mysql.cj.xdevapi.JsonArray;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;




public class Main {
    public static void main(String[] args) {
        // ConexaoBanco cnx = new ConexaoBanco();
        //ComandosJava comandos = new ComandosJava(cnx.getJdbcTemplate());
        //comandos.save("Lucas");
        String caminho = "acidentes_2025Excel.xlsx";
        try {
            Workbook workbook = new XSSFWorkbook(caminho);
            Sheet sheet = workbook.getSheetAt(0);
            String valor="";
            for (int i = 0; i < 23138; i++) {
                Row row = sheet.getRow(i);
                Cell cel = row.getCell(0);
                valor += "\n"+cel.getStringCellValue();
            }


            System.out.println(valor);
            workbook.close();
        }
        catch (Exception e){
            e.printStackTrace();
        }

    }
    }
