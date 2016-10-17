import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as numbersActions from '../actions/numbersActions';

class RowNumbers extends Component {
  componentDidMount(){
  // add a class to the element to make it animate in
  }
  componentWillUnmount(){
    // remove class to make it animate out
  }

  removeNumber(){
    this.props.dispatch(numbersActions.selectNumber(this.props.number))
  }

  render(){
    return(
      <div className={this.props.className} key={this.props.number}
           onClick={()=> this.removeNumber(this.props.number)}>
        <p>{this.props.number}</p>
      </div>
    )
  }
}

export default connect()(RowNumbers);
