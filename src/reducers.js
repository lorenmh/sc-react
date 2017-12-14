import { Position } from './models';

import { mnemonic } from './helpers';

import {
  UPDATE_POSITION_STRING,
  LOAD_POSITION,
  SAVE_POSITION,
  DELETE_SAVED_POSITION,

  UPDATE_CORRECTION_STRINGS,
  APPLY_CORRECTION
} from './actions';

// {
//   positions: {
//     mortar: null,
//     target: null,
//   },
//   strings: {
//     mortar: '',
//     target: ''
//     n: '',
//     s: '',
//     e: '',
//     w: ''
//   },
//   saved: []
// }
const rootReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_POSITION_STRING:
      return Object.assign({}, state, {
        positions: Object.assign({}, state.positions, {
          [action.positionId]: Position.fromString(action.positionString)
        }),
        strings: Object.assign({}, state.strings, {
          [action.positionId]: action.positionString
        })
      });
    case LOAD_POSITION:
      return Object.assign({}, state, {
        positions: Object.assign({}, state.positions, {
          [action.positionId]: action.position
        }),
        strings: Object.assign({}, state.strings, {
          [action.positionId]: action.position.toStringShort()
        })
      });
    case DELETE_SAVED_POSITION:
      return Object.assign({}, state, {
        saved: state.saved.filter((_,i) => i !== action.index)
      });
    case SAVE_POSITION:
      return Object.assign({}, state, {
        saved: [
          {
            name: action.name !== undefined ? action.name : mnemonic(),
            position: state.positions[action.positionId]
          },
          ...state.saved]
      });
    case UPDATE_CORRECTION_STRINGS:
      return Object.assign({}, state, {
        strings: Object.assign({}, state.strings, action.strings)
      });
    case APPLY_CORRECTION:
      let { n, s, e, w } = state.strings;

      const k=[(+e) - (+w), (+s) - (+n)],
        position = state.positions[action.positionId].translate(
          [(+e) - (+w), (+s) - (+n)]
        )
      ;

      window.p = state.positions[action.positionId];
      window.t = k;

      n = s = e = w = '';
      return Object.assign({}, state, {
        positions: Object.assign({}, state.positions, {
          [action.positionId]: position
        }),
        strings: Object.assign({}, state.strings, {
          [action.positionId]: position.toStringShort(),
          n, s, e, w
        })
      });
    default:
      return state;
  }
};

export default rootReducer;
