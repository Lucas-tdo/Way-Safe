package school.sptech;

    import com.mysql.cj.xdevapi.JsonArray;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

    import java.util.Arrays;


public class Main {
    public static void main(String[] args) {
        // ConexaoBanco cnx = new ConexaoBanco();
        //ComandosJava comandos = new ComandosJava(cnx.getJdbcTemplate());
        //comandos.save("Lucas");
        DadosTratamento tratar = new DadosTratamento();
        tratar.TratarExcel25();

    }
    }
