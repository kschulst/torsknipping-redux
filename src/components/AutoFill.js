import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as numbersActions from '../actions/numbersActions';

const Chance = require('chance');
const chance = new Chance();

class AutoFill extends Component {
  constructor(props){
    super(props);
    this.preFill = this.preFill.bind(this);
  }

  preFill(){
    this.props.dispatch(numbersActions.resetNumbers());
    for(let i = 1; i <= 10; i++){
      let randomRow = chance.unique(chance.natural, 7, {min: 1, max: 34}).sort((a, b) => a - b);
      let rowName = 'row' + i;
      randomRow.map((num) => {this.props.dispatch(numbersActions.selectNumber(num, rowName));});
    }
  }

  render(){
    return(
      <div className="col-sm-12 text-center">
        <button className="btn btn-lg btn-success resetbutton" onClick={this.preFill}>Automagisk Utfylling</button>
      </div>
    );
  }
}

AutoFill.propTypes = {
  dispatch: React.PropTypes.func.isRequired
};

export default connect()(AutoFill);
