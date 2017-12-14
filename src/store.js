import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from './reducers';

export default function configureStore() {
  return createStore(
    rootReducer,
    {
      positions: {
        mortar: null,
        target: null
      },
      values: {
        mortar: '',
        target: '',
        n: '',
        s: '',
        e: '',
        w: '',
        locked: true,
      },
      saved: []
    },
    applyMiddleware(
      thunkMiddleware,
      createLogger()
    ),
  );
}
