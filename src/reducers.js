import { Position } from './objects';

import {
  RECEIVE_EVENTS,
  UPDATE_POSITION_STRING
} from './actions';

function updatePositionStringState(positionId, positionString) {
  let obj = {};

  obj[positionId] = Position.fromString(positionString);

  return obj;
}

const positions = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_POSITION_STRING:
      return (
        Object.assign(
          {},
          state,
          updatePositionStringState(action.positionId, action.positionString)
        )
      );
    default:
      return state;
  }
};

const events = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_EVENTS:
      return [
        ...state,
        ...action.events,
      ];
    default:
  }
};

const rootReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_EVENTS:
      return Object.assign({}, state, {
        events: events(state.events, action),
      });
    case UPDATE_POSITION_STRING:
      return (
        Object.assign({}, state, {
          positions: positions(state.positions, action)
        })
      );
    default:
      return state;
  }
};

export default rootReducer;
