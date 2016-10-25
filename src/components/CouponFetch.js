import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import * as numbersActions from '../actions/numbersActions';
import Checkit from 'checkit';

class CouponFetch extends Component {
  constructor(props){
    super(props);
    this.onFetch = this.onFetch.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.checkAlert = this.checkAlert.bind(this);
    this.state = {
      emailValid : false,
      text: '',
      alert: ''
    };
  }

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
  }

  checkAlert(text){
    this.setState({
      alert: text
    });
  }

  onFetch() {
    this.checkAlert('Hold an litt mens vi graver i arkivet...');
    this.state.emailValid
      ?
        axios({
          method: 'get',
          url: `https://gratislotto-api.herokuapp.com/api/Tickets?filter[where][email]=${this.state.text}`
        })
          .then((response) => {
            console.log(response);
            delete response.data[0].id;
            delete response.data[0].registeredTimestamp;
            this.props.dispatch(numbersActions.resetNumbers());
            this.props.dispatch(numbersActions.fillNumbers(response.data[0]));
            this.checkAlert('Hværsågod! Tallene er på plass. Antagelig de samme som du lagret.');
          })
          .catch((error) => {
            this.checkAlert(`Oooha! Ohha! Kjempetryn! Datakræsj og ruskete kode! Dette skjedde: ${error}`);
          })
      : this.checkAlert('Nåja. Må være litt nøyere med epost addressa.');
  }

  render(){
    const validClass = "glyphicon glyphicon-remove-circle validate-mail red";
    const invalidClass = "glyphicon glyphicon glyphicon-ok-circle validate-mail green";
    return(
      <div className="col-sm-12 text-center">
        <h3>Hent tidligere innsendte tall.</h3>
        <input className="form-control mail-input half"  placeholder="Epost addresse å hente nippetukong for." onChange={this.handleChange} value={this.state.text} type="text"/>
        <div className={this.state.emailValid ? invalidClass : validClass}></div>
        <button className="btn btn-lg btn-success resetbutton small_submit" onClick={this.onFetch}>Hent Nippetukongen Din</button>
        <div>{this.state.alert}</div>
      </div>
    );
  }
}

CouponFetch.propTypes = {
  dispatch: React.PropTypes.func.isRequired
};

export default connect()(CouponFetch);
