import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as numbersActions from '../actions/numbersActions';

class ResetButton extends Component {
  // Clears the selected numbers from the store.
  resetNumbers(){
    this.props.dispatch(numbersActions.resetNumbers());
    console.clear();
  }

  render(){
    // DOM output
    return(
      <div>
        <button className="btn btn-lg btn-danger resetbutton" onClick={() => {this.resetNumbers(); console.log('You have no numbers selected');}}>Reset</button>
      </div>
    );
  }
}
ResetButton.PropTypes = {
};


export default connect()(ResetButton);
