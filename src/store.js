import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from './reducers';

import {
  GAME_SQUAD,
  MORTAR
} from './const';

export default function configureStore() {
  return createStore(
    rootReducer,
    {
      meta: {
        game: GAME_SQUAD,
        type: MORTAR
      },

      // user inputed values
      positions: {
        mortar: null,
        target: null
      },

      // hover positions
      hover: {
        mortar: null,
        target: null
      },

      pendingSave: {
        mortar: false,
        target: false
      },

      // input / form values
      values: {
        mortar: '',
        target: '',
        save: {
          mortar: '',
          target: ''
        },
        add: '',
        sub: '',
        n: '',
        s: '',
        e: '',
        w: '',
        isRocket: false,
        locked: true,
      },

      // saved positions
      saved: []
    },
    applyMiddleware(
      thunkMiddleware,
      //createLogger()
    ),
  );
}
