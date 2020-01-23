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

        {oid: "oidcasu005308vacationadventures", fullPrice: 19.99, fullWcPrice: 40},
        {oid: "oidcasu006108christmaswonderlan", fullPrice: 19.99, fullWcPrice: 80},
        {oid: "oidalaw005994robinhoodcountry", fullPrice: 19.99, fullWcPrice: 40},
        {oid: "oidalaw005975incredibledracula", fullPrice: 9.99, fullWcPrice: 40},
        {oid: "oidgame005992fabulousnewyork", fullPrice: 19.99, fullWcPrice: 80},
        {oid: "oidgame005637deliciousemilys", fullPrice: 19.99, fullWcPrice: 80},
        {oid: "oidsuri006000jewelmatchatlanti", fullPrice: 12.99, fullWcPrice: 50},
        {oid: "oidsuri005995runefall2", fullPrice: 19.99, fullWcPrice: 40},
        {oid: "oidiwin006036maggiesmoviesse", fullPrice: 14.99, fullWcPrice: 60},
        {oid: "oidiwin005773primeroselake", fullPrice: 19.99, fullWcPrice: 80},
        {oid: "oidbrav006069familymysteriesce", fullPrice: 14.99, fullWcPrice: 30},
        {oid: "oidbrav006071yuletidelegends3", fullPrice: 9.99, fullWcPrice: 40},
        {oid: "oid8flo005883lostartifactsfro", fullPrice: 9.99, fullWcPrice: 20},
        {oid: "oid8flo005927crownoftheempire", fullPrice: 9.99, fullWcPrice: 40},
        {oid: "oidjetd00593612laboursofhercu", fullPrice: 19.99, fullWcPrice: 80},
        {oid: "oidjetd006031shoppingclutter4", fullPrice: 9.99, fullWcPrice: 40},
        {oid: "oidfive005398newyorkmysteries", fullPrice: 19.99, fullWcPrice: 80},
        {oid: "oidfive005075thelegacythetree", fullPrice: 19.99, fullWcPrice: 80},
        {oid: "oidarti005904themythseekers2", fullPrice: 9.99, fullWcPrice: 40},
        {oid: "oidarti005852unchartedtidespo", fullPrice: 19.99, fullWcPrice: 40},
        {oid: "oidowl005932fablesofthekingd", fullPrice: 14.99, fullWcPrice: 30},
        {oid: "oidnotu005979mahjongfestsakur", fullPrice: 9.99, fullWcPrice: 20},
        {oid: "oidbig006068aliceswonderland", fullPrice: 9.99, fullWcPrice: 40},
        {oid: "oidwork006002argonautsagencym", fullPrice: 14.99, fullWcPrice: 60},
        {oid: "oidpuzz005148clutter1000", fullPrice: 9.99, fullWcPrice: 40},
        {oid: "oidgrow005416elvenlegend7ce", fullPrice: 19.99, fullWcPrice: 80},
        {oid: "oidquma005706romanadventurebri", fullPrice: 9.99, fullWcPrice: 40},
        {oid: "oidmagn006033goldoftheincass", fullPrice: 9.99, fullWcPrice: 20},
        {oid: "oidlazy005953traveltoengland", fullPrice: 9.99, fullWcPrice: 40},
        {oid: "oidimma006030legacywitchislan", fullPrice: 9.99, fullWcPrice: 20},

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
                 'ranking': prod.ranking.mostpopularrating.rank

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
    .then(results => {
      return results.sort((a, b ) => {
        return b.releasedate - a.releasedate;
      });
    })
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
           (game.fullWcPrice != null && this.props.showPricesIn === 'wildcoins' ) || this.props.showPricesIn === 'cash' ? (
            <div onClick={() => this.props.tileClick(game)}
               className={"wrapperElement col-xs-6 col-sm-6 col-md-4 col-lg-3 col-xl-3 active"}
               data-event-action="lunar-new-year-sale Tile"
               data-event-category="Landing Page"
               data-event-label={game.productkey}
               key={game.i}
               data-orderitemid={game.productkey}>
            <div className="innerWrapper">
            <div className="bigIconDiv">
              <img src={game.featuredTile} className="featuredTile" alt={game.title} onError={this.addDefaultSrc} data-oid={game.productkey} />
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

              { this.props.showPricesIn === 'cash' ? (
               <span className="gamePrice cash">
                 <span className="strikeThrough">${game.fullPrice}</span>

                 <span className='sale-and-discount'>
                   <span className="percent-off">
                     {Math.abs(((game.purchasecost/game.fullPrice) - 1) * 100).toFixed()}% off
                   </span>
                   <span className="price">${game.purchasecost}</span>
                 </span>

               </span>
              ) : (
                <span className="gamePrice wildcoins">
                  <span className="strikeThrough">{game.fullWcPrice}</span>

                  <span className='sale-and-discount'>
                    <span className="percent-off">
                    {Math.abs(((game.wildcoinspurchasecost.value/game.fullWcPrice) - 1) * 100).toFixed()}% off
                    </span>
                    <span className="wildcoinPrice price">{game.wildcoinspurchasecost.value}</span>
                  </span>

                </span>
            )}

            </p>


            </div>
          </div>
          ) : ''
      )
      }) : '' }
      </>
    );
  }
}
export default GameTile
