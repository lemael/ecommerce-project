using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;


public class GeminiService
{
    private readonly HttpClient _httpClient;
    private readonly string _apiKey;

    public GeminiService(HttpClient httpClient, IConfiguration config)
    {
        _httpClient = httpClient;
        _apiKey = config["Gemini:ApiKey"]?? throw new ArgumentNullException("Genimi:ApiKey manquant dans la configuration."); // récupère depuis variable d'environnement
    }

public async Task<string> AskGeminiAsync(string prompt)
{
    try
    {
        var url = $"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={_apiKey}";

        var requestBody = new
        {
            contents = new[]
            {
                new {
                    parts = new[]
                    {
                        new { text = prompt }
                    }
                }
            }
        };

        var response = await _httpClient.PostAsJsonAsync(url, requestBody);
        response.EnsureSuccessStatusCode();

        var responseJson = await response.Content.ReadFromJsonAsync<JsonDocument>();
        
        return responseJson.RootElement
            .GetProperty("candidates")[0]
            .GetProperty("content")
            .GetProperty("parts")[0]
            .GetProperty("text")
            .GetString();
    }
    catch (JsonException ex)
    {
        throw new ApplicationException("Erreur lors de l'analyse de la réponse JSON", ex);
    }
    catch (HttpRequestException ex)
    {
        throw new ApplicationException("Erreur de communication avec l'API Gemini", ex);
    }
}
}
