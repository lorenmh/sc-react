import React, { Component } from 'react';

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
        <Keypad />
        <Footer />
      </div>
    );
  }
}
