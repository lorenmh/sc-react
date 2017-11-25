import React, { Component } from 'react';

import { Position, Calculation } from '../objects';
import GridView from '../components/GridView';
import Menu from './Menu';
import PositionInputs from './PositionInputs';
import Keypad from './Keypad';
import Footer from './Footer';
import Search from './Search';

window.Position = Position;

export default class App extends Component {
  render() {
    let mortarPosition = Position.fromStrings('a','2','4'),
      targetPosition = Position.fromStrings('a','1','')
    ;

    console.log(Calculation.fromPositions(mortarPosition, targetPosition));

    return (
      <div className="content">
        <Menu />
        <PositionInputs />
        <GridView position={mortarPosition} />
        <GridView isTarget position={targetPosition} />
        <Keypad />
        <Footer />
      </div>
    );
  }
}
