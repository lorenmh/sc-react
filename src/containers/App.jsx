import React, { Component } from 'react';

const a=2;

import { Position, Calculation } from '../models';
import GridView from './GridView';
import CalculationView from './CalculationView';
import Menu from './Menu';
import PositionInputs from './PositionInputs';
import CorrectionInputs from './CorrectionInputs';
import Keypad from './Keypad';
import Footer from './Footer';
import Search from './Search';

import LoadView from './LoadView';

export default class App extends Component {
  render() {
    return (
      <div className="content">
        <Menu />
        <h1 className="app-title">Squad Game Calculator</h1>
        <CalculationView />
        <PositionInputs />
        <GridView />
        <CorrectionInputs />
        <LoadView />
        <Footer />
      </div>
    );
  }
}
