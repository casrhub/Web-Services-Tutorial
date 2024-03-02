
require('dotenv').config();
const client_id =process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;

const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `grant_type=client_credentials&client_id=${client_id}&client_secret=${client_secret}`
}
  const endpoint_spotify="https://accounts.spotify.com/api/token";



  (async ()=> {
    try {
        const response = await fetch(endpoint_spotify, requestOptions);
        const data = await response.json()
        const tokenspo = data.access_token;
        console.log(tokenspo)
        console.log(data)

    } catch (error) {   
        console.log( 'Error: ', error)
    }
  })();

  function myFunction() {
    const songName = document.getElementById('songName').value; // Get the song name from the input
    const tokenspo = process.env.TOKEN; // Replace this with your actual Spotify token

    const requestOptions_2 = {
        method: 'GET',
        headers: {'Authorization': 'Bearer ' + tokenspo}
    };

    const endpoint_spotify_2 = `https://api.spotify.com/v1/search?q=${encodeURIComponent(songName)}&type=track`;

    (async () => {
        try {
            const response = await fetch(endpoint_spotify_2, requestOptions_2);
            const data = await response.json();
            const artistName = data.tracks.items[0].artists[0].name;
            console.log(artistName)

            // Display the artist name instead of console logging
            document.getElementById('artistNameDisplay').innerText = "Artist Name: " + artistName;
        } catch (error) {
            console.error('Error in function: ', error);
            document.getElementById('artistNameDisplay').innerText = 'Error fetching artist name.';
        }
    })();
}


  function test () {
    return console.log("Hello ")

  }

// Create a text input in html 
// send that input and use it as a paramter in my function in js
// return artist name from js 
