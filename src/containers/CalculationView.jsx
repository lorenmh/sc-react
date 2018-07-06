import React, { Component } from 'react';
import { connect } from 'react-redux';

import GameToggle from './GameToggle';
import TypeToggle from './TypeToggle';

import { Calculation, Rocket } from '../models';

import {
  TOO_FAR,
  TOO_CLOSE,
  MORTAR_ID,
  TARGET_ID,
  ROCKET,
} from '../const';

function valueString(value, isRocket) {
  if (isRocket) return value.toFixed(0);
  return value.toFixed(1);
}

function rangeString(calculation, range, isTaps) {
  if (calculation.isCollision) {
    return 'HIGH ERROR!';
  }

  if (isTaps) {
    return `[min: ${range[1].toFixed(0)}, max: ${range[0].toFixed(0)}]`;
  }

  return `[min: ${range[0].toFixed(1)}, max: ${range[1].toFixed(1)}]`;
}

class CalculationView extends Component {
  render() {
    const { values, positions, meta } = this.props;

    const { type } = meta;

    const isRocket = type === ROCKET;

    const mortarPosition = positions[MORTAR_ID];
    const targetPosition = positions[TARGET_ID];

    const artyName = isRocket ? 'Rocket' : 'Mortar';

    if (!mortarPosition || !targetPosition) {
      return (
        <div className="calculation-wrap">
          <GameToggle />
          <TypeToggle />
          <div className="calculation-empty-msg-wrap">
            <div className="calculation-empty-msg">
              No calculation! To get a calculation,<br/>
              {`Enter a 🚀 ${artyName} and 🎯 Target position below.`}
            </div>
          </div>
        </div>
      );
    }

    let delta = (+values.add) - (+values.sub),
      calculation,
      elevation
    ;

    calculation = Calculation.fromPositions(
      mortarPosition, targetPosition, delta, isRocket
    );

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
    } else if (isRocket) {
      elevation = (
        <div className="elevation">
          <span className="bearing-title">W-Taps: </span>
          <span className="elevation-major">
            { valueString(calculation.elevation, true) }
          </span>
          <span className="elevation-minor">
            { rangeString(calculation, calculation.elevationRange, true) }
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
        <GameToggle />
        <TypeToggle />
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
