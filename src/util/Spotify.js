const client_id = '819423a5c5334960a8796ec5223089ba';
//const client_secret = '8fb70fedc5fc40f8a83d8c1e2eefeec4';
const redirect_uri = 'http://localhost:3000/'
var accessToken;
//const save_playlist = `https://api.spotify.com/v1/users/${client_id}/playlists`; // POST

const Spotify = {

  getAccessToken(){
    if(accessToken){
      return accessToken;
    } else if ( window.location.href.match(/access_token=([^&]*)/) && window.location.href.match(/expires_in=([^&]*)/) ){

      accessToken = window.location.href.match(/access_token=([^&]*)/);
      let expiresIn = window.location.href.match(/expires_in=([^&]*)/);
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');

    } else {
      window.location = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirect_uri}`;
    }
  },

  search(term){
    return fetch(
      `https://api.spotify.com/v1/search?type=track&q=${term}`,
      { headers: { Authorization: `Bearer ${accessToken}`} }
    ).then(response => {
      return response.json();
    }).then( jsonResponse => {
      if( jsonResponse.searchResults){
        return jsonResponse.searchResults.map(searchResult => (
          {
            searchResult: {
              name: searchResult.name,
              artist: searchResult.artist,
              album: searchResult.album,
            },
          }
        ));
      }
    });
  }
}
export default Spotify;
