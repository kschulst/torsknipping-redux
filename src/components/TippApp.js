import React, { Component } from 'react';
import {connect} from 'react-redux';
import NumbersContainer from '../containers/NumbersContainer';
import '../styles/styles.css';
import ResetButton from '../components/ResetButton';
import SubmissionForm from '../components/SubmissionForm';
import AutoFill  from '../components/AutoFill';
import CouponFetch from '../components/CouponFetch';
import Head from '../containers/Head';
import ChartContainer from '../containers/ChartContainer';

class TippApp extends Component{

  render(){
    return(
      <div className="col-sm-12">
        <div className="lotterybg">
          <Head/>
          <NumbersContainer />
        </div>
        <div className="col-sm-12 jumbotron">
          <AutoFill />
          <ResetButton />
          <SubmissionForm />
          <CouponFetch />
        </div>
        <ChartContainer />
      </div>
    );
  }
}

export default TippApp;
