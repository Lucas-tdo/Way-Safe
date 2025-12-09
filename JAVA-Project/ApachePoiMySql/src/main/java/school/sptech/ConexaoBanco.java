package school.sptech;

import org.apache.commons.dbcp2.BasicDataSource;
import org.springframework.jdbc.core.JdbcTemplate;


public class ConexaoBanco {
    private final JdbcTemplate jdbcTemplate;
    private final BasicDataSource basicDataSource;

    public ConexaoBanco(){
        BasicDataSource basicDataSource = new BasicDataSource();
        basicDataSource.setUrl("jdbc:mysql://localhost:3306/waysafe");
        String user = System.getenv("USERSQL");
        String senha = System.getenv("SENHASQL");
        basicDataSource.setUsername(user);
        basicDataSource.setPassword(senha);

        this.basicDataSource = basicDataSource;
        this.jdbcTemplate = new JdbcTemplate(basicDataSource);
    }

    public BasicDataSource getBasicDataSource() {
        return basicDataSource;
    }

    public JdbcTemplate getJdbcTemplate() {
        return jdbcTemplate;
    }
 }
