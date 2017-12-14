import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from './reducers';

export default function configureStore() {
  return createStore(
    rootReducer,
    {
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

      pending: {
        mortarSave: false,
        targetSave: false
      },

      // input / form values
      values: {
        mortar: '',
        target: '',
        mortarSaveName: '',
        targetSaveName: '',
        n: '',
        s: '',
        e: '',
        w: '',
        locked: true,
      },

      // saved positions
      saved: []
    },
    applyMiddleware(
      thunkMiddleware,
      createLogger()
    ),
  );
}
