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
      strings: {
        mortar: '',
        target: '',
        n: '',
        s: '',
        e: '',
        w: ''
      },
      saved: []
    },
    applyMiddleware(
      thunkMiddleware,
      createLogger()
    ),
  );
}
