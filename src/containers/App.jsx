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
        <PositionInputs />
        <Output />
        <Keypad />
        <Footer />
      </div>
    );
  }
}
