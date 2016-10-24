import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as numbersActions from '../actions/numbersActions';

class ResetButton extends Component {
  constructor(props){
    super();
    this.resetNumbers = this.resetNumbers.bind(this);
  }

  // Clears the selected numbers from the store.
  resetNumbers(){
    this.props.dispatch(numbersActions.resetNumbers());
    console.clear();
    console.log('You have no numbers selected');
  }

  render(){
    // DOM output
    return(
      <div>
        <button className="btn btn-lg btn-danger resetbutton" onClick={this.resetNumbers}>Reset</button>
      </div>
    );
  }
}
ResetButton.propTypes = {
  dispatch: React.PropTypes.func.isRequired
};

export default connect()(ResetButton);
