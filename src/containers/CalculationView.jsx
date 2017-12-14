import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Calculation } from '../models';

import {
  TOO_FAR,
  TOO_CLOSE,
  MORTAR_ID,
  TARGET_ID
} from '../const';

function valueString(value) {
  return value.toFixed(1);
}

function rangeString(calculation, range) {
  if (calculation.isCollision) {
    return 'HIGH ERROR!';
  }
  return `[min: ${range[0].toFixed(1)}, max: ${range[1].toFixed(1)}]`;
}

class CalculationView extends Component {
  render() {
    const { values, positions } = this.props;

    const mortarPosition = positions[MORTAR_ID];
    const targetPosition = positions[TARGET_ID];

    if (!mortarPosition || !targetPosition) {
      return (
        <div className="calculation-wrap">
          <div className="calculation-empty-msg-wrap">
            <div className="calculation-empty-msg">
              No calculation! To get a calculation,<br/>
              Enter a 🚀 Mortar and 🎯 Target position below.
            </div>
          </div>
        </div>
      );
    }

    let delta = (+values.add) - (+values.sub),
      calculation = Calculation.fromPositions(
        mortarPosition, targetPosition, delta
      ),
      elevation
    ;

    if (calculation.elevation === TOO_FAR) {
      elevation = (
        <div className="elevation">
          <span className="bearing-title">Elevation: </span>
          <span className="elevation-major">
            TOO FAR!
          </span>
        </div>
      );
    } else if (calculation.elevation === TOO_CLOSE) {
      elevation = (
        <div className="elevation">
          <span className="bearing-title">Elevation: </span>
          <span className="elevation-major">
            TOO CLOSE!
          </span>
        </div>
      );
    } else {
      elevation = (
        <div className="elevation">
          <span className="bearing-title">Elevation: </span>
          <span className="elevation-major">
            { valueString(calculation.elevation) }
          </span>
          <span className="elevation-minor">
            { rangeString(calculation, calculation.elevationRange) }
          </span>
        </div>
      );
    }

    return (
      <div className="calculation-wrap">
        <div className="calculation">
          <div className="bearing">
            <span className="bearing-title">Bearing: </span>
            <span className="bearing-major">
              { valueString(calculation.bearing) + '°' }
            </span>
            <span className="bearing-minor">
              { rangeString(calculation, calculation.bearingRange) }
            </span>
          </div>
          { elevation }
          <div className="distance">
            <span className="distance-title">Distance: </span>
            <span className="distance-major">
              { valueString(calculation.distance) + 'm' }
            </span>
            <span className="distance-minor">
              { rangeString(calculation, calculation.distanceRange) }
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(s => s)(CalculationView);
