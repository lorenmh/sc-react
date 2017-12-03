import { Position } from './models';

import mnemonic from './mnemonic';

import {
  RECEIVE_EVENTS,
  UPDATE_POSITION_STRING,
  UPDATE_POSITION_LOAD,
  SAVE_POSITION,
  DELETE_SAVED_POSITION,
  CLEAR_NEW_POSITION,
  CLEAR_CORRECTION,
  UNSET_CLEAR_CORRECTION,
  SET_CORRECTION,
  APPLY_CORRECTION
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

function fdiv(a,b) { return Math.floor(a/b); }

const kpm = [
  [7,8,9],
  [4,5,6],
  [1,2,3]
];

// yeah I'm lazy
function posToString(pos) {
  let x = fdiv(pos[0],300),
    y = fdiv(pos[1],300),
    k1x = fdiv(pos[0]%300,100),
    k1y = fdiv(pos[1]%300,100),
    k2x = fdiv(pos[0]%100,100/3),
    k2y = fdiv(pos[1]%100,100/3),
    k3x = fdiv(pos[0]%(100/3),100/9),
    k3y = fdiv(pos[1]%(100/3),100/9),
    k4x = fdiv(pos[0]%(100/9),100/27),
    k4y = fdiv(pos[1]%(100/9),100/27),
    k5x = fdiv(pos[0]%(100/27),100/81),
    k5y = fdiv(pos[1]%(100/27),100/81)
  ;

  let xstr = String.fromCharCode(65+x),
    ystr = (y+1).toString(),
    k1s = (kpm[k1y][k1x]).toString(),
    k2s = (kpm[k2y][k2x]).toString(),
    k3s = (kpm[k3y][k3x]).toString(),
    k4s = (kpm[k4y][k4x]).toString(),
    k5s = (kpm[k5y][k5x]).toString()
  ;

  ystr = y >= 9 ? ystr + ' ' : ystr;

  return xstr+ystr+k1s+k2s+k3s+k4s+k5s;
}

function applyPositionUpdate(state, action) {
  let position = state.positions[action.positionId]
  ;

  if (!position) return null;

  let disp = state.corrections.displacement,
    vec = [disp.E-disp.W, disp.S-disp.N],
    // current vec
    cvec = [position.x + position.error/2, position.y + position.error/2],
    nvec = [Math.max(cvec[0] + vec[0],0), Math.max(cvec[1] + vec[1],0)],
    positionString = posToString(nvec),
    pos
  ;

  try {
    pos = Position.fromString(positionString);
  } catch (e) { return; }

  let posObj = {};
  posObj[action.positionId] = pos;
  posObj.newPositions = {};
  posObj.newPositions[action.positionId] = pos;

  return Object.assign({}, state, {
    positions: Object.assign({}, state.positions, posObj),
    corrections: Object.assign({}, state.corrections, {
      displacement: {N: 0, S: 0, E: 0, W: 0},
      clearCorrections: true
    })
  });
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
        Object.assign({}, state, {newPositions: {mortar: null,target: null}})
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

function setCorrection(state = {}, action) {
  let assignObj = {};

  assignObj[action.id] = action.displacement;

  return Object.assign({}, state, {
    displacement: Object.assign({}, state.displacement, assignObj)
  });
}

const corrections = (state = {}, action) => {
  switch (action.type) {
    case CLEAR_CORRECTION:
    case APPLY_CORRECTION:
      return Object.assign({}, state, {
        displacement: {
          N: 0, S: 0, E: 0, W: 0
        },
        clearCorrections: true }
      );
    case UNSET_CLEAR_CORRECTION:
      return Object.assign({}, state, { clearCorrections: false });
    case SET_CORRECTION:
      return setCorrection(state, action);
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
    case APPLY_CORRECTION:
      return Object.assign({}, state,
        applyPositionUpdate(state, action)
      );
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
    case CLEAR_CORRECTION:
    case UNSET_CLEAR_CORRECTION:
    case SET_CORRECTION:
      return Object.assign({}, state, {
        corrections: corrections(state.corrections, action)
      });
    default:
      return state;
  }
};

export default rootReducer;
