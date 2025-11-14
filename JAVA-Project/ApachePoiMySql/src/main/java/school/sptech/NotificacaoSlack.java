package school.sptech;

import org.apache.commons.dbcp2.BasicDataSource;
import org.springframework.jdbc.core.JdbcTemplate;

public class NotificacaoSlack {

    private String mensagem;

    public NotificacaoSlack(String mensagem) {
        this.mensagem = mensagem;
    }

    public void NotificarSlack() throws IOException {
            // Headers por conta do CORS que impede de realziar algumas ações
            exchange.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
            exchange.getResponseHeaders().add("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
            exchange.getResponseHeaders().add("Access-Control-Allow-Headers", "Content-Type");

            // Responde requisições OPTIONS (preflight)
            if (exchange.getRequestMethod().equalsIgnoreCase("OPTIONS")) {
                exchange.sendResponseHeaders(204, -1);
                return;
            }

            HttpResponse<String> response = null;
            try (HttpClient httpClient = HttpClient.newHttpClient()) {

                String json = """ "text": """ + getMensagem();

                System.out.println("Mensagem recebida: " + json);

                // Um "fetch" só que do java
                HttpRequest request = HttpRequest.newBuilder()
                        .uri(URI.create("https://hooks.slack.com/services/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")) // Token do Slack webhook
                        .header("Content-Type", "application/json")
                        .POST(HttpRequest.BodyPublishers.ofString(json)) // Mensagem enviada la do front
                        .build();

                try {
                    response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

                    String responseBody;
                    if (response.statusCode() == 200 || response.statusCode() == 201) {
                        System.out.println("Response: " + response.body());
                        responseBody = "Mensagem enviada! Body recebido: " + requestBody;
                    } else {
                        responseBody = "Erro: " + response.statusCode();
                    }

                    byte[] responseBytes = responseBody.getBytes(StandardCharsets.UTF_8);
                    exchange.sendResponseHeaders(200, responseBytes.length);
                    OutputStream os = exchange.getResponseBody();
                    os.write(responseBytes);
                    os.close();

                } catch (IOException | InterruptedException e) {
                    e.printStackTrace();
                }
            }
    }

    public String getMensagem() {
        return mensagem;
    }

    public void setMensagem(String mensagem) {
        this.mensagem = mensagem;
    }
}
