import React, { Component } from 'react';
import './css/App.scss';

import GameTile from './GameTile'
import ToggleMenu from './ToggleMenu'

class App extends Component {

  constructor() {
    super();
    this.state = {
      games: [],
      showPricesIn: 'cash',
      showGames: false,
      showToggle: false // change to false in production
    }
    this.tileClick = this.tileClick.bind(this);
    this.changepricesDisplay = this.changepricesDisplay.bind(this);
    this.updatePricesShown = this.updatePricesShown.bind(this);
  }
  tileClick(game){
    window.location = `/games/${game.friendlyproductkey}`;
  }
  changepricesDisplay(e){
    let value = e.target.dataset.price;
      this.setState({
          showPricesIn: value
      });
  }

  updatePricesShown(){
    let wildCointAmmount = 0;
    if(document.getElementsByClassName('wildcoins-menu').length > 0){
      wildCointAmmount = parseInt(document.getElementsByClassName('wildcoins-menu')[0].children[0].textContent);
    }
    wildCointAmmount >= 10 ? (
      this.setState({
        showGames: true,
        showPricesIn: 'wildcoins',
        showToggle: true
      })
    ) : (
      this.setState({
        showGames: true
      })
    );
  }

  componentDidUpdate(){
  }

  componentDidMount(){
    window.addEventListener('load', this.updatePricesShown);
  }

  render(){
    return (
      <div id="app" >
        <div className="container main-container">
          <div className="row">
            <div className="col-sm-12 page-title">
            </div>
          </div>
          { this.state.showToggle ? (<div className="row">
            <div className="col-sm-12">
              <ToggleMenu changepricesDisplay={this.changepricesDisplay}
                          showPricesIn={this.state.showPricesIn}
                           />
            </div>
          </div>) : '' }
          <div className="row">
            <div className="col-sm-12">
            <div className="row game-tiles">
                <GameTile tileClick={this.tileClick}
                          activeGame={this.state.activeGameSection}
                          showPricesIn={this.state.showPricesIn}
                          showGames={this.state.showGames} />
            </div>
            </div>
          </div>
          <div className="scrollSpacer"></div>
        </div>
      </div>

    );
  }
}

export default App
