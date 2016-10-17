import React, { Component } from 'react';
import {connect} from 'react-redux';
import RowListing from './RowListing';

class RowContainer extends Component{

  render(){
    console.log('Passing ' + this.props.numbers + ' to update selected list');
    return(
      <div className="jumbotron col-sm-12">
        <RowListing selectRow={this.props.numbers}/>
      </div>

    );
  }
}

RowContainer.PropTypes = {
  numbers: React.PropTypes.array.isRequied
};

function mapStateToProps(state, ownProps){
  return {
    numbers: state.numbers.selectedNumbers
  };
}

export default connect(mapStateToProps)(RowContainer);
