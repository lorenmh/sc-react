import React, { Component } from 'react';
import { connect } from 'react-redux';

import { GridView } from './GridView';
import CalculationView from '../components/CalculationView';

import { Calculation } from '../models';

import {  MORTAR_ID,
  TARGET_ID
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

    console.log(calculation);

    return (
      <div>
        {calculationView}
      </div>
    );
  }
}

export default connect(s => s)(Output);
