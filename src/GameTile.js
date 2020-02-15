import React, { useState, useEffect } from 'react';

//import React, { Component } from 'react';

import { polyfill } from 'es6-promise';
import axios from 'axios';
import './css/GameTile.scss';
import LinesEllipsis from 'react-lines-ellipsis';
import responsiveHOC from 'react-lines-ellipsis/lib/responsiveHOC';

const ResponsiveEllipsis = responsiveHOC()(LinesEllipsis)

polyfill();

const GameTile = (props) =>{

  const [games, setGames] = useState([]);

  const getGames = () => {
      let gamesArr = [
        //test oids
        //{oid:"tendaysunderthesea", fullPrice:	9.99, fullWcPrice:	40},
        // {oid:"thewitchsapprenticeamagicaalmish", fullPrice:	19.99, fullWcPrice:	40},
        // {oid:"oidbrav005277queensquest5ce", fullPrice:	19.99, fullWcPrice:	40},
        // {oid:"bigkahunawords", fullPrice:	19.99, fullWcPrice:	40},

        //OIDS GO HERE EXAMPLE: {oid:"oidimma006073renzoracer", fullPrice:	9.99, fullWcPrice:	40},

        {oid:"alchemeymysteriespraguelegends", fullPrice:	9.99, fullWcPrice:	20},
        {oid:"aliciaquatermain3ce", fullPrice:	14.99, fullWcPrice:	30},
        {oid:"aliciaquatermain3se", fullPrice:	9.99, fullWcPrice:	20},
        {oid:"aliciaquatermainandthesof", fullPrice:	9.99, fullWcPrice:	20},
        {oid:"aliciaquatermainandthesofse", fullPrice:	9.99, fullWcPrice:	20},
        {oid:"aliciaquatermainsotltce", fullPrice:	14.99, fullWcPrice:	30},
        {oid:"aliciaquatermainsotltse", fullPrice:	9.99, fullWcPrice:	20},
        {oid:"archimedeseurekace", fullPrice:	14.99, fullWcPrice:	30},
        {oid:"archimedeseurekase", fullPrice:	9.99, fullWcPrice:	20},
        {oid:"cursed", fullPrice:	9.99, fullWcPrice:	20},
        {oid:"draculaslegacy", fullPrice:	9.99, fullWcPrice:	20},
        {oid:"frankensteinmasterofdeath", fullPrice:	9.99, fullWcPrice:	20},
        {oid:"mazelord", fullPrice:	9.99, fullWcPrice:	20},
        {oid:"oidjetd004884mahjongstoriesvam", fullPrice:	9.99, fullWcPrice:	20},
        {oid:"oidjetd004886travelmosaics4ad", fullPrice:	9.99, fullWcPrice:	20},
        {oid:"oidjetd004887shoppingclutter", fullPrice:	9.99, fullWcPrice:	20},
        {oid:"oidjetd005028travelmosaics5w", fullPrice:	9.99, fullWcPrice:	20},
        {oid:"oidjetd00503112laboursofhercu", fullPrice:	14.99, fullWcPrice:	30},
        {oid:"oidjetd00503212laboursofhercu", fullPrice:	9.99, fullWcPrice:	20},
        {oid:"oidjetd005113travelmosaics6c", fullPrice:	9.99, fullWcPrice:	20},
        {oid:"oidjetd005116shoppingclutter2", fullPrice:	9.99, fullWcPrice:	20},
        {oid:"oidjetd005123kidsofhellasback", fullPrice:	14.99, fullWcPrice:	30},
        {oid:"oidjetd005237kensho", fullPrice:	4.99, fullWcPrice:	10},
        {oid:"oidjetd005496ecomagjong", fullPrice:	9.99, fullWcPrice:	20},
        {oid:"oidjetd005497travelmosaics7f", fullPrice:	9.99, fullWcPrice:	20},
        {oid:"oidjetd005650shoppingclutter3", fullPrice:	9.99, fullWcPrice:	20},
        {oid:"oidjetd005651travelmosaics8b", fullPrice:	9.99, fullWcPrice:	20},
        {oid:"oidjetd005665varenje", fullPrice:	4.99, fullWcPrice:	10},
        {oid:"oidjetd005810travelmosaics9m", fullPrice:	9.99, fullWcPrice:	20},
        {oid:"oidjetd005825aliciaquatermain4", fullPrice:	14.99, fullWcPrice:	60},
        {oid:"oidjetd005826aliciaquatermain4", fullPrice:	9.99, fullWcPrice:	40},
        {oid:"oidjetd00593512laboursofhercu", fullPrice:	9.99, fullWcPrice:	40},
        {oid:"oidjetd00593612laboursofhercu", fullPrice:	19.99, fullWcPrice:	80},
        {oid:"oidjetd005942travelmosaics10", fullPrice:	9.99, fullWcPrice:	40},
        {oid:"oidjetd006031shoppingclutter4", fullPrice:	9.99, fullWcPrice:	40},
        {oid:"oidjetd006112travelmosaics11", fullPrice:	9.99, fullWcPrice:	40},
        {oid:"oidjetd006115shoppingclutter5", fullPrice:	9.99, fullWcPrice:	20},
        {oid:"travelmosaics3tokyoanimated", fullPrice:	9.99, fullWcPrice:	20},
        {oid:"travelmosaicsromanholiday", fullPrice:	9.99, fullWcPrice:	20},
        {oid:"travelmosiacs", fullPrice:	9.99, fullWcPrice:	20},
        {oid:"twelvelaborsofhercules", fullPrice:	9.99, fullWcPrice:	20},
        {oid:"twelvelaborsofherculesii", fullPrice:	9.99, fullWcPrice:	20},
        {oid:"twelvelaboursofhercules3", fullPrice:	9.99, fullWcPrice:	20},
        {oid:"twelvelaboursofhercules4ce", fullPrice:	14.99, fullWcPrice:	30},
        {oid:"twelvelaboursofhercules5kidsce", fullPrice:	14.99, fullWcPrice:	30},
        {oid:"twelvelaboursofhercules6rfo", fullPrice:	14.99, fullWcPrice:	30},
        {oid:"twelvelaboursofhercules6rfoce", fullPrice:	14.99, fullWcPrice:	30},
        {oid:"twelvelaboursofhercules7", fullPrice:	9.99, fullWcPrice:	20},
        {oid:"twelvelaboursofhercules7se", fullPrice:	9.99, fullWcPrice:	20}
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

                   // 'fullPrice': prod.purchasecost.value.toFixed(2),
                   // 'fullWcPrice': prod.wildcoinspurchasecost.value,
                };
          return game;
        }).catch(error => { console.error(`An error occured ${error}`) });
      return X;
    });
      return Promise.all(promises)
      .then(results => {
        return results.sort((a, b ) => {
          return b.releasedate - a.releasedate;
        });
      })
      .then(res =>{
        setGames(res);
      });
  }

  const addDefaultSrc = (e) => {
    let img = e.target;
    img.src = `https://optimizedimages.wildtangent.com/${img.dataset.oid}/big_icon.png?auto=format&dpr=1&cs=tinysrgb&fill=blur&crop=false&fit=fillmax&w=350&h=143&ixlib=react-7.2.0`;
    img.classList.remove('featuredTile');
    img.classList.add('bigIcon');
  }

  useEffect(() => {
    getGames();
  },[]);

  return (
        <>
        { (games.length > 0 && props.showGames === true ) ? games.map(game => {
            return (
             (game.fullWcPrice != null && props.showPricesIn === 'wildcoins' ) || props.showPricesIn === 'cash' ? (
              <div onClick={() => props.tileClick(game)}
                 className={"wrapperElement col-xs-6 col-sm-6 col-md-4 col-lg-3 col-xl-3 active"}
                 data-event-action="Love-is-in-the-air-sale Tile"
                 data-event-category="Landing Page"
                 data-event-label={game.productkey}
                 key={game.i}
                 data-orderitemid={game.productkey}>
              <div className="innerWrapper">
              <div className="bigIconDiv">
                <img src={game.featuredTile} className="featuredTile" alt={game.title} onError={addDefaultSrc} data-oid={game.productkey} />
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

                { props.showPricesIn === 'cash' ? (
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
export default GameTile
