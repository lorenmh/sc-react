import React, { Component } from 'react';

import { Position, Calculation } from '../models';
import GridView from './GridView';
import CalculationView from './CalculationView';
import Menu from './Menu';
import PositionInputs from './PositionInputs';
import Keypad from './Keypad';
import Footer from './Footer';
import Search from './Search';

import LoadView from '../components/LoadView';

import mnemonic from '../mnemonic';

window.m = mnemonic;

export default class App extends Component {
  render() {
    let testSavedItems = [
      {position: 'A11-2-3 456', mnemonic: mnemonic()},
      {position: 'A2-5-1 456', mnemonic: mnemonic()},
      {position: 'F4-2-2 456', mnemonic: mnemonic()},
      {position: 'G11-9-7 456', mnemonic: mnemonic()},
    ];


    return (
      <div className="content">
        <Menu />
        <h1 className="app-title">Squad Game Calculator</h1>
        <CalculationView />
        <PositionInputs />
        <GridView />
        <LoadView savedItems={testSavedItems} />
        <Footer />
      </div>
    );
  }
}
