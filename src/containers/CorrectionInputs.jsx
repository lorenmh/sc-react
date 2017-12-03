import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MORTAR_ID, TARGET_ID } from '../const';
import {
  updatePositionFromString,
  clearNewPosition,
  savePosition,
  setCorrection,
  applyCorrection,
  clearCorrection,
  unsetClearCorrection,
} from '../actions';

class CorrectionInput extends Component {
  render() {
    let {
      clearer,
      directionString,
      isClearCorrection,
      inputHandler,
    } = this.props;

    const inputId = `correction-input-${directionString}`;

    if (isClearCorrection && this.el) {
      this.el.value = '';
      clearer();
    }

    return (
      <div className="correction-input-wrap">
        <label className="correction-label" htmlFor={inputId} >
          <span>{`${directionString}:`}</span>
          <input
            className="correction-input"
            ref={el => this.el = el}
            type="number"
            onInput={inputHandler}
            id={inputId}
          />
          <span>m</span>
        </label>
      </div>
    );
  }
}

class CorrectionInputs extends Component {
  render() {
    const { dispatch, corrections, positions } = this.props;

    let hasMortar = !!positions[MORTAR_ID],
      hasTarget = !!positions[TARGET_ID]
    ;

    if (!hasMortar && !hasTarget) return null;

    let isClearCorrection = corrections.clearCorrections;

    let clearer = (function() {
      let doneOnce = false;
      return function() {
        if (!doneOnce) {
          doneOnce = true;
          dispatch(unsetClearCorrection);
        }
      };
    })();

    let inputHandler = id => (e) => {
      let displacement = (+e.target.value);
      dispatch(setCorrection(id, displacement));
    };

    let applyHandler = positionId => (e) => {
      dispatch(applyCorrection(positionId));
    };

    let clearHandler = (e) => {
      dispatch(clearCorrection);
    };

    return (
      <div className="correction-wrap">
        <h3 className="correction-title">Correction</h3>
        <div className="correction-inputs">
          <CorrectionInput
            isClearCorrection={isClearCorrection}
            clearer={clearer}
            inputHandler={inputHandler('N')}
            directionString="N"
          />
          <CorrectionInput
            isClearCorrection={isClearCorrection}
            clearer={clearer}
            inputHandler={inputHandler('S')}
            directionString="S"
          />
          <CorrectionInput
            isClearCorrection={isClearCorrection}
            clearer={clearer}
            inputHandler={inputHandler('E')}
            directionString="E"
          />
          <CorrectionInput
            isClearCorrection={isClearCorrection}
            clearer={clearer}
            inputHandler={inputHandler('W')}
            directionString="W"
          />
        </div>
        <div className="correction-buttons">
          {(() => hasMortar ? (
            <button
              className="correction-mortar"
              onClick={applyHandler(MORTAR_ID)}
            >
              Apply to Mortar
            </button>
          ) : null)()}
          {(() => hasTarget ? (
            <button
              className="correction-target"
              onClick={applyHandler(TARGET_ID)}
            >
              Apply to Target
            </button>
          ) : null)()}
          <button
            className="correction-clear"
            onClick={clearHandler}
          >
            Clear
          </button>
        </div>
      </div>
    );
  }
}

export default connect(s => s)(CorrectionInputs);
