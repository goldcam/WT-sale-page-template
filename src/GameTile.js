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
    this.sortGamesByGenre = this.sortGamesByGenre.bind(this);
  }

  getGames(lang){
    let gamesArr = [
      //OIDS GO HERE
      //EXAMPLE FOR SALE PAGES: {oid:"oidimma006073renzoracer", fullPrice:	9.99, fullWcPrice:	40},
      //EXAMPLE FOR BEST OF PAGE: {oid:"oidimma006073renzoracer", fullPrice:	9.99, fullWcPrice:	40},

      {oid:"oidcasu005309vacationadventures"},
      {oid:"oidpoin005305adventuretriplon"},
      {oid:"oidpuzz005148clutter1000"},
      {oid:"oidcasu005308vacationadventures"},
      {oid:"oidbig005378immortalloveblac"},

      {oid:"oidgame005637deliciousemilys"},
      {oid:"oidalaw005291vikingsisters"},
      {oid:"oidquma005706romanadventurebri"},
      {oid:"oidgame005268fabulousangelas"},
      {oid:"oidalaw005868vikingbrothers6c"},

      {oid:"oidlgt005313spellariumiv"},
      {oid:"oidlgt005314laruaville8"},
      {oid:"oidalaw005929heroesofhellasor"},
      {oid:"oidlgt005881cursedhouse7"},
      {oid:"oidmagn005284legendofincamys"},

      {oid:"oidawig005878detectiveagencymo"},
      {oid:"oid8flo0051541001jigsawearthc"},
      {oid:"oidawig005245rainbowmosaicsga"},
      {oid:"oidsmar005890wildernessmosaic"},
      {oid:"oidawig005301rainbowmosaics10"},

      {oid:"oidquma004863romanadventuresb"},
      {oid:"oidmagn005601heroesofromedam"},
      {oid:"bountytrain"},
      {oid:"oidfirs0060091812napoleonwars"},
      {oid:"oiddaed005617caravan"},

      {oid:"oidlone005748heroofthekingdom"},
      {oid:"oidlone005750heroofthekingdom"},
      {oid:"oidlone005749heroofthekingdom"},
      {oid:"oidplug005409dearestherlandma"},
      {oid:"oiddaed005678silence"},

      {oid:"nexway765473"},
      {oid:"nexway805818"},
      {oid:"oidplug006044metalslugx"},
      {oid:"nexway765566"},
      {oid:"nexway852162"},

      {oid:"oidplug006043zombiederby2"},
      {oid:"oidplug005849zombiederby"},
      {oid:"oidimma006073renzoracer"},
      {oid:"oidplug005772fiaeuropeantruck"},
      {oid:"nexway853544"},


      //https://products.wildtangent.com/products/v1.0/wildgames/us/en-us/oidbig005970mysteryoftheanci?output=json&scope=all


    ],
    promises = gamesArr.map((obj, i) => {
      const X = axios.get(`https://products.wildtangent.com/products/v1.0/wildgames/us/${lang}/${obj.oid}?output=json&scope=all`)
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
              //releaseDate = new Date(prod.releasedate.value.match(/\d+/)[0] * 1),
              game = {
                'oid':obj.oid,

                'productkey':prod.productkey,
                'title': prod.title,
                'i': i,
                'friendlyproductkey':prod.friendlyproductkey,
                //'fullWcPrice': obj.fullWcPrice,
                //'wildcoinspurchasecost': prod.wildcoinspurchasecost,
                'genre': genre,
                'bigIcon': `https://optimizedimages.wildtangent.com/${prod.productkey}/big_icon.png?h=160&w=160&auto=compress&cs=tinysrgb`,
                'featuredTile': `https://optimizedimages.wildtangent.com/${prod.productkey}/featured_tile.jpg?auto=compress&cs=tinysrgb`,
                //'purchasecost': prod.purchasecost.value.toFixed(2),
                //'fullPrice': obj.fullPrice,
                //'releasedate': releaseDate,
                 //'wcPrice': prod.wildcoinspurchasecost.value,
                 //'ranking': prod.ranking.mostpopularrating.rank

                 // 'fullPrice': prod.purchasecost.value.toFixed(2),
                 // 'fullWcPrice': prod.wildcoinspurchasecost.value,
              };
        return game;
      }).catch(error => { console.error(`An error occured ${error}`) });
    return X;
  });
    return Promise.all(promises)
    //sort by rank
    // .then(res => {
    //   return res.sort((a,b) => {
    //     return a.ranking - b.ranking;
    //   })
    // })
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
    this.getGames(this.props.lang);
  }

  sortGamesByGenre(games){
    let newArr = games.map(game => {
      return {genre:game.genre, games:[]}
    })
    .filter((thing, index, self) =>
      index === self.findIndex(t => (
        t.genre === thing.genre
      ))
    );

    games.forEach(game =>{
      newArr.forEach(item =>{
        if(item.genre === game.genre){
          item.games.push(game);
        }
      })
    })

    return newArr;
  }

  addDefaultSrc(e){
    let img = e.target;
    img.src = `https://optimizedimages.wildtangent.com/${img.dataset.oid}/big_icon.png?auto=format&dpr=1&cs=tinysrgb&fill=blur&crop=false&fit=fillmax&w=350&h=143&ixlib=react-7.2.0`;
    img.classList.remove('featuredTile');
    img.classList.add('bigIcon');
  }

  render(){
    return (
      <section className="genre-section ">
        {this.sortGamesByGenre(this.state.games).map(group => {
          let genre = group.genre.toLowerCase().replace(' ', '-');
            return (
              <div className={`${genre}`} key={genre}>
                <div className="container">
                  <div className="row">
                    <h2 className="col-xs-12 col-lg-12">{group.genre}</h2>
                    {group.games.map(game => {
                      return (
                             <div onClick={() => this.props.tileClick(game)}
                                 className={"wrapperElement col-xs-6 col-sm-6 col-md-5ths active"}
                                 data-event-action="Best-of-2019 Tile"
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
                              </p>
                              </div>
                            </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            )
        })}
      </section>
    );
  }
}
export default GameTile
