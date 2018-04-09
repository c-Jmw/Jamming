import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
  constructor(props){
    super(props);
    this.state = { term: '' }

    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
  }

  search(){
    this.props.onSearch(this.state.term);
  }

  handleTermChange(event){
    this.setState({ term: event.target.value });
    this.search(this.state.term);
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

// class SearchBar extends React.Component {
//
//   constructor(props){
//     super(props);
//     this.state = {
//       term: ""//create a state
//     }
//     this.search = this.search.bind(this);
//     this.handleTermChange = this.handleTermChange.bind(this);
//   }
//
//   search(term){
//     this.props.onSearch(this.state.term);//change to the state term
//   }
//
//   handleTermChange(event){
//     this.setState({
//       term: event.target.value//set state term to the value of the event target
//     });
//   }
//
//   render(){
//     return (
//       <div className="SearchBar">
//         <input placeholder="Enter A Song, Album, or Artist" onChange={this.handleTermChange} />
//         <a onClick = {this.search} >SEARCH</a>//call search on click
//       </div>
//     );
//   }
// } // end SearchBar
//
// export default SearchBar;
