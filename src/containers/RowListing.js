import React, {Component} from 'react';
import RowNumbers from './RowNumbers';

class RowListing extends Component {
  render(){
    //selectedNumbers passed from store. Max 7 Numbers.
    const selectedNumbers = this.props.selectRow;
    const numbersRow = [];
    for(let i = 1; i<=selectedNumbers.length; i++) {
      const className = "text-center selectednumber number-" + i;
      numbersRow.push(
        <RowNumbers
          className={className}
          number={selectedNumbers[i - 1]}
          key={i}
        />
      );
    }

    //DOM output of array
    return(

      <div className="col-sm-12 text-center">
        <h2>Dine Tall</h2>
        {numbersRow}
        <button className="btn btn-lg btn-success resetbutton">Send Tall</button>
      </div>
    );
  }
}

RowListing.PropTypes = {
  className: React.PropTypes.string.isRequired,
  number: React.PropTypes.number.isRequired,
  key: React.PropTypes.number.isRequired
};

export default RowListing;
