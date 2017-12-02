import React, { Component } from 'react';
import { connect } from 'react-redux';

import { MORTAR_ID, TARGET_ID } from '../const';
import {
  updatePositionFromString,
  clearNewPosition,
  savePosition
} from '../actions';

class PositionInput extends Component {
  render() {
    const {
      newPosition,
      clearPosition,
      placeholder,
      isTarget,
      isFocus,
      inputHandler,
      saveHandler
    } = this.props;

    const subClass = isTarget ? 'target' : 'mortar';

    let inputEventHandler = (e) => {
      inputHandler(e.target.value);
    };

    let clearHandler = (_) => {
      this.inputEl.value = '';
      inputHandler('');
    };

    let saveEventHandler = (_) => {
      saveHandler(this.inputEl.value);
    }

    if (this.inputEl && newPosition) {
      this.inputEl.value = newPosition.toStringShort();
      clearPosition();
    }

    return (
      <div className="position-input-wrap">
        <input
          className={`position-input position-input-${subClass}`}
          ref={(e) => {this.inputEl = e; /*isFocus && e && e.focus();*/}}
          placeholder={placeholder}
          onInput={inputEventHandler}
        />
        <button
          className="position-clear"
          onClick={clearHandler}
        >
          Clear
        </button>
        <button
          className="position-save"
          onClick={saveEventHandler}
        >
          Save
        </button>
      </div>
    );
  }
}

class PositionInputs extends Component {
  render() {
    const {
      positions,
      dispatch
    } = this.props;

    let inputHandler = positionId => (value) => {
      dispatch(
        updatePositionFromString(
          positionId,
          value
        )
      );
    };

    let clearPosition = positionId => () => {
      dispatch(clearNewPosition(positionId));
    };

    let saveHandler = (positionString) => {
      dispatch(savePosition(positionString));
    }

    let newMortarPosition = positions.newPositions[MORTAR_ID],
      newTargetPosition = positions.newPositions[TARGET_ID]
    ;

    return (
      <div className="position-inputs">
        <PositionInput
          subClass="mortar"
          placeholder="Mortar: (ex: A11 11)"
          newPosition={newMortarPosition}
          clearPosition={clearPosition(MORTAR_ID)}
          inputHandler={inputHandler(MORTAR_ID)}
          saveHandler={saveHandler}
          isFocus
        />
        <PositionInput
          subClass="mortar"
          placeholder="Target: (ex: B11 11)"
          newPosition={newTargetPosition}
          clearPosition={clearPosition(TARGET_ID)}
          inputHandler={inputHandler(TARGET_ID)}
          saveHandler={saveHandler}
          isTarget
        />
      </div>
    );
  }
}

export default connect(s => s)(PositionInputs);
