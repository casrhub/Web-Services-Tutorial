

const client_id = "7489191eac1e481ab9e70370c8b68386";
const client_secret = "5d731b8e7af74abc947c626b5a7ccee6";
const endpoint_spotify = "https://accounts.spotify.com/api/token";
const endpoint_ai = "https://api.openai.com/v1/chat/completions";



async function getSpotifyToken() {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `grant_type=client_credentials&client_id=${client_id}&client_secret=${client_secret}`
    };
    const response = await fetch(endpoint_spotify, requestOptions);
    const data = await response.json();
    return data.access_token;
}

async function searchSpotifySong(token, songName) {
    const requestOptions = {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + token }
    };
    const query = encodeURIComponent(songName);
    const endpoint = `https://api.spotify.com/v1/search?q=${query}&type=track`;
    const response = await fetch(endpoint, requestOptions);
    const data = await response.json();
    if (data.tracks.items.length > 0) {
        const artist_name = data.tracks.items[0].artists[0].name
        const song_name = data.tracks.items[0].name
        console.log("Song name and artist grabbed from Spotify: ")
        return `${song_name} by ${artist_name} \n`
        
    }
    throw new Error('Song not found');
}

async function getArtistName (token, songName) {
    const requestOptions = {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + token }
    };
    const query = encodeURIComponent(songName);
    const endpoint = `https://api.spotify.com/v1/search?q=${query}&type=track`;
    const response = await fetch(endpoint, requestOptions);
    const data = await response.json();
    if (data.tracks.items.length > 0) {
        const artist_name = data.tracks.items[0].artists[0].name
        return artist_name
        
    }
    throw new Error('Song not found');

}

async function getOpenAIReflection(song_name_and_artist) {
    const body = JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ "role": "user", "content": `Give me a deep philosophical reflection about ${song_name_and_artist}.` }]
    });
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer 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' },
        body: body
    };
    const response = await fetch(endpoint_ai, requestOptions);
    const data = await response.json();
    console.log("Philosophical Reflection generated by gpt-3.5-turbo: ")
    return data.choices[0].message.content;
}

async function fetchNewsArticlesAboutSong(songInfoNews) {
    const apikey = 'b313687625b79032df0d4c0f8914bf38';
    const encodedSongInfo = encodeURIComponent(songInfoNews); // Ensure the song info is URL-safe
    const url = `https://gnews.io/api/v4/search?q=${encodedSongInfo}&lang=en&country=us&max=10&apikey=${apikey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        const articles = data.articles;

        console.log(`News Related to "${songInfoNews}":`);
        

        for (let i = 0; i < articles.length; i++) {
            console.log(`New ${i}: ${articles[i]['title']}`);
            console.log(`Description: ${articles[i]['description']}`);
            console.log("\n");
            // To display all articles, remove the break statement below.
             // Remove this to iterate through all articles

        }
    
    } catch (error) {
        console.log('Error fetching news articles:', error);
    }
}




(async () => {
    try {
        const songToAnalyze = "Poker Face"
        const token = await getSpotifyToken();
        const song_info = await searchSpotifySong(token, songToAnalyze);
        console.log(song_info)
        const reflection = await getOpenAIReflection(song_info);
        console.log(reflection);
        console.log("\n")
        const artistNameForNews = await getArtistName(token, songToAnalyze)
        await fetchNewsArticlesAboutSong(artistNameForNews)
    } catch (error) {
        console.log('Error:', error.message);
    }
})();
