import React, { Component } from 'react';
import { connect } from 'react-redux';


import {
} from '../const';

class Output extends Component {
  render() {
    const { positions, message } = this.props;

    const mortarPosition = positions[MORTAR_ID];
    const targetPosition = positions[TARGET_ID];

    let calculation;

    if (mortarPosition && targetPosition) {
      calculation = Calculation.fromPositions(mortarPosition, targetPosition);
    }

    let calculationView = calculation ?
      <CalculationView calculation={calculation} /> : null
    ;

    return (
      <div>
        {calculationView}
      </div>
    );
  }
}

export default connect(s => s)(Output);
