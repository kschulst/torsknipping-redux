import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';

const SubmissionForm = React.createClass({
  getInitialState(){
    return {
      emailValid : false,
      text: '',
      alert: "",
    };
  },

  handleChange(event) {
    let isValid = event.target.value.length >= 8 && event.target.value.includes('@');
    this.setState({
      text: event.target.value,
      emailValid: isValid,
      alert: ""
    });
  },

  postNumbers(){
    //Validate rows and enter array.
    const validRows = [];
    for(let i = 0; i< 9; i++) {
      let rowname = 'row' + i;
      this.props.numbers[rowname].length === 7 && (validRows.push(
        this.props.numbers[rowname]
      ));
    }

    // for first valid row and submit if valid email as well.
    validRows.length >= 1 &&
      validRows[0].length === 7
        ? this.state.emailValid === true
          ? axios({
          method: 'post',
          url: 'http://gratislotto-api.herokuapp.com/api/Tickets',
          data:{
            "rows": validRows ,
            "email": this.state.text
          }
          })
          .then((response) => {
            this.checkAlert('Der var talla lagret. Lykke til.');
            console.log(response);
          })
          .catch((error) => {
            this.checkAlert('Jøye meg! Her gikk det skikkelig skeis. Prøv igjen.');
            console.log('Oh, man! '+ error);
          })
          : this.checkAlert('Fine tall. Veldig synd med den e-post adressa. You fix?')
        : this.checkAlert('Ekke nok tall, da vettu. Sju stykker må til.');

  },

  checkAlert(text){
    this.setState({
      alert: text
    });
  },

  render(){
    const validClass = "glyphicon glyphicon-remove-circle validate-mail red";
    const invalidClass = "glyphicon glyphicon glyphicon-ok-circle validate-mail green";

    //DOM output of array
    return(
      <div className="col-sm-12 text-center">
        <input className="form-control mail-input" placeholder="Your e-mail address" onChange={this.handleChange} value={this.state.text} type="text"/>
        <div className={this.state.emailValid ? invalidClass : validClass}></div>
        <div>{this.state.alert}</div>
        <button className="btn btn-lg btn-success resetbutton" onClick={this.postNumbers}>Send Tall</button>
      </div>
    );
  }
});

SubmissionForm.propTypes = {
  numbers: React.PropTypes.object.isRequired,
  className: React.PropTypes.string
};

function mapStateToProps(state, ownProps){
  return {
    numbers: state.numbers
  };
}

export default connect(mapStateToProps)(SubmissionForm);
