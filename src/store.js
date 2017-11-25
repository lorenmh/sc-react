import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from './reducers';

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
    positions: {},
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
