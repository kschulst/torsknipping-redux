import React, {Component} from 'react';
import {connect} from 'react-redux';
import NumberInstance from '../containers/NumberInstance';
import * as numbersActions from '../actions/numbersActions';

class NumbersList extends Component {

  // Called when clicking on a number. Check numbersReducer.js
  selectNumber(number) {
    this.props.dispatch(numbersActions.selectNumber(number));
  }
  // Clears the selected numbers from the store.
  resetNumbers(){
    this.props.dispatch(numbersActions.resetNumbers());
    console.clear();
  }

  render(){
    //Tell me what the store is...
    //console.log('Store has: ' + this.props.numbers.selectedNumbers);

    // numbers array for creating all numbers elements.
    let numbers = [];

    // Generation of each clickable number
    for(let i = 1; i<=34; i++){
      let setSelected = this.props.numbers.selectedNumbers.indexOf(i)>=0 ? "pickednumber" : "";
      let className = "text-center numberslist number-" + i + ' ' + setSelected;
      numbers.push(
        <NumberInstance
          number={i}
          key={i}
          className={className}
          clickedNumbers={this.props.numbers}
          showNumber={this.selectNumber.bind(this,i)}
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
  numbers: React.PropTypes.shape({
    selectedNumbers: React.PropTypes.arrayOf(React.PropTypes.number)
  }).isRequired,
  selectNumber: React.PropTypes.func.isRequired,
  resetNumbers: React.PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps){
  return {
    numbers: state.numbers
  };
}

export default connect(mapStateToProps) (NumbersList);
