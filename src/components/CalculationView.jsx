import React, { Component } from 'react';

function valueString(value) {
  return value.toFixed(1);
}

function rangeString(range) {
  return `[min: ${range[0].toFixed(1)}, max: ${range[1].toFixed(1)}]`;
}

export default class CalculationView extends Component {
  render() {
    const { calculation } = this.props;

    return (
      <div>
        <div className="bearing">
          <span className="bearing-title">Bearing: </span>
          <span className="bearing-major">
            { valueString(calculation.bearing) + '\u00B0'}
          </span>
          <span className="bearing-minor">
            { rangeString(calculation.bearingRange) }
          </span>
        </div>
        <div className="elevation">
          <span className="bearing-title">Elevation: </span>
          <span className="elevation-major">
            { valueString(calculation.elevation) }
          </span>
          <span className="elevation-minor">
            { rangeString(calculation.elevationRange) }
          </span>
        </div>
        <div className="distance">
          <span className="distance-title">Distance: </span>
          <span className="distance-major">
            { valueString(calculation.distance) + 'm' }
          </span>
          <span className="distance-minor">
            { rangeString(calculation.distanceRange) }
          </span>
        </div>
      </div>
    );
  }
}

