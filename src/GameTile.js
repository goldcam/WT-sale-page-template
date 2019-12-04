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
      {oid:"tendaysunderthesea", fullPrice:	9.99, fullWcPrice:	40},
      {oid:"thewitchsapprenticeamagicaalmish", fullPrice:	19.99, fullWcPrice:	40},
      {oid:"oidbrav005277queensquest5ce", fullPrice:	19.99, fullWcPrice:	40},
      {oid:"bigkahunawords", fullPrice:	19.99, fullWcPrice:	40},      


      {oid:"oidimma006073renzoracer", fullPrice:	9.99, fullWcPrice:	40},
      {oid:"oidalaw005994robinhoodcountry", fullPrice:	19.99, fullWcPrice:	80},
      {oid:"oidsuri006000jewelmatchatlanti", fullPrice:	12.99, fullWcPrice:	50},
      {oid:"oidplug006098kingdomnewlands", fullPrice:	14.99, fullWcPrice:	60},
      {oid:"oidbig006048hiddenexpedition", fullPrice:	9.99, fullWcPrice:	40},
      {oid:"oidfirs006008defenseofgreece", fullPrice:	9.99, fullWcPrice:	40},
      {oid:"oidwork006002argonautsagencym", fullPrice:	14.99, fullWcPrice:	60},
      {oid:"oidalaw004881imnotamonster", fullPrice:	10.99, fullWcPrice:	40},
      {oid:"oidimma006030legacywitchislan", fullPrice:	9.99, fullWcPrice:	40},
      {oid:"oidplug006044metalslugx", fullPrice:	7.99, fullWcPrice:	32},
      {oid:"oidalaw005975incredibledracula", fullPrice:	9.99, fullWcPrice:	40},
      {oid:"oidgame005992fabulousnewyork", fullPrice:	19.99, fullWcPrice:	80},
      {oid:"oidalaw005907spacerobinsonstea", fullPrice:	8.99, fullWcPrice:	null},
      {oid:"oidalaw005990spacerobinsonhar", fullPrice:	8.99, fullWcPrice:	40},
      {oid:"oidlgt005881cursedhouse7", fullPrice:	9.99, fullWcPrice:	40},
      {oid:"oidnotu005979mahjongfestsakur", fullPrice:	9.99, fullWcPrice:	40},
      {oid:"oidbig006029mysterytalesdeal", fullPrice:	9.99, fullWcPrice:	40},
      {oid:"lethispopsteam", fullPrice:	19.99, fullWcPrice:	null},
      {oid:"lethisddsteam", fullPrice:	12.99, fullWcPrice:	null},
      {oid:"brakesareforloserspc", fullPrice:	9.99, fullWcPrice:	40},
      {oid:"oidplug005287theflameinthefl", fullPrice:	14.99, fullWcPrice:	60},
      {oid:"oidplug005973nantucket", fullPrice:	17.99, fullWcPrice:	72},
      {oid:"oidplug005576americanfugitive", fullPrice:	19.99, fullWcPrice:	80},
      {oid:"oidplug005437bombercrewpc", fullPrice:	14.99, fullWcPrice:	60},
      {oid:"oidplug005441serialcleanerpc", fullPrice:	14.99, fullWcPrice:	60},
      {oid:"oidbig006026whisperedsecrets", fullPrice:	9.99, fullWcPrice:	40},
      {oid:"oidsham005955hiddenversekingdo", fullPrice:	9.99, fullWcPrice:	40},
      {oid:"oidsuri005996bestofhiddenobje", fullPrice:	19.99, fullWcPrice:	80},
      {oid:"oidplug006061freakoutcalamity", fullPrice:	9.99, fullWcPrice:	40},
      {oid:"oidsmar005890wildernessmosaic", fullPrice:	9.99, fullWcPrice:	40},
      {oid:"oidplug006063vane", fullPrice:	19.99, fullWcPrice:	80},
      {oid:"oidarti005852unchartedtidespo", fullPrice:	19.99, fullWcPrice:	80},
      {oid:"oidbig006078fatalevidencethe", fullPrice:	9.99, fullWcPrice:	40},
      {oid:"oidnotu006093travelriddlestri", fullPrice:	9.99, fullWcPrice:	40},
      {oid:"oidowl005932fablesofthekingd", fullPrice:	14.99, fullWcPrice:	60},
      {oid:"oidplug006043zombiederby2", fullPrice:	3.99, fullWcPrice:	16},
      {oid:"oidalaw006016watchersbattlepa", fullPrice:	8.99, fullWcPrice:	null},
      {oid:"oidmagn005943artmahjong4", fullPrice:	9.99, fullWcPrice:	40},
      {oid:"oidbig005969frightchasersdir", fullPrice:	9.99, fullWcPrice:	40},
      {oid:"oidmeri005952magicfarm3", fullPrice:	9.99, fullWcPrice:	40},
      {oid:"oidfirs0060091812napoleonwars", fullPrice:	4.99, fullWcPrice:	20},
      {oid:"oid8flo005882lostartifactsfro", fullPrice:	9.99, fullWcPrice:	40},
      {oid:"oid8flo005960detectivesolitaire", fullPrice:	9.99, fullWcPrice:	40},
      {oid:"nexway848039", fullPrice:	14.99, fullWcPrice:	null},
      {oid:"oidalaw005908dreamlandsolitaire", fullPrice:	6.99, fullWcPrice:	21},
      {oid:"oidplug006065badnorth", fullPrice:	14.99, fullWcPrice:	60},
      {oid:"oidbig005968theandersenaccoun", fullPrice:	9.99, fullWcPrice:	40},
      {oid:"oidplug006019golfpeaks", fullPrice:	4.99, fullWcPrice:	20},
      {oid:"oidplug006021mableandthewood", fullPrice:	14.99, fullWcPrice:	60}
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
                'productkey':prod.productkey,
                'oid':obj.oid,
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
                // 'oid': obj.oid,
                 'wcPrice': prod.wildcoinspurchasecost.value,
                // 'purchasecost': prod.purchasecost.value.toFixed(2)
              };
        return game;
      }).catch(error => { console.error(`An error occured ${error}`) });
    return X;
  });
    return Promise.all(promises).then(results => {
      return results.sort((a, b ) => {
        return b.releasedate - a.releasedate;
      });
    }).then(res =>{
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
    //img.srcset = `https://optimizedimages.wildtangent.com/${img.dataset.oid}/big_icon.png?auto=format&dpr=2&cs=tinysrgb&fill=blur&crop=false&fit=fillmax&w=350&h=196&ixlib=react-7.2.0 2x, https://optimizedimages.wildtangent.com/${img.dataset.oid}/big_icon.png?auto=format&dpr=3&cs=tinysrgb&fill=blur&crop=false&fit=fillmax&w=350&h=196&ixlib=react-7.2.0 3x`
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
               data-event-action="Fall-flash-sale Tile"
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
