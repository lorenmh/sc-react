import React, { Component } from 'react';
import { connect } from 'react-redux';

import { GridView, GridViewZoomed } from '../components/GridView';
import CalculationView from '../components/CalculationView';

import { MORTAR_ID, TARGET_ID } from '../const';
import { Calculation } from '../objects';

class Output extends Component {
  render() {
    const { positions, message } = this.props;

    const mortarPosition = positions[MORTAR_ID];
    const targetPosition = positions[TARGET_ID];

    let mortarView = mortarPosition ? (
      <div>
        <GridView position={mortarPosition} />
        <GridViewZoomed position={mortarPosition} />
      </div>
    ) : null;

    let targetView = targetPosition ?
      <GridView isTarget position={targetPosition} /> : null
    ;

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
        {mortarView}
        {targetView}
        {calculationView}
      </div>
    );
  }
}

export default connect(s => s)(Output);
