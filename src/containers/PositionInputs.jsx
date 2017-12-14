import React, { Component } from 'react';
import { connect } from 'react-redux';

import { MORTAR_ID, TARGET_ID } from '../const';

import {
  updatePositionValue,
  savePosition
} from '../actions';

class PositionInput extends Component {
  render() {
    const {
      placeholder,
      subClass,
      value,
      isValid,
      clearHandler,
      inputHandler,
      saveHandler
    } = this.props;

    let mult = 0;

    if (value.length) mult++;
    if (isValid) mult++;

    let style = {};

    if (mult < 2) {
      style = {paddingRight: 50*mult};
    }

    return (
      <div className="position-input-wrap" style={style}>
        <input
          className={`position-input position-input-${subClass}`}
          value={value}
          placeholder={placeholder}
          onInput={inputHandler}
        />
        {(() => value.length ?
          <button
            className="position-clear"
            onClick={clearHandler}
          >
            Clear
          </button>
          :
          null
        )()}
        {(() => isValid ?
          <button
            className="position-save"
            onClick={saveHandler}
          >
            Save
          </button>
          :
          null
        )()}
      </div>
    );
  }
}

class PositionInputs extends Component {
  render() {
    const {
      positions,
      values,
      dispatch
    } = this.props;

    const inputHandler = positionId => (e) => {
      dispatch(updatePositionValue(positionId, e.target.value));
    };

    const clearHandler = positionId => (e) => {
      dispatch(updatePositionValue(positionId, ''));
    };

    const saveHandler = positionId => (e) => {
      dispatch(savePosition(positionId));
    };

    return (
      <div className="position-inputs">
        <PositionInput
          subClass="mortar"
          value={values[MORTAR_ID]}
          isValid={!!positions[MORTAR_ID]}
          placeholder="🚀 Mortar: (ex: A11 11)"
          clearHandler={clearHandler(MORTAR_ID)}
          inputHandler={inputHandler(MORTAR_ID)}
          saveHandler={saveHandler(MORTAR_ID)}
        />
        <PositionInput
          subClass="target"
          value={values[TARGET_ID]}
          isValid={!!positions[TARGET_ID]}
          placeholder="🎯 Target: (ex: B11 11)"
          clearHandler={clearHandler(TARGET_ID)}
          inputHandler={inputHandler(TARGET_ID)}
          saveHandler={saveHandler(TARGET_ID)}
          isTarget
        />
      </div>
    );
  }
}

export default connect(state => state)(PositionInputs);
