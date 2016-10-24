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
    this.checkAlert('Gatheing info...');
    axios({
      method: 'get',
      url: `https://gratislotto-api.herokuapp.com/api/Tickets?filter[where][email]=${this.state.text}`
    })
      .then((response) => {
        this.props.dispatch(numbersActions.resetNumbers());
        for(let i = 0; i <= (response.data[0].rows.length-1); i++){
          let randomRow = response.data[0].rows[i];
          let rowName = 'row' + i;
          randomRow.map((num) => {this.props.dispatch(numbersActions.selectNumber(num, rowName));});
        }
        this.checkAlert('Hværsågod! Tallene er på plass.');
      })
      .catch((error) => {
        this.checkAlert(`Oooha! Ohha! Kjempetryn! Datakræsj og ruskete kode! Dette skjedde: ${error}`);
      });
  }

  render(){
    const validClass = "glyphicon glyphicon-remove-circle validate-mail red";
    const invalidClass = "glyphicon glyphicon glyphicon-ok-circle validate-mail green";
    return(
      <div className="col-sm-12 text-center">
        <h3>Hent tidligere innsendte tall.</h3>
        <input className="form-control mail-input half"  placeholder="Your e-mail address" onChange={this.handleChange} value={this.state.text} type="text"/>
        <div className={this.state.emailValid ? invalidClass : validClass}></div>
        <button className="btn btn-lg btn-success resetbutton small_submit" onClick={this.onFetch}>Apport!</button>
        <div>{this.state.alert}</div>
      </div>
    );
  }
}

CouponFetch.propTypes = {
  dispatch: React.PropTypes.func.isRequired
};

export default connect()(CouponFetch);
