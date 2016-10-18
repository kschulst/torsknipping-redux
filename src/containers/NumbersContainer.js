import React, { Component } from 'react';
import NumbersList from '../components/NumbersList';
import ResetButton from '../components/ResetButton';

class NumbersContainer extends Component{
  render(){
    return(
      <div className="jumbotron col-sm-12">
        <div>
          <NumbersList rowNumber={0} />
          <NumbersList rowNumber={1} />
          <NumbersList rowNumber={2} />
          <NumbersList rowNumber={3} />
          <NumbersList rowNumber={4} />
          <NumbersList rowNumber={5} />
          <NumbersList rowNumber={6} />
          <NumbersList rowNumber={7} />
          <NumbersList rowNumber={8} />
          <NumbersList rowNumber={9} />
          <ResetButton />
        </div>
      </div>

    );
  }
}

export default NumbersContainer;
