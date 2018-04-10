const client_id = '819423a5c5334960a8796ec5223089ba';
const redirect_uri = 'http://localhost:3000/'
let accessToken = '';

const Spotify = {

  getAccessToken(){

    if( accessToken ) {
      return accessToken;
    }
    // create vars to check token and session against
    const matchAccessToken = window.location.href.match(/access_token=([^&]*)/);
    const matchExpiry = window.location.href.match(/expires_in=([^&]*)/);

    if ( matchAccessToken && matchExpiry ){

      accessToken = matchAccessToken[0].replace('access_token=','');
      const expiresIn = Number(matchExpiry[1]);

      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;

    } else {
      window.location = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirect_uri}`;
    }
  },

  search(term){
    // make sure the accessToken is set
    const accessToken = this.getAccessToken();

    let url = `https://api.spotify.com/v1/search?type=track&q=${term}`;
    return fetch(
      url, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    ).then(response => {
      return response.json();
    }).then(jsonResponse => {
      // check for results
      if( !jsonResponse.tracks ){
        return [];
      }
      // map results to object for output to searchResults
      return jsonResponse.tracks.items.map(track => (
         {
          id: track.id,
          uri: track.uri,
          name: track.name,
          album: track.album.name,
          artist: track.album.artists[0].name
        }
      ));
    }); // end then
  }, // end search

  savePlaylist( playlistName, trackURIs ){
    const accessToken = Spotify.getAccessToken();
    let user_id = '';
    // const auth = {Authorization: `Bearer ${accessToken}`};
    // cannot use var for Headers
    // Error: Request header field auth is not allowed by Access-Control-Allow-Headers in preflight response.

    // get the user id
    return fetch(
      `https://api.spotify.com/v1/me/`,
      { headers: { Authorization: `Bearer ${accessToken}` }}
    ).then( response => response.json()).then( jsonResponse => {
        user_id = jsonResponse.id;
        // create playlist on spotify users account
        return fetch( `https://api.spotify.com/v1/users/${user_id}/playlists`,
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: playlistName})
          }
        ).then( response => response.json()).then( jsonResponse => {
            // add tracks to playlist
            if( jsonResponse.id ){
              alert('Your playlist was succesfully saved.');
              let playlist_id = jsonResponse.id;
              return fetch(`https://api.spotify.com/v1/users/${user_id}/playlists/${playlist_id}/tracks`,
                {
                  method: 'POST',
                  headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({uris: trackURIs})
                });
              } else { alert('Something went wrong, please try again.'); }
          }).catch(error => console.log( 'Error', error));
        });
  } // end savePlaylist
} // end Spotify

export default Spotify;
