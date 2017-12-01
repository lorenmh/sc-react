import React, { Component } from 'react';
import { connect } from 'react-redux';

import { MORTAR_ID, TARGET_ID } from '../const';
import { updatePositionFromString } from '../actions';

class PositionInput extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
  }

  render() {
    const {
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

    return (
      <div className="position-input-wrap">
        <input
          className={`position-input position-input-${subClass}`}
          ref={(e) => {this.inputEl = e; isFocus && e && e.focus();}}
          placeholder={placeholder}
          onInput={inputEventHandler}
        />
        <button onClick={clearHandler}>clear</button>
        <button onClick={clearHandler}>save</button>
      </div>
    );
  }
}

class PositionInputs extends Component {
  render() {
    const {
      placeholder,
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

    let saveHandler = positionId => (e) => {
    };

    return (
      <div className="position-inputs">
        <PositionInput
          subClass="mortar"
          placeholder="Mortar: (ex: A11 11)"
          inputHandler={inputHandler(MORTAR_ID)}
          isFocus
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
