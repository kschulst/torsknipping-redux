import React, {Component} from 'react';
import {connect} from 'react-redux';
import NumberInstance from '../containers/NumberInstance';
import * as numbersActions from '../actions/numbersActions';

class NumbersList extends Component {
  constructor() {
    super();
    this.state = {
      clickedNumbers: []
    };
  }

  // Called when clicking on a number.
  // Checks number for uniqueness in the array, then adds, if array is not full (max 7).
  showNumber(number){
    //simplification of syntax
    let clickedNumbers = this.state.clickedNumbers;
    //
    if (clickedNumbers.indexOf(number) === -1 ){
      if (clickedNumbers.length === 7) {
        console.log('All 7 numbers selected. Not adding any more.');
      }
      else {
        clickedNumbers.push(number);
        clickedNumbers.sort((a,b) => {return a-b});
        this.props.dispatch(numbersActions.addNumber(this.state.clickedNumbers));
      }
    }
    else{
      console.log(number+' is already selected.');
    }
    console.log('You have selected: ' + clickedNumbers);
  }

  resetNumbers(){
    this.state.clickedNumbers = [];
    this.props.dispatch(numbersActions.addNumber(this.state.clickedNumbers));
    console.clear();
  }

  render(){
    // numbers array for creating all numbers elements.
    let numbers = [];
    //tell me what the store is.
    console.log('Store has: ' + this.props.numbers);
    // Generation of each clickable number
    for(let i = 1; i<=34; i++){
      let setSelected = this.state.clickedNumbers.indexOf(i)>=0 ? "pickednumber" : "";
      console.log(setSelected);
      let className = "text-center numberslist number-" + i + ' ' + setSelected;
      numbers.push(
        <NumberInstance
          number={i}
          key={i}
          className={className}
          clickedNumbers={this.state.clickedNumbers}
          showNumber={this.showNumber.bind(this,i)}
        />
      );
    }
    // DOM output
    return(
      <div>
        {numbers}
        <div>
          <button className="btn btn-lg btn-danger resetbutton" onClick={() => {this.resetNumbers(); console.log('You have no numbers selected');}}>Reset</button>
        </div>
      </div>
    );
  }
}
NumbersList.PropTypes = {
  number: React.PropTypes.number.isRequired,
  numbers: React.PropTypes.array.isRequired,
  key: React.PropTypes.number.isRequired,
  className: React.PropTypes.string.isRequired,
  clickedNumbers: React.PropTypes.array.isRequired,
  showNumber: React.PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps){
  return {
    numbers: state.numbers
  };
}

export default connect(mapStateToProps) (NumbersList);
