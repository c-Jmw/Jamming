import React from 'react';
import './TrackList.css';

import Track from '../Track/Track';

class TrackList extends React.Component {
  render() {
    return (
      <div className="TrackList" >
          {
            this.props.tracks.map(track => {
              console.log(track);
              return (
                <Track
                  key={track.id}
                  track={track}
                  onAdd={this.props.onAdd}
                  onRemove={this.props.onRemove}
                  listType={this.props.listType}
                  />
              );
            })
          }
      </div>
    );
  }
} // end TrackList

export default TrackList;
