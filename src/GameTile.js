import React, { Component } from 'react';
import { polyfill } from 'es6-promise';
import axios from 'axios';
import './css/GameTile.scss';
import LinesEllipsis from 'react-lines-ellipsis';
import responsiveHOC from 'react-lines-ellipsis/lib/responsiveHOC';

const ResponsiveEllipsis = responsiveHOC()(LinesEllipsis)



polyfill();

class GameTile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      games: []
    }
    this.addDefaultSrc = this.addDefaultSrc.bind(this);
  }

  getGames(){
    let gamesArr = [
      //test oids
      //{oid:"tendaysunderthesea", fullPrice:	9.99, fullWcPrice:	40},
      // {oid:"thewitchsapprenticeamagicaalmish", fullPrice:	19.99, fullWcPrice:	40},
      // {oid:"oidbrav005277queensquest5ce", fullPrice:	19.99, fullWcPrice:	40},
      // {oid:"bigkahunawords", fullPrice:	19.99, fullWcPrice:	40},

      //OIDS GO HERE EXAMPLE: {oid:"oidimma006073renzoracer", fullPrice:	9.99, fullWcPrice:	40},

      //https://products.wildtangent.com/products/v1.0/wildgames/us/en-us/bestofhiddenobject?output=json&scope=all

      //{oid:"bestofhiddenobject", cost: 5, variant: "rent"},
      {oid:"oidlazy005535thefarkingdomsh",cost: 3, variant: "buy", fullWcPrice: 40},
      //{oid:"moai3trademission",cost: 1, variant: "rent"},
      {oid:"aliciaquatermainsotltse",cost: 5, variant: "buy", fullWcPrice: 20},
      {oid:"farmscapes",cost: 2, variant: "buy", fullWcPrice: 20},
      //{oid:"runefall",cost: 1, variant: "rent"},
      {oid:"seasonmatch3hd",cost: 4, variant: "buy", fullWcPrice: 40},
      //{oid:"jigsawworldtour",cost: 2, variant: "rent"},
      //{oid:"avalonlegendssolitaire3",cost: 3, variant: "rent"},
      {oid:"Vikingsaga",cost: 1, variant: "buy", fullWcPrice: 6}
    ],
    promises = gamesArr.map((obj, i) => {
      const X = axios.get(`https://products.wildtangent.com/products/v1.0/wildgames/us/en-us/${obj.oid}?output=json&scope=all`)
        .then(result => {
          let prod = result.data.results[0],
              genre = (i => {
                let tagLength = i.tags.length;
                for (let ha = 0; ha < tagLength; ha++){
                  if ('Genre' === i.tags[ha].tagtype){
                    return i.tags[ha].displayname;
                  }
                }
                return null
              })(prod),
              releaseDate = new Date(prod.releasedate.value.match(/\d+/)[0] * 1),
              game = {
                'oid':obj.oid,
                'variant':obj.variant,

                'productkey':prod.productkey,
                'title': prod.title,
                'i': i,
                'friendlyproductkey':prod.friendlyproductkey,
                'fullWcPrice': obj.fullWcPrice,
                'wildcoinspurchasecost': prod.wildcoinspurchasecost,
                'genre': genre,
                'bigIcon': `https://optimizedimages.wildtangent.com/${prod.productkey}/big_icon.png?h=160&w=160&auto=compress&cs=tinysrgb`,
                'featuredTile': `https://optimizedimages.wildtangent.com/${prod.productkey}/featured_tile.jpg?auto=compress&cs=tinysrgb`,
                'purchasecost': prod.purchasecost.value.toFixed(2),
                'fullPrice': obj.fullPrice,
                'releasedate': releaseDate,
                'wcPrice': prod.wildcoinspurchasecost.value,
                'ranking': prod.ranking.mostpopularrating.rank,
                'sessioncost': prod.sessioncost

                 // 'fullPrice': prod.purchasecost.value.toFixed(2),
                 // 'fullWcPrice': prod.wildcoinspurchasecost.value,
              };
        return game;
      }).catch(error => { console.error(`An error occured ${error}`) });
    return X;
  });
    return Promise.all(promises)
    // .then(res => {
    //   return res.sort((a,b) => {
    //     return a.ranking - b.ranking;
    //   })
    // })
    // .then(results => {
    //   return results.sort((a, b ) => {
    //     return b.releasedate - a.releasedate;
    //   });
    // })
    .then(res =>{
      this.setState({
        games: res
      });
    });

  }

  componentDidMount(){
    this.getGames();
  }

  addDefaultSrc(e){
    let img = e.target;
    img.src = `https://optimizedimages.wildtangent.com/${img.dataset.oid}/big_icon.png?auto=format&dpr=1&cs=tinysrgb&fill=blur&crop=false&fit=fillmax&w=350&h=143&ixlib=react-7.2.0`;
    img.classList.remove('featuredTile');
    img.classList.add('bigIcon');
  }

  render(){
    return (
      <>
      { (this.state.games.length > 0 && this.props.showGames === true ) ? this.state.games.map(game => {
          return (

            <div onClick={() => this.props.tileClick(game)}
               className="wrapperElement col-xs-6 col-sm-6 col-md-5ths col-lg-5ths col-xl-5ths active"
               data-event-action="Low-wcs Tile"
               data-event-category="Landing Page"
               data-event-label={game.productkey}
               key={game.i}
               data-orderitemid={game.productkey}>
            <div className="innerWrapper">
            <div className="bigIconDiv">
              <img src={game.bigIcon} className="bigIcon" alt={game.title} onError={this.addDefaultSrc} data-oid={game.productkey} />
            </div>

            <ResponsiveEllipsis style={{ whiteSpace: 'pre-wrap' }}
              text={game.title}
               maxLine='2'
               ellipsis='...'
               trimRight='true'
               basedOn='words'
               className="gameTitle"
               component='p'
            />

            <p className="bottom-text">
              <span className="genre">{game.genre} </span>


                <span className="gamePrice wildcoins">


                  <span className='sale-and-discount'>
                    
                    <span className="wildcoinPrice price">{game.variant === 'buy' ? game.wildcoinspurchasecost.value : game.sessioncost}</span>
                  </span>

                </span>


            </p>


            </div>
          </div>

      )
      }) : '' }
      </>
    );
  }
}
export default GameTile


//className="wrapperElement col-xs-6 col-sm-6 col-md-4 col-lg-3 col-xl-3 active"
