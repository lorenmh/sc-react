import { Position } from './models';

import mnemonic from './mnemonic';

import {
  RECEIVE_EVENTS,
  UPDATE_POSITION_STRING,
  UPDATE_POSITION_LOAD,
  SAVE_POSITION,
  DELETE_SAVED_POSITION,
  CLEAR_NEW_POSITION,
} from './actions';

function updatePositionLoad(positionId, position) {
  let obj = {};

  try {
    obj[positionId] = position;
    obj.newPositions = {};
    obj.newPositions[positionId] = position;
  } catch (e) {
    obj[positionId] = null;
  }

  return obj;
}

function updatePositionStringState(positionId, positionString) {
  let obj = {};

  try {
    obj[positionId] = Position.fromString(positionString);
  } catch (e) {
    obj[positionId] = null;
  }

  return obj;
}

function savePositionString(state, positionString) {
  try {
    return [
      {
        position: Position.fromString(positionString),
        mnemonic: mnemonic()
      },
      ...state
    ];
  } catch (e) {
    return state;
  }
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
    case UPDATE_POSITION_LOAD:
      return (
        Object.assign(
          {},
          state,
          updatePositionLoad(action.positionId, action.position)
        )
      );
    case CLEAR_NEW_POSITION:
      return (
        Object.assign({}, state, {newPositions: {mortar:null,target:null}})
      );
    default:
      return state;
  }
};

const savedPositions = (state = [], action) => {
  switch (action.type) {
    case UPDATE_POSITION_LOAD:
      return [
        state[action.index],
        ...state.filter((_,i) => i !== action.index)
      ];
    case DELETE_SAVED_POSITION:
      return state.filter((_,i) => i !== action.index);
    case SAVE_POSITION:
      return savePositionString(state, action.positionString);
    default:
      return state;
  }
};

const rootReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_POSITION_LOAD:
      return Object.assign({}, state, {
        positions: positions(state.positions, action),
        savedPositions: savedPositions(state.savedPositions, action)
      });
    case DELETE_SAVED_POSITION:
    case SAVE_POSITION:
      return Object.assign({}, state, {
        savedPositions: savedPositions(state.savedPositions, action)
      });
    case UPDATE_POSITION_STRING:
    case CLEAR_NEW_POSITION:
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
