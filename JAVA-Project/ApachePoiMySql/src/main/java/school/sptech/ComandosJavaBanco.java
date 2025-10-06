package school.sptech;
import org.springframework.jdbc.core.JdbcTemplate;

public class ComandosJavaBanco {
    private final JdbcTemplate jdbcTemplate;

    public ComandosJavaBanco(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public void save(String insert) {
        jdbcTemplate.update(insert);
    }


}
