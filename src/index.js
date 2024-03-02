
function openAICall(spotifyResponse) {
    const OpenAiEndpoint = "https://api.openai.com/v1/chat/completions";
    const opciones = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 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' //use your key :(
        },
        body: JSON.stringify({ 
            model: 'gpt-3.5-turbo', 
            messages: [{"role": "user", "content": `Your role is to provide insightful information 
            for rocket launches at SpaceX. Please provide concise information with the given rocket description: 
            `}] 
        })
    };
    fetch(OpenAiEndpoint, opciones).then(
        function(response) {
            return response.json(); // Parse the JSON from the response
        }
    ).then(
        function(data) {
            
            const content = data.choices[0].message.content; 
            document.getElementById('yourElementId').innerHTML = content; 
        }
    ).catch(
        function(error) {
            console.error('Error:', error);
        }
    );
}