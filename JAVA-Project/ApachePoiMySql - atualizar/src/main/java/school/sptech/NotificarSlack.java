//package school.sptech;
//
//import java.io.IOException;
//import java.net.URI;
//import java.net.http.HttpClient;
//import java.net.http.HttpRequest;
//import java.net.http.HttpResponse;
//
//public class NotificarSlack {
//
//    public static void notificarSlack() {
//
//        HttpResponse<String> response = null;
//        try (HttpClient httpClient = HttpClient.newHttpClient()) {
//
//            String json = "{ \"text\": \"Banco de dados carregado com sucesso\" }";
//
//            System.out.println("Body recebido do frontend: " + json);
//
//            // Um "fetch" só que do java
//            HttpRequest request = HttpRequest.newBuilder()
//                    .uri(URI.create("https://hooks.slack.com/services/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")) // Token do Slack webhook
//                    .header("Content-Type", "application/json")
//                    .POST(HttpRequest.BodyPublishers.ofString(json)) // Mensagem enviada la do front
//                    .build();
//
//            try {
//                response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
//
//                String responseBody;
//                if (response.statusCode() == 200 || response.statusCode() == 201) {
//                    System.out.println("Response: " + response.body());
//                    responseBody = "Mensagem enviada! Body recebido: " + json;
//                } else {
//                    responseBody = "Erro: " + response.statusCode();
//                }
//
//                System.out.println(responseBody);
//
//            } catch (IOException | InterruptedException e) {
//                e.printStackTrace();
//            }
//        }
//    }
//}
