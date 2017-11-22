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
        <GridView isTarget={false} position={[100, 0, 300/3**3]} />
        <Keypad />
        <Footer />
      </div>
    );
  }
}
