import React, { Component } from 'react';

import GridView from '../components/GridView';
import Menu from './Menu';
import Keypad from './Keypad';
import Footer from './Footer';
import Search from './Search';


export default class App extends Component {
  render() {
    return (
      <div className="content">
        <Menu />
        <Search />
        <GridView isTarget position={[0, 0, 100]} />
        <Keypad />
        <Footer />
      </div>
    );
  }
}
