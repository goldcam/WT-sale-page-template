import React, { Component } from 'react';
import './css/ToggleMenu.scss';

class ToggleManu extends Component {

  render(){
    //console.log(this.props.showPricesIn);
    return (
      <div id="ToggleMenu" >
      <span className="toggle-pretext">Show price in:</span>
      <div className="btn-group btn-group-toggle " data-toggle="buttons">
        <label className={`btn btn-primary cash ${this.props.showPricesIn === 'cash' ? 'active' : ''}`}
               data-price='cash'
               onClick={this.props.changepricesDisplay}>
          <input type="radio"
                 name="options"
                 id="option1"
                 data-price="cash"
                 autoComplete="off"
                 defaultChecked={this.props.showPricesIn === 'cash' ? true : false}
                 /> Cash
        </label>
        <label className={`btn btn-primary wc-icon ${this.props.showPricesIn === 'wildcoins' ? 'active' : ''}`}
               data-price='wildcoins'
               onClick={this.props.changepricesDisplay}>
          <input type="radio"
                 name="options"
                 id="option2"
                 data-price="wildcoins"
                 defaultChecked={this.props.showPricesIn === 'wildcoins' ? true : false}
                 autoComplete="off" /> Wildcoins
        </label>
      </div>
    </div>

    );
  }
}

export default ToggleManu
