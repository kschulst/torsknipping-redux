import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import Checkit from 'checkit';

const Chance = require('chance');
const chance = new Chance();

const SubmissionForm = React.createClass({
  propTypes: {
    numbers: React.PropTypes.objectOf(React.PropTypes.array).isRequired,
    className: React.PropTypes.string
  },

  getInitialState(){
    return {
      emailValid : false,
      text: '',
      alert: "",
      incomplete: ''
    };
  },

  handleChange(event) {
    let isValid = false;
    let model = {
      email: event.target.value
    };

    const modelChecks = new Checkit({
      email: ['required', 'email']
    });

    let [checkitErr, res] = modelChecks.validateSync(model);
    if(res){
      isValid = true;
      this.checkAlert('');
    }
    if (checkitErr) {
      isValid = false;
      this.checkAlert('Grønn hake til høyre når emailen din er riktig formatert.');
    }

    this.setState({
      text: event.target.value,
      emailValid: isValid
    });
  },

  postNumbers(){
    this.checkAlert('Sender tall. Det jobbes på spreng. Vent litt...');

    //Validate rows and enter array.
    const validRows = [];
    const incompleteRows = [];
    for(let i = 0; i <= 9; i++) {
      let rowname = 'row' + i;
      this.props.numbers[rowname].length === 7
      ? (validRows.push(
        this.props.numbers[rowname]
      ))
      : this.props.numbers[rowname].length > 0 && incompleteRows.push(i+1);
    }
    // for first valid row and submit if valid email as well.
    incompleteRows.length > 0
      ? this.setState({
          incomplete: 'Rekke ' + incompleteRows + ' er ikke komplett med syv tall. Det liksom det som er vitsen.'
      })
      : this.setState({
          incomplete: ''
      });

    //pass numbers to a variable. OBS! This is not pretty.
    let passNumbers = [];
    for(let i=0; i <= 9; i++){
      let rowname = 'row' + i;
      passNumbers.push(this.props.numbers[rowname]);
    }

    // Check validity and initiate post.
    validRows.length >= 1
        ? this.state.emailValid === true
          ? axios({
          method: 'post',
          url: 'http://gratislotto-api.herokuapp.com/api/Tickets',
          data:{
            "rows":
              passNumbers
            ,
            "email": this.state.text
          }
          })
          .then((response) => {
            this.checkAlert('Der var talla lagret. Lykke til.');
            console.log(response.statusText);
          })
          .catch((error) => {
            this.checkAlert('Jøye meg! Her gikk det skikkelig skeis. Prøv igjen.');
            console.log(error);
          })
          : this.checkAlert('Manger en e-post addresse. Kommer ikke langt uten nå til dags.')
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
        <input className="form-control mail-input" placeholder="Fyll inn epost addressa di. Det er påkrevd." onChange={this.handleChange} value={this.state.text} type="text"/>
        <div className={this.state.emailValid ? invalidClass : validClass}></div>
        <div>{this.state.alert}</div>
        <div>{this.state.incomplete}</div>
        <button className="btn btn-lg btn-success resetbutton" onClick={this.postNumbers}>Send Inn Nippetukong</button>
      </div>
    );
  }
});

function mapStateToProps(state, ownProps){
  return {
    numbers: state.numbers
  };
}

export default connect(mapStateToProps)(SubmissionForm);
