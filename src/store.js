import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from './reducers';

import { Position } from './models';

import mnemonic from './mnemonic';

export const STORAGE_KEY = 'APP_STATE';

const DEFAULT_USE_KEYBOARD = true,
  DEFAULT_SAVED_POSITIONS = []
;

const loggerMiddleware = createLogger();

export function initialStateFromStorage() {
  let storedState;

  try {
    storedState = Object.assign({}, JSON.parse(localStorage[STORAGE_KEY]));
  } catch (_) {
    storedState = {};
  }

  let useKeyboard = storedState.useKeyboard,
    savedPositions = storedState.savedPositions
  ;

  useKeyboard = (
    useKeyboard === undefined ? DEFAULT_USE_KEYBOARD : useKeyboard
  );

  savedPositions = (
    savedPositions === undefined ? DEFAULT_SAVED_POSITIONS : savedPositions
  );

  let initialState = {
    isEditMortar: true,
    isLocked: false,
    positions: {
      mortar: null,
      target: null,
      newPositions: {
        mortar: null,
        target: null
      }
    },
    corrections: {
      displacement: {
        N: 0,
        S: 0,
        E: 0,
        W: 0
      },
      clearCorrections: false
    },
    useKeyboard,
    savedPositions
  };

  return initialState;
}

export default function configureStore() {
  return createStore(
    rootReducer,
    initialStateFromStorage(),
    applyMiddleware(
      thunkMiddleware,
 //     loggerMiddleware,
    ),
  );
}
