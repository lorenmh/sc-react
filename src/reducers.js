import { Position } from './models';

import { mnemonic } from './helpers';

import {
  UPDATE_POSITION_VALUE,
  TOGGLE_GAME,
  TOGGLE_TYPE,
  UPDATE_HOVER,
  LOAD_POSITION,
  SAVE_POSITION,
  DELETE_SAVED_POSITION,
  APPLY_HOVER_POSITION,
  UPDATE_SAVE_NAME,
  SET_PENDING_SAVE,
  UPDATE_CORRECTION_VALUES,
  APPLY_CORRECTION
} from './actions';

import {
  GAME_SQUAD,
  MORTAR,
  MORTAR_BR_3,
} from './const';

const rootReducer = (state = {}, action) => {
  console.log(state);
  switch (action.type) {

    case TOGGLE_GAME:
      let type;
      if (action.game === GAME_SQUAD) {
        type = MORTAR;
      } else {
        type = MORTAR_BR_3;
      }

      return {
        ...state,
        meta: {
          ...state.meta,
          game: action.game,
          type
        }
      };

    case TOGGLE_TYPE:
      return {
        ...state,
        meta: {
          ...state.meta,
          type: action.mortarType,
        }
      };

    case SET_PENDING_SAVE:
      return {
        ...state,
        pendingSave: {
          ...state.pendingSave,
          [action.positionId]: action.pending
        },
        values: {
          ...state.values,
          [`${action.positionId}SaveName`]: ''
        }
      };

    case UPDATE_SAVE_NAME:
      return {
        ...state,
        values: {
          ...state.values,
          [`${action.positionId}SaveName`]: action.saveName
        }
      };

    case UPDATE_POSITION_VALUE:
      return {
        ...state,
        positions: {
          ...state.positions,
          [action.positionId]: Position.fromString(action.positionValue)
        },
        values: {
          ...state.values,
          [action.positionId]: action.positionValue
        }
      };

    case UPDATE_HOVER:
      return {
        ...state,
        hover: {
          ...state.hover,
          [action.positionId]: action.position
        },
      };

    case APPLY_HOVER_POSITION:
      return {
        ...state,
        positions: {
          ...state.positions,
          [action.positionId]: action.position
        },
        values: {
          ...state.values,
          [action.positionId]: action.position.toStringShort()
        }
      };

    case LOAD_POSITION:
      return {
        ...state,
        positions: {
          ...state.positions,
          [action.positionId]: action.position
        },
        values: {
          ...state.values,
          [action.positionId]: action.position.toStringShort()
        }
      };

    case DELETE_SAVED_POSITION:
      return {
        ...state,
        saved: state.saved.filter((_,i) => i !== action.index)
      };

    case SAVE_POSITION:
      let saveName = state.values[`${action.positionId}SaveName`];
      return {
        ...state,
        pendingSave: {
          ...state.pendingSave,
          [action.positionId]: false
        },
        values: {
          ...state.values,
          [`${action.positionId}SaveName`]: '',
        },
        saved: [
          {
            name: saveName !== '' ? saveName : mnemonic(),
            position: state.positions[action.positionId]
          },
          ...state.saved
        ]
      };

    case UPDATE_CORRECTION_VALUES:
      return {
        ...state,
        values: {
          ...state.values,
          ...action.values
        }
      };

    case APPLY_CORRECTION:
      let { n, s, e, w } = state.values;

      const position = state.positions[action.positionId].translate(
          [(+e) - (+w), (+s) - (+n)]
         )
      ;

      if (!state.values.locked) {
        n = s = e = w = '';
      }

      return {
        ...state,
        positions: {
          ...state.positions,
          [action.positionId]: position
        },
        values: {
          ...state.values,
          [action.positionId]: position.toStringShort(),
          n, s, e, w
        }
      };

    default:
      return state;
  }
};

export default rootReducer;
