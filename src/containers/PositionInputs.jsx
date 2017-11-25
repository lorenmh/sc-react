import React, { Component } from 'react';
import { connect } from 'react-redux';

import { MORTAR_ID, TARGET_ID } from '../const';
import { updatePositionFromString } from '../actions';

class PositionInput extends Component {
  render() {
    const { placeholder, isTarget, inputHandler } = this.props;

    const subClass = isTarget ? 'target' : 'mortar';

    return (
      <input
        className={`position-input position-input-${subClass}`}
        placeholder={placeholder}
        onInput={inputHandler}
      />
    );
  }
}

class PositionInputs extends Component {
  render() {
    const {
      placeholder,
      dispatch
    } = this.props;

    let inputHandler = positionId => (e) => {
      dispatch(
        updatePositionFromString(
          positionId,
          e.target.value
        )
      );
    };

    return (
      <div>
        <PositionInput
          subClass="mortar"
          placeholder="Mortar: (ex: A11 11)"
          inputHandler={inputHandler(MORTAR_ID)}
        />
        <PositionInput
          subClass="mortar"
          placeholder="Target: (ex: B11 11)"
          inputHandler={inputHandler(TARGET_ID)}
          isTarget
        />
      </div>
    );
  }
}

export default connect(s => s)(PositionInputs);
