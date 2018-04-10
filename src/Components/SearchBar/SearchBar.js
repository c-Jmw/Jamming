import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
  constructor(props){
    super(props);
    this.state = { searchTerm: '' };

    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
  }

  search(){
    // send the searchTerm to App
    this.props.onSearch(this.state.searchTerm);
  }

  handleTermChange(event){
    // save the input to searchTerm
    this.setState({ searchTerm: event.target.value });
    // call the search on each change to searchTerm
    this.search();
  }

  render(){
    return (
      <div className="SearchBar">
        <input placeholder="Enter A Song, Album, or Artist" onChange={this.handleTermChange} />
        <a onClick={this.search} >SEARCH</a>
      </div>
    );
  }
} // end SearchBar
export default SearchBar;
