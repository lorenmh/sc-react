import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import { connect } from 'react-redux';
import { MORTAR_ID, TARGET_ID } from '../const';

import {
  updateCorrectionValues,
  applyCorrection
} from '../actions';

class CorrectionInput extends Component {
  render() {
    let {
      directionString,
      value,
      inputHandler,
    } = this.props;

    const inputId = `correction-input-${directionString}`;

    return (
      <div className="correction-input-wrap">
        <label className="correction-label" htmlFor={inputId} >
          <span>{`${directionString}:`}</span>
          <input
            id={inputId}
            className="correction-input"
            type="number"
            value={value}
            onInput={inputHandler}
          />
          <span>m</span>
        </label>
      </div>
    );
  }
}

class CorrectionInputs extends Component {
  render() {
    const { dispatch, positions, values } = this.props,
      hasMortar = !!positions[MORTAR_ID],
      hasTarget = !!positions[TARGET_ID]
    ;

    if (!hasMortar && !hasTarget) return null;

    const { add, sub, n, s, e, w, isRocket } = values;

    const artyName = isRocket ? 'Rocket' : 'Mortar';

    const isLocked = true,
      lockHandler = ev => ev
    ;

    const clearHandler = () => {
      dispatch(updateCorrectionValues({n: '', s: '', e: '', w: ''}));
    };

    const inputHandler = direction => (ev) => {
      dispatch(updateCorrectionValues({[direction]: (+ev.target.value)}));
    };

    const applyHandler = positionId => () => {
      dispatch(applyCorrection(positionId));
    };

    return (
      <div className="correction-wrap">
        <h3 className="correction-title">Correction</h3>
        <div className="add-sub">
          <CorrectionInput
            directionString="Add"
            value={add}
            inputHandler={inputHandler('add')}
          />
          <CorrectionInput
            directionString="Sub"
            value={sub}
            inputHandler={inputHandler('sub')}
          />
        </div>
        <div className="correction-inputs">
          <CorrectionInput
            directionString="N"
            value={n}
            inputHandler={inputHandler('n')}
          />
          <CorrectionInput
            directionString="S"
            value={s}
            inputHandler={inputHandler('s')}
          />
          <CorrectionInput
            directionString="E"
            value={e}
            inputHandler={inputHandler('e')}
          />
          <CorrectionInput
            directionString="W"
            value={w}
            inputHandler={inputHandler('w')}
          />
        </div>
        <div className="correction-buttons">
          {(() => hasMortar ? (
            <button
              className="correction-mortar"
              onClick={applyHandler(MORTAR_ID)}
            >
              {`Apply to ${artyName}`}
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
            className="correction-lock"
            onClick={lockHandler}
          >
            {(() => isLocked ? 'Locked ' : 'Unlocked ')()}
            {(() => {
              return isLocked ?
                <span className="icon-lock" />
                :
                <span className="icon-unlock" />
              ;
            })()}
          </button>
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
