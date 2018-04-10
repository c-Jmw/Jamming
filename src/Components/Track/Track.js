import React from 'react';
import './Track.css';

class Track extends React.Component {

  constructor(props){
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }

  addTrack(){
    this.props.onAdd(this.props.track);
  }
  removeTrack(){
    this.props.onRemove(this.props.track)
  }

  render(){
    const isInList = this.props.listType;
    const trackAction = isInList === 'search_results' ? (
        <a className="Track-action" onClick={this.addTrack} >+</a>
      ) : (
        <a className="Track-action" onClick={this.removeTrack} >-</a>
      );

    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.track.name}</h3>
          <p><strong>{this.props.track.artist}</strong> - {this.props.track.album}</p>
        </div>
        {trackAction}
      </div>
    );
  }
} // end Track

export default Track;
