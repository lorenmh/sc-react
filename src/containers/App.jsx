import React, { Component } from 'react';

import { Position, Calculation } from '../objects';
import Output from './Output';
import Menu from './Menu';
import PositionInputs from './PositionInputs';
import Keypad from './Keypad';
import Footer from './Footer';
import Search from './Search';

window.Position = Position;

export default class App extends Component {
  render() {
    return (
      <div className="content">
        <Menu />
        <h1 className="app-title">Squad Game Calculator</h1>
        <PositionInputs />
        <Output />
        <Footer />
      </div>
    );
  }
}
