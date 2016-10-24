import React, { Component } from 'react';
import {connect} from 'react-redux';
import NumbersContainer from '../containers/NumbersContainer';
import '../styles/styles.css';
import ResetButton from '../components/ResetButton';
import SubmissionForm from '../components/SubmissionForm';
import AutoFill  from '../components/AutoFill';
import CouponFetch from '../components/CouponFetch';

class TippApp extends Component{

  render(){
    return(
      <div className="col-sm-12">
        <div className="col-sm-12">
          <NumbersContainer />
        </div>
        <div className="col-sm-12 jumbotron">
          <AutoFill />
          <ResetButton />
          <SubmissionForm />
          <CouponFetch/>
        </div>
      </div>
    );
  }
}

export default TippApp;
