import React, { Component } from 'react';
import {connect} from 'react-redux';
import NumbersContainer from '../containers/NumbersContainer';
import '../styles/styles.css';
import ResetButton from '../components/ResetButton';
import SubmissionForm from '../components/SubmissionForm';
import AutoFill  from '../components/AutoFill';
import CouponFetch from '../components/CouponFetch';
import Head from '../containers/Head';

class TippApp extends Component{

  render(){
    return(
      <div className="col-sm-12">
        <div className="lottyerbg">
          <Head/>
          <NumbersContainer />
        </div>
        <div className="col-sm-12 jumbotron">
          <AutoFill />
          <ResetButton />
          <SubmissionForm />
          <CouponFetch/>
        </div>
        <div className="col-sm-12 jumbotron">

        </div>
      </div>
    );
  }
}

export default TippApp;
