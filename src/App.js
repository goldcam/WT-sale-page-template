import React, { useState, useEffect } from 'react';

// import React, { Component } from 'react';

import './css/App.scss';
import GameTile from './GameTile'
import ToggleMenu from './ToggleMenu'

const App = () => {
  const [showPricesIn, setShowPricesIn] = useState('cash');
  const [showGames, setShowGames] = useState(false);
  const [showToggle, setShowToggle] = useState(false);// change to false in production
  const tileClick = (game) => {
    window.location = `/games/${game.friendlyproductkey}`;
  };
  const changepricesDisplay = (e) => {
    let value = e.target.dataset.price;
    setShowPricesIn(value);
  };
  const updatePricesShown = () => {
    let wildCointAmmount = 0;

    if(document.querySelector('#global-navigation div.c0114 > a[role="button"] span.jss2')){
      wildCointAmmount = parseInt(document.querySelector('#global-navigation div.c0114 > a[role="button"] span.jss2').innerText);
    }
    return wildCointAmmount >= 10 ? (
      setShowGames(true),
      setShowPricesIn('wildcoins'),
      setShowToggle(true)
    ) : (
      setShowGames(true)
    );
  };
  useEffect(() => {
    window.addEventListener('load', updatePricesShown);
  }, []);

  return (
        <div id="app" >
          <div className="container main-container">
            <div className="row">
              <div className="col-sm-12 page-title">
              </div>
            </div>
            { showToggle ? (<div className="row">
              <div className="col-sm-12">
                <ToggleMenu changepricesDisplay={changepricesDisplay}
                            showPricesIn={showPricesIn}
                             />
              </div>
            </div>) : '' }
            <div className="row">
              <div className="col-sm-12">
              <div className="row game-tiles">
                  <GameTile tileClick={tileClick}
                            // activeGame={activeGameSection}
                            showPricesIn={showPricesIn}
                            showGames={showGames} />
              </div>
              </div>
            </div>
            <div className="scrollSpacer"></div>
          </div>
        </div>

      );
}

export default App
