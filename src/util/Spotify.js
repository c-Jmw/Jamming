const client_id = '819423a5c5334960a8796ec5223089ba';
//const client_secret = '8fb70fedc5fc40f8a83d8c1e2eefeec4';
const redirect_uri = 'http://localhost:3000/'
var accessToken;
//const save_playlist = `https://api.spotify.com/v1/users/${client_id}/playlists`; // POST

const Spotify = {

  getAccessToken(){
    if(window.location.href.match(/access_token=([^&]*)/)){
      accessToken = window.location.href.match(/access_token=([^&]*)/);
      return accessToken;
    } else if ( accessToken ){

      accessToken = window.location.href.match(/access_token=([^&]*)/);
      let expiresIn = window.location.href.match(/expires_in=([^&]*)/);
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');

    } else {
      window.location = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirect_uri}`;
    }
  },


  search(term){
    this.getAccessToken();
    //console.log(accessToken[0]);
    if (accessToken){
      let url = `https://api.spotify.com/v1/search?q=${term}&type=track&${accessToken[0]}`
        console.log(url);
      return fetch( url // , { headers:  { Authorization: `Bearer ${accessToken}` } }
      ).then(response => {
        return response.json();
      }).then( jsonResponse => {
        if( jsonResponse.searchResults){
          console.log(jsonResponse);
          return jsonResponse.searchResults.map(track => (
            {
              track: {
                name: track.items.name
              },
            }
          ));
        }
      });
    }

  } // end search

} // end Spotify
export default Spotify;
