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

      {oid:"oidjetd006112travelmosaics11", fullPrice:	9.99,	fullWcPrice:40},
      {oid:"oidnotu006088christmaspuzzle", fullPrice:	9.99,	fullWcPrice:40},
      {oid:"oidgree005306hopesfarm", fullPrice:	9.99,	fullWcPrice:40},
      {oid:"oidsuri006001jewelmatchatlanti", fullPrice:	9.99,	fullWcPrice:40},
      {oid:"oidalaw006046goldenrailstales", fullPrice:	9.99,	fullWcPrice:40},
      {oid:"oidwst006137gizmosjungleadve", fullPrice:	9.99,	fullWcPrice:40},
      {oid:"oidsuri005999jewelmatchtwiligh", fullPrice:	9.99,	fullWcPrice:40},
      {oid:"oidwork006003argonautsagencym", fullPrice:	9.99,	fullWcPrice:40},
      {oid:"oidcasu005308vacationadventures", fullPrice:	19.99,	fullWcPrice:80},
      {oid:"oidmatc005888fantasymosaics38", fullPrice:	9.99,	fullWcPrice:40},
      {oid:"oidefu006047thelegendoferatu", fullPrice:	9.99,	fullWcPrice:40},
      {oid:"oidbig006028grimtalesthenom", fullPrice:	9.99,	fullWcPrice:40},
      {oid:"oidalaw006032hermeswarofthe", fullPrice:	12.99,	fullWcPrice:50},
      {oid:"oidsuri005995runefall2", fullPrice:	9.99,	fullWcPrice:40},
      {oid:"oidiron005993towerofgod", fullPrice:	9.99,	fullWcPrice:40},
      {oid:"oidowl005933fablesofthekingd", fullPrice:	9.99,	fullWcPrice:40},
      {oid:"oidalaw005994robinhoodcountry", fullPrice:	19.99,	fullWcPrice:80},
      {oid:"oidimma006073renzoracer", fullPrice:	9.99,	fullWcPrice:40},
      {oid:"oidnotu006093travelriddlestri", fullPrice:	9.99,	fullWcPrice:40},
      {oid:"oidsham005955hiddenversekingdo", fullPrice:	9.99,	fullWcPrice:40},
      {oid:"oidfirs006008defenseofgreece", fullPrice:	9.99,	fullWcPrice:40},
      {oid:"oidjetd005826aliciaquatermain4", fullPrice:	9.99,	fullWcPrice:40},
      {oid:"oidimma006030legacywitchislan", fullPrice:	9.99,	fullWcPrice:40},
      {oid:"oidplug006063vane", fullPrice:	19.99,	fullWcPrice:80},
      {oid:"oidmagn006033goldoftheincass", fullPrice:	9.99,	fullWcPrice:40},
      {oid:"oidnotu005979mahjongfestsakur", fullPrice:	9.99,	fullWcPrice:40},
      {oid:"oidbig006029mysterytalesdeal", fullPrice:	9.99,	fullWcPrice:40},
      {oid:"oidbig005991aliceswonderland", fullPrice:	19.99,	fullWcPrice:80},
      {oid:"oidbig006078fatalevidencethe", fullPrice:	9.99,	fullWcPrice:40},
      {oid:"oidbig006048hiddenexpedition", fullPrice:	9.99,	fullWcPrice:40},
      {oid:"oidbig006049endlessfablessha", fullPrice:	9.99,	fullWcPrice:40},
      {oid:"oidnotu006045numberworld", fullPrice:	9.99,	fullWcPrice:40},
      {oid:"oidbig006050paranormalfilese", fullPrice:	9.99,	fullWcPrice:40},
      {oid:"oidbig006051mysterytrackerst", fullPrice:	9.99,	fullWcPrice:40},
      {oid:"oidbig006052immortallovebitt", fullPrice:	9.99,	fullWcPrice:40},
      {oid:"oidbig006054detectivesunitedi", fullPrice:	9.99,	fullWcPrice:40},
      {oid:"oidfive005756darknessandflame", fullPrice:	19.99,	fullWcPrice:80},
      {oid:"oidgame006107detectivejackiem", fullPrice:	19.99,	fullWcPrice:80},
      {oid:"oidbig006079thesecretorderr", fullPrice:	9.99,	fullWcPrice:40},
      {oid:"oidbrav006069familymysteriesce", fullPrice:	19.99,	fullWcPrice:80},
      {oid:"oidbig006027wanderlustthecit", fullPrice:	9.99,	fullWcPrice:40},
      {oid:"oidbig006082msholmesthemons", fullPrice:	9.99,	fullWcPrice:40},
      {oid:"oidlgt005881cursedhouse7", fullPrice:	9.99,	fullWcPrice:40},
      {oid:"oidfirs0060091812napoleonwars", fullPrice:	9.99,	fullWcPrice:40},
      {oid:"oidbig005969frightchasersdir", fullPrice:	9.99,	fullWcPrice:40},
      {oid:"oidbig006023darktalesedgaral", fullPrice:	9.99,	fullWcPrice:40},
      {oid:"oidbig005988bridgetoanotherw", fullPrice:	9.99,	fullWcPrice:40},
      {oid:"oidbig005971phantasmatremains", fullPrice:	9.99,	fullWcPrice:40},
      {oid:"oidbig005970mysteryoftheanci", fullPrice:	9.99,	fullWcPrice:40}

      //https://products.wildtangent.com/products/v1.0/wildgames/us/en-us/oidbig005970mysteryoftheanci?output=json&scope=all


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
    .then(res => {
      return res.sort((a,b) => {
        return a.ranking - b.ranking;
      })
    })
    //for sorting by release date decending
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
           (game.fullWcPrice != null && this.props.showPricesIn === 'wildcoins' ) || this.props.showPricesIn === 'cash' ? (
            <div onClick={() => this.props.tileClick(game)}
               className={"wrapperElement col-xs-6 col-sm-6 col-md-4 col-lg-3 col-xl-3 active"}
               data-event-action="christmas-sale Tile"
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
