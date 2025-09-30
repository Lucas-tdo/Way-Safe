package school.sptech;
import org.springframework.jdbc.core.JdbcTemplate;
public class ComandosJava {
    private final JdbcTemplate jdbcTemplate;

    public ComandosJava(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public void save(String nome) {
        jdbcTemplate.update("INSERT INTO musica VALUES (?) ",
                nome);
    }


}
