import React, { Component } from 'react';
import './css/App.scss';

import GameTile from './GameTile'
// import ToggleMenu from './ToggleMenu'
// import GenreMenu from './GenreMenu'

import EnUsHeader from './img/en-us/header.png'
import DeDeHeader from './img/de-de/header.png'
import ItItHeader from './img/it-it/header.png'
import FrFrHeader from './img/fr-fr/header.png'
import EsEsHeader from './img/es-es/header.png'
import EsMxHeader from './img/es-mx/header.png'
import PtBrHeader from './img/pt-br/header.png'
import KoKrHeader from './img/ko-kr/header.png'
import ZhHkHeader from './img/zh-hk/header.png'
import ZhCnHeader from './img/zh-cn/header.png'

class App extends Component {

  constructor() {
    super();
    this.state = {
      showGames: false,
      lang: 'en-us',
      headerImage: EnUsHeader
    }
    this.tileClick = this.tileClick.bind(this);
    this.changepricesDisplay = this.changepricesDisplay.bind(this);
    this.getLang = this.getLang.bind(this);
    this.getHeaderImage = this.getHeaderImage.bind(this);
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

  getLang(){
    if(typeof window.dataLayer !== 'undefined'){
      let userLanguage = window.dataLayer[0].userLanguage.toLocaleLowerCase()
      this.setState({
        lang:userLanguage
      })
    }
  }

  getHeaderImage(lang){
    switch(lang){
      case 'en-us':
      default:
        this.setState({
          headerImage: EnUsHeader
        })
      break;
      case 'de-de':
        this.setState({
          headerImage: DeDeHeader
        })
      break;
      case 'it-it':
        this.setState({
          headerImage: ItItHeader
        })
      break;
      case 'fr-fr':
        this.setState({
          headerImage: FrFrHeader
        })
      break;
      case 'es-es':
        this.setState({
          headerImage: EsEsHeader
        })
      break;
      case 'es-mx':
        this.setState({
          headerImage: EsMxHeader
        })
      break;
      case 'pt-br':
        this.setState({
          headerImage: PtBrHeader
        })
      break;
      case 'ko-kr':
        this.setState({
          headerImage: KoKrHeader
        })
      break;
      case 'zh-hk':
        this.setState({
          headerImage: ZhHkHeader
        })
      break;
      case 'zh-cn':
        this.setState({
          headerImage: ZhCnHeader
        })
      break;
    }
  }

  componentDidMount(){
    this.getLang();
    this.getHeaderImage(this.state.lang);
    this.setState({
      showGames: true
    })
  }

  render(){
    let backgroundImg = {
      backgroundImage: `url(${this.state.headerImage})`
    }
    return (
      <div id="app" >
        <div className="container main-container">
          <div className="row">
            <div className="col-sm-12 page-title" style={backgroundImg}>
            </div>
          </div>
        </div>
        <div className="game-tiles">
            <GameTile tileClick={this.tileClick}
                      showGames={this.state.showGames}
                      lang={this.state.lang} />
        </div>
        <div className="scrollSpacer"></div>
      </div>
    );
  }
}

export default App

// <div className="row">
//   <div className="col-sm-12 genre-menu">
//     <GenreMenu genres={this.state.genres} />
//   </div>
// </div>
