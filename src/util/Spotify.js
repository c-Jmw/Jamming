const client_id = '819423a5c5334960a8796ec5223089ba';
//const client_secret = '8fb70fedc5fc40f8a83d8c1e2eefeec4';
const redirect_uri = 'http://localhost:3000/'
let accessToken = '';

const Spotify = {

  getAccessToken(){

    if( accessToken ) {
      return accessToken;
    }
    // create vars to check session against
    const matchAccessToken = window.location.href.match(/access_token=([^&]*)/);
    const matchExpiry = window.location.href.match(/expires_in=([^&]*)/);

    if ( matchAccessToken && matchExpiry ){

      accessToken = matchAccessToken[0];
      const expiresIn = Number(matchExpiry[1]);

      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;

    } else {
      window.location = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirect_uri}`;
    }
  },

  search(term){
    // get accessToken
    let accessToken = Spotify.getAccessToken();
    console.log(accessToken);

    let url = `https://api.spotify.com/v1/search?type=track&q=${term}`; // `https://api.spotify.com/v1/search?q=${term}&type=track&${accessToken}`; // <<< This commented url returns search results
    return fetch(
      url, {
        headers: {
          'Authorization': `Bearer  ${accessToken}`
        }
      } // <<< headers does not get sent and returns a 401 unauthorised error.
    ).then(response => {
      return response.json();
    }).then(jsonResponse => {

      if( !jsonResponse.tracks ){
        return [];
      }

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
    let accessToken = Spotify.getAccessToken();
    //let user_id;
    return fetch(`https://api.spotify.com/v1/me/`, {headers: { Authorization: `Bearer ${accessToken}` }}).then( response => {
      return response.json();
    }).then( jsonResponse => {
      console.log( jsonResponse );
    });
     //console.log('user id is : '+user_id);
    // save_playlist = `https://api.spotify.com/v1/users/${client_id}/playlists`; // POST
  }

} // end Spotify

export default Spotify;
