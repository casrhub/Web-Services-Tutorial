const client_id = " ";
const client_secret = " ";
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

        myFunction("Stair way to heaven", tokenspo)
        //document.addEventListener('DOMContentLoaded', function() {
        //    // Wait for the DOM content to load before adding event listener
        //    document.getElementById('songForm').addEventListener('submit', function(event) {
        //        // Prevent the default form submission behavior
        //        event.preventDefault();
        //        
        //        // Get the value entered by the user in the input field
        //        var songName = document.getElementById('songName').value;
        //        
        //        // Call your JavaScript function and pass the songName value
        //        myFunction(songName, tokenspo);
        //
        //        document.getElementById('songName').value = '';
        //    });
        //});

        function myFunction(songName, tokenspo){
            const requestOptions_2 = {
                method: 'GET',
                headers: {'Authorization': 'Bearer ' + tokenspo}
            }

                const endpoint_spotify_2 = "https://api.spotify.com/v1/search?q="+songName+"&type=track";

                (async ()=> {
                try{
                    const response = await fetch(endpoint_spotify_2, requestOptions_2);
                    const data = await response.json()
                    console.log("-------------------------------------------------------------------------")
                    console.log(data)
                    
                    //const tokenspo = data.access_token;
                }catch (error) {
                    console.log( 'Error anidate function: ', error)
                }


                })();


        };











        

            
    } catch (error) {
        console.log( 'Error: ', error)
    }
  })();