import React, { Component } from 'react';

import './css/GenreMenu.scss';

class GenreMenu extends Component {

  constructor(props) {
    super(props);
    this.state = {
      genres: []
    }
  }


  componentDidMount(){
  }



  render(){
    return (
      <>
      <ul>
      { this.props.genres.length > 0 ? (
        this.props.genres.map(g => {
          return (
            <li key={g} ><a href={`#${g.toLowerCase().replace(' ', '')}`}>{g}</a></li>
          )
        })
      ) : '' }

      </ul>
      </>
    );
  }
}
export default GenreMenu
