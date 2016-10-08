import React, { Component } from 'react';
import NumbersList from '../components/NumbersList';

class NumbersContainer extends Component{
  render(){
    return(
      <div className="jumbotron col-sm-12">
        <NumbersList />
      </div>

    )
  }
}

export default NumbersContainer;
