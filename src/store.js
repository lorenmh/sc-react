import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from './reducers';

import { Position } from './models';

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
      mortar: Position.fromStrings('a','1','123'),
      target: Position.fromStrings('b','1','456')
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
      loggerMiddleware,
    ),
  );
}
