import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class main {
    public static void main(String[] args) {
        System.out.println("Iniciando leitura de 400");
        for (int i = 0; i < 400; i++) {
            if (i%100 == 0){
                System.out.println(" Trazendo apontamento de data e hora dos arquivos de "+ i +" "+ (i+100));
                LocalDateTime dataHora = LocalDateTime.now();


                DateTimeFormatter chucro = DateTimeFormatter.ofPattern(" d/MM/yyyy '('EEEE')' hh:mm:ss.SSS a");


                String datachucra = dataHora.format(chucro);


                System.out.println(datachucra);
                System.out.println(" Leitura de arquivos "+ i +" a "+ (i+100)+ " concluida.");

            }
            if(i==203){
                DateTimeFormatter erro = DateTimeFormatter.ofPattern("hh:mm:ss.SSS");
                LocalDateTime dataHora = LocalDateTime.now();

                String horaerro = dataHora.format(erro);

                System.out.println(("\u001B[31m Erro ao ler o arquivo 203 no momento. "+ horaerro+" \u001B[0m"));;
            }

        }
    }

}
