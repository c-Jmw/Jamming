import React from 'react';
import './App.css';

import SearchBar from './Components/SearchBar/SearchBar';
import SearchResults from './Components/SearchResults/SearchResults';
import Playlist from './Components/Playlist/Playlist';
import Spotify from './util/Spotify';

class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {
        searchTerm: null,
        searchResults: [],
        playlistName: '',
        playlistTracks: [],
      };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);

  } // end constructor

  addTrack(track){
    // create an array of id's from the current playlist to check the seleceted track against.
    let currentTracks = this.state.playlistTracks.map(track => track.id);

    if( currentTracks.includes(track.id) === false ){

      // save a copy of the current playlist, then add the seleceted track to the array.
      let currentPlaylist = this.state.playlistTracks;
      currentPlaylist.push(track);
      // update the playlist in state.
      this.setState({ playlistTracks : currentPlaylist });

    } else {
      alert('Track already in playlist.');
    } // end if
  } // end addTrack

  removeTrack(track){
    // map the id's of tracks currently in the playlist to an array
    let currentTracks = this.state.playlistTracks.map(track => track.id);
    // get the index of the selected track to be removed
    let trackIndex = currentTracks.indexOf(track.id);
    // set a copy of the current playlist state then remove the selected track
    let currentPlaylist = this.state.playlistTracks;
    currentPlaylist.splice(trackIndex, 1);
    // save the modfied playlist back to state.
    this.setState({ playlistTracks: currentPlaylist });
  } // end removeTrack

  updatePlaylistName(name){
    this.setState({ playlistName: name });
  }

  savePlaylist(){
    console.log('this is working');
  }

  search(term){
    let urlTerm = term.replace(' ', '%20');
    Spotify.search(urlTerm).then(track =>{
      this.setState({ searchResults: track });
    });
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
          <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
            <Playlist
                playlistName={this.state.playlistName}
                playlistTracks={this.state.playlistTracks}
                onRemove={this.removeTrack}
                onNameChange={this.updatePlaylistName}
                onSave={this.savePlaylist}
                />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
