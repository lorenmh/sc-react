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
        <GridView isTarget position={[100+300/3**2, 200+300/3**2, 300/3**2]} />
        <Keypad />
        <Footer />
      </div>
    );
  }
}
