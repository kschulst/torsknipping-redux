import React, {Component} from 'react';

class NumberInstance extends Component {
  render(){
    return(
      <div className={this.props.className} key={this.props.number}
           onClick={()=> this.props.showNumber(this.props.number)}>
        <div className="numbercircle"></div>
        <p>{this.props.number}</p>
        <div className={this.props.crossed}></div>
      </div>
    );
  }
}

NumberInstance.propTypes = {
  className: React.PropTypes.string,
  crossed: React.PropTypes.string.isRequired,
  number: React.PropTypes.number.isRequired,
  showNumber: React.PropTypes.func.isRequired
};

export default NumberInstance;
