import React, { Component } from 'react';
import { Provider } from 'react-redux';

import App from './App';

import configureStore from '../store';
import { initialAction } from '../actions';

const store = configureStore({ message: 'initial' });
window.store = store;

export class Root extends Component {
  componentDidMount() {
    const { dispatch } = store;
    dispatch(initialAction());
  }

  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}

export default Root;
