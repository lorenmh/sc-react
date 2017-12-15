import React, { Component } from 'react';
import { connect } from 'react-redux';

import { MORTAR_ID, TARGET_ID } from '../const';

import {
  updatePositionValue,
  setPendingSave,
  updateSaveName,
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
      saveHandler,
      keyUpHandler,
      isPendingSave
    } = this.props;

    let mult = 0;

    if (value.length) mult++;
    if (isValid) mult++;

    let style = {};

    if (mult < 2) {
      style = {paddingRight: 50*mult};
    }

    const refocus = fn => (e) => {
      fn(e);
      this.el && this.el.focus();
    };

    const pendClass = isPendingSave ? 'pending-save' : '';

    return (
      <div className={'position-input-wrap ' + pendClass} style={style}>
        <input
          className={`position-input position-input-${subClass}`}
          ref={el => this.el = el}
          value={value}
          placeholder={isPendingSave ? 'Saving, Enter Name' : placeholder}
          onKeyUp={keyUpHandler}
          onInput={inputHandler}
        />
        {(() => isValid || isPendingSave ?
          <button
            className="position-save"
            onClick={refocus(saveHandler)}
          >
            {(() => isPendingSave ? 'Save' : 'Save')()}
          </button>
          :
          null
        )()}
        {(() => value.length || isPendingSave ?
          <button
            className="position-clear"
            onClick={refocus(clearHandler)}
          >
            {(() => isPendingSave ? 'Cancel' : 'Clear')()}
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
      pendingSave,
      values,
      dispatch
    } = this.props;

    const inputHandler = positionId => (e) => {
      if (!!pendingSave[positionId]) {
        dispatch(updateSaveName(positionId, e.target.value));
      } else {
        dispatch(updatePositionValue(positionId, e.target.value));
      }
    };

    const clearHandler = positionId => (e) => {
      if (!!pendingSave[positionId]) {
        dispatch(setPendingSave(positionId, false));
      } else {
        dispatch(updatePositionValue(positionId, ''));
      }
    };

    const saveHandler = positionId => (e) => {
      if (!!pendingSave[positionId]) {
        dispatch(savePosition(positionId));
      } else {
        dispatch(setPendingSave(positionId, true));
      }
    };

    const keyUpHandler = positionId => (e) => {
      const isEscape = e.keyCode === 27,
        isEnter = e.keyCode === 13
      ;

      if (!isEscape && !isEnter) return;

      e.preventDefault();

      if (pendingSave[positionId]) {
        if (isEscape) {
          dispatch(setPendingSave(positionId, false));
        } else {
          dispatch(savePosition(positionId));
        }
      } else {
        if (isEscape) {
          dispatch(updatePositionValue(positionId, ''));
        } else {
          if (positions[positionId]) {
            dispatch(setPendingSave(positionId, true));
          }
        }
      }
    };

    const artyName = values.isRocket ? 'Rocket' : 'Mortar';

    const mortarValue = pendingSave[MORTAR_ID] ?
      values[`${MORTAR_ID}SaveName`] : values[MORTAR_ID]
    ;

    const targetValue = pendingSave[TARGET_ID] ?
      values[`${TARGET_ID}SaveName`] : values[TARGET_ID]
    ;

    return (
      <div className="position-inputs">
        <PositionInput
          subClass="mortar"
          value={mortarValue}
          isValid={!!positions[MORTAR_ID]}
          isPendingSave={pendingSave[MORTAR_ID]}
          placeholder={`🚀 ${artyName}: (ex: A11 11)`}
          clearHandler={clearHandler(MORTAR_ID)}
          inputHandler={inputHandler(MORTAR_ID)}
          saveHandler={saveHandler(MORTAR_ID)}
          keyUpHandler={keyUpHandler(MORTAR_ID)}
        />
        <PositionInput
          subClass="target"
          value={targetValue}
          isValid={!!positions[TARGET_ID]}
          isPendingSave={pendingSave[TARGET_ID]}
          placeholder="🎯 Target: (ex: B11 11)"
          clearHandler={clearHandler(TARGET_ID)}
          inputHandler={inputHandler(TARGET_ID)}
          saveHandler={saveHandler(TARGET_ID)}
          keyUpHandler={keyUpHandler(TARGET_ID)}
          isTarget
        />
      </div>
    );
  }
}

export default connect(state => state)(PositionInputs);
