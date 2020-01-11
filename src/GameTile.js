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

        {oid:"chroniclesofthewitcheswarlocks","fullPrice":"9.99","fullWcPrice":20},
        {oid:"craftingstory","fullPrice":"4.99","fullWcPrice":10},
        {oid:"detectiveofspiritworld","fullPrice":"9.99","fullWcPrice":20},
        {oid:"detectiveriddlessherlock","fullPrice":"9.99","fullWcPrice":20},
        {oid:"detectiveriddlessherlock2","fullPrice":"9.99","fullWcPrice":20},
        {oid:"katyandbob","fullPrice":"9.99","fullWcPrice":20},
        {oid:"katyandbobcakecafese","fullPrice":"9.99","fullWcPrice":40},
        {oid:"katyandbobsafaricafese","fullPrice":"9.99","fullWcPrice":20},
        {oid:"katybobcakecafece","fullPrice":"19.99","fullWcPrice":40},
        {oid:"katybobsafaricafe","fullPrice":"19.99","fullWcPrice":40},
        {oid:"knightsolitaire","fullPrice":"9.99","fullWcPrice":20},
        {oid:"knightsolitaire2","fullPrice":"9.99","fullWcPrice":20},
        {oid:"lostartifactsaztecgoldce","fullPrice":"19.99","fullWcPrice":40},
        {oid:"lostartifactsgoldenisland","fullPrice":"19.99","fullWcPrice":40},
        {oid:"lostartifactsgoldenislandse","fullPrice":"9.99","fullWcPrice":20},
        {oid:"lostartifactssoulstone","fullPrice":"19.99","fullWcPrice":40},
        {oid:"lostartifactssoulstonese","fullPrice":"9.99","fullWcPrice":20},
        {oid:"mahjongbusinessstyle","fullPrice":"9.99","fullWcPrice":20},
        {oid:"mahjongcarnaval2","fullPrice":"9.99","fullWcPrice":20},
        {oid:"mahjongchristmas2","fullPrice":"9.99","fullWcPrice":20},
        {oid:"mahjonggold2pirateisland","fullPrice":"9.99","fullWcPrice":20},
        {oid:"mahjongmagicjourney2","fullPrice":"9.99","fullWcPrice":20},
        {oid:"mahjongmagicjourney3","fullPrice":"9.99","fullWcPrice":20},
        {oid:"mahjongroyaltowers","fullPrice":"9.99","fullWcPrice":20},
        {oid:"mahjongworldcontest","fullPrice":"9.99","fullWcPrice":20},
        {oid:"mysteriesoftheundead","fullPrice":"9.99","fullWcPrice":20},
        {oid:"mysterysolitairearkhamsspirits","fullPrice":"9.99","fullWcPrice":20},
        {oid:"mysterysolitairegrimmstales","fullPrice":"9.99","fullWcPrice":40},
        {oid:"mysterysolitairetheblackraven","fullPrice":"9.99","fullWcPrice":20},
        {oid:"oid8flo004889mosaicsgaloreglor","fullPrice":"9.99","fullWcPrice":40},
        {oid:"oid8flo0048911001jigsawearthc","fullPrice":"9.99","fullWcPrice":40},
        {oid:"oid8flo004971lostartifactstime","fullPrice":"19.99","fullWcPrice":80},
        {oid:"oid8flo004972lostartifactstime","fullPrice":"9.99","fullWcPrice":40},
        {oid:"oid8flo005027solitairelegendof","fullPrice":"9.99","fullWcPrice":40},
        {oid:"oid8flo005041fairytalemosaics","fullPrice":"9.99","fullWcPrice":40},
        {oid:"oid8flo005042picrossbonbonnon","fullPrice":"9.99","fullWcPrice":40},
        {oid:"oid8flo005072fillandcrosstri","fullPrice":"9.99","fullWcPrice":40},
        {oid:"oid8flo005073holidayjigsawhall","fullPrice":"9.99","fullWcPrice":40},
        {oid:"oid8flo005121daydthroughtimec","fullPrice":"19.99","fullWcPrice":80},
        {oid:"oid8flo0051261001jigsawworldt","fullPrice":"9.99","fullWcPrice":40},
        {oid:"oid8flo0051541001jigsawearthc","fullPrice":"9.99","fullWcPrice":40},
        {oid:"oid8flo005199mahjongworldconte","fullPrice":"9.99","fullWcPrice":40},
        {oid:"oid8flo005273picrosshanseland","fullPrice":"9.99","fullWcPrice":40},
        {oid:"oid8flo005275alicesjigsawtime","fullPrice":"9.99","fullWcPrice":40},
        {oid:"oid8flo005292daydtroughtimese","fullPrice":"9.99","fullWcPrice":40},
        {oid:"oid8flo005293cookingtripce","fullPrice":"14.99","fullWcPrice":60},
        {oid:"oid8flo005294cookingtripse","fullPrice":"9.99","fullWcPrice":40},
        {oid:"oid8flo005300solitairebeachsea","fullPrice":"9.99","fullWcPrice":40},
        {oid:"oid8flo005406royalroadsce","fullPrice":"19.99","fullWcPrice":80},
        {oid:"oid8flo005407royalroadsse","fullPrice":"9.99","fullWcPrice":40},
        {oid:"oid8flo005507solitairelegendof","fullPrice":"9.99","fullWcPrice":40},
        {oid:"oid8flo005508detectivesolitaire","fullPrice":"9.99","fullWcPrice":40},
        {oid:"oid8flo005524mysterysolitairec","fullPrice":"9.99","fullWcPrice":40},
        {oid:"oid8flo005538strikesolitaire","fullPrice":"9.99","fullWcPrice":40},
        {oid:"oid8flo005539alicesjigsawwonde","fullPrice":"9.99","fullWcPrice":40},
        {oid:"oid8flo005712redridinghoodsol","fullPrice":"9.99","fullWcPrice":40},
        {oid:"oid8flo0057151001jigsawsixmag","fullPrice":"9.99","fullWcPrice":40},
        {oid:"oid8flo0057391001jigsawlegends","fullPrice":"9.99","fullWcPrice":40},
        {oid:"oid8flo005746cookingtripback","fullPrice":"9.99","fullWcPrice":40},
        {oid:"oid8flo005747cookingtripback","fullPrice":"19.99","fullWcPrice":80},
        {oid:"oid8flo0058801001jigsawworldt","fullPrice":"9.99","fullWcPrice":40},
        {oid:"oid8flo005882lostartifactsfro","fullPrice":"9.99","fullWcPrice":20},
        {oid:"oid8flo005883lostartifactsfro","fullPrice":"14.99","fullWcPrice":45},
        {oid:"oid8flo005885mysterysolitaire","fullPrice":"9.99","fullWcPrice":40},
        {oid:"oid8flo005926crownoftheempire","fullPrice":"14.99","fullWcPrice":60},
        {oid:"oid8flo005960detectivesolitaire","fullPrice":"9.99","fullWcPrice":20},
        {oid:"oid8flo0061321001jigsawmyths","fullPrice":"9.99","fullWcPrice":40},
        {oid:"onethousandonejigsawearth4","fullPrice":"9.99","fullWcPrice":20}
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
               data-event-action="8Floor-flash-sale Tile"
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
