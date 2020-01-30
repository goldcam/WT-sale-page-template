import React from 'react';
import './css/ToggleMenu.scss';

const ToggleMenu = (props) =>{
  return(
    <div id="ToggleMenu" >
    <span className="toggle-pretext">Show price in:</span>
    <div className="btn-group btn-group-toggle " data-toggle="buttons">
      <label className={`btn btn-primary cash ${props.showPricesIn === 'cash' ? 'active' : ''}`}
             data-price='cash'
             onClick={props.changepricesDisplay}>
        <input type="radio"
               name="options"
               id="option1"
               data-price="cash"
               autoComplete="off"
               defaultChecked={props.showPricesIn === 'cash' ? true : false}
               /> Cash
      </label>
      <label className={`btn btn-primary wc-icon ${props.showPricesIn === 'wildcoins' ? 'active' : ''}`}
             data-price='wildcoins'
             onClick={props.changepricesDisplay}>
        <input type="radio"
               name="options"
               id="option2"
               data-price="wildcoins"
               defaultChecked={props.showPricesIn === 'wildcoins' ? true : false}
               autoComplete="off" /> Wildcoins
      </label>
    </div>
  </div>
  );
}

export default ToggleMenu
