import React, {Component} from 'react';
import {connect} from 'react-redux';
import NumberInstance from '../containers/NumberInstance';
import * as numbersActions from '../actions/numbersActions';

class NumbersList extends Component {
  constructor(){
    super();
    this.selectNumber = this.selectNumber.bind(this);
  }

  // Called when clicking on a number. Check numbersReducer.js
  selectNumber(number) {
    let arrayNumber = 'row' + this.props.rowNumber;
    this.props.dispatch(numbersActions.selectNumber(number, arrayNumber));
  }

  render(){
    // numbers array for creating all numbers elements.
    let numbers = [];
    let rekke = this.props.rowNumber;
    let arrayNumber = 'row' + this.props.rowNumber;
    let rownumber =  this.props.numbers[arrayNumber].length === 7 ? "rownumber complete" : "rownumber";
    for(let i = 1; i<=34; i++){
      let setSelected = this.props.numbers[arrayNumber].indexOf(i)>=0 ? "pickednumber" : "";
      let className = "text-center numberslist number-" + i + ' ' + setSelected;
      let crossed = "glyphicon glyphicon-remove crossed " + setSelected;
      numbers.push(
          <NumberInstance
            number={i}
            key={i}
            className={className}
            crossed={crossed}
            clickedNumbers={this.props.numbers}
            showNumber={this.selectNumber}
          />
      );
    }

    // DOM output
    return(
        <div className="rowbox">
          {numbers}
          <div className={rownumber}>{rekke}</div>
        </div>
    );
  }
}

NumbersList.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  numbers: React.PropTypes.object.isRequired,
  rowNumber: React.PropTypes.number
};

function mapStateToProps(state, ownProps){
  return {
    numbers: state.numbers
  };
}

export default connect(mapStateToProps) (NumbersList);
