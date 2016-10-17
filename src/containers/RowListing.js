import React from 'react';
import RowNumbers from './RowNumbers';
import axios from 'axios';

const RowListing = React.createClass({
  getInitialState(){
    return {
      emailValid : false,
      text: ''
    }
  },

  handleChange(event) {
    let isValid = event.target.value.length >= 8 && event.target.value.includes('@');
    this.setState({
      text: event.target.value,
      emailValid: isValid
    });
  },

  postNumbers(){
    this.props.selectRow.length === 7
    ? this.state.emailValid === true
      ? axios({
        method: 'post',
        url: 'http://gratislotto-api.herokuapp.com/api/Tickets',
        data:{
          "rows":
            [
              this.props.selectRow
            ],
          "email": this.state.text
        }
      })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        })
      : console.log('Valid email, but not enough numbers.')
    : console.log('Not enough numbers')
  },

  render(){
    //selectedNumbers passed from store. Max 7 Numbers.
    const selectedNumbers = this.props.selectRow;
    const numberstyle = "text-center selectednumber";
    const validClass = "glyphicon glyphicon-remove-circle validate-mail red";
    const invalidClass = "glyphicon glyphicon glyphicon-ok-circle validate-mail green";

    const numbersRow = selectedNumbers.map((paragraph, i) =>
        <RowNumbers className={numberstyle} number={selectedNumbers[i]} key={i} />
      );


//       const numbersRow = []
//      for loop is redundant. Create a map function instead. for(let i = 1; i<=selectedNumbers.length; i++) {
//      const className = "text-center selectednumber number-" + i;
//      numbersRow.push(
//        <RowNumbers
//          className={className}
//          number={selectedNumbers[i - 1]}
//          key={i}
//        />
//      );



    //DOM output of array
    return(

      <div className="col-sm-12 text-center">
        <h2>Dine Tall</h2>
        {numbersRow}
        <input className="form-control mail-input" placeholder="Your e-mail address" onChange={this.handleChange} value={this.state.text} type="text"/>
        <div className={this.state.emailValid ? invalidClass : validClass}></div>
        <button className="btn btn-lg btn-success resetbutton" onClick={this.postNumbers}>Send Tall</button>
      </div>
    );
  }
});

RowListing.PropTypes = {
  className: React.PropTypes.string.isRequired,
  number: React.PropTypes.number.isRequired,
  key: React.PropTypes.number.isRequired
};

export default RowListing;
