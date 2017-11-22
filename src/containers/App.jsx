import React, { Component } from 'react';

import { Position } from '../objects';
import GridView from '../components/GridView';
import Menu from './Menu';
import Keypad from './Keypad';
import Footer from './Footer';
import Search from './Search';

window.Position = Position;

export default class App extends Component {
  render() {
    let mortarPosition = Position.fromStrings('a','2','5457');
    let testPosition = Position.fromStrings('a','1','6');

    console.log(testPosition);

    return (
      <div className="content">
        <Menu />
        <Search />
        <GridView position={mortarPosition} />
        <GridView isTarget position={testPosition} />
        <Keypad />
        <Footer />
      </div>
    );
  }
}
