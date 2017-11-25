import React, { Component } from 'react';
import { connect } from 'react-redux';

import GridView from '../components/GridView';

import { MORTAR_ID, TARGET_ID } from '../const';

class GridViews extends Component {
  render() {
    const { positions, message } = this.props;

    const mortarPosition = positions[MORTAR_ID];
    const targetPosition = positions[TARGET_ID];

    let mortarView = mortarPosition ?
      <GridView position={mortarPosition} /> : null
    ;

    let targetView = targetPosition ?
      <GridView isTarget position={targetPosition} /> : null
    ;

    return (
      <div>
        {mortarView}
        {targetView}
      </div>
    );
  }
}

export default connect(s => s)(GridViews);
