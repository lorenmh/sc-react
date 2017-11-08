import React, { Component } from 'react';

export default class Position extends Component {
  xGrid() {
    const handler = console.log.bind(console);

    const buttons = (
      [...Array(15).keys()]
          .map(n => String.fromCharCode(n + 65))
          .map(letter => (
            <button
              onClick={() => handler(letter, 1)}
            >
              {letter}
            </button>
          ))
    );

    return (
      <div className="x-grid keypad">
        {buttons}
      </div>
    );
  }

  yGrid() {
    const handler = console.log.bind(console);

    const buttons = (
      [...Array(15).keys()]
          .map(n => n + 1)
          .map(number => (
            <button
              onClick={() => handler(number, 1)}
            >
              {number}
            </button>
          ))
    );

    return (
      <div className="y-grid keypad">
        {buttons}
      </div>
    );
  }

  kpGrid() {
    const handler = console.log.bind(console);

    const buttons = (
      [7,8,9,4,5,6,1,2,3]
          .map(number => (
            <button
              onClick={() => handler(number, 1)}
            >
              {number}
            </button>
          ))
    );

    return (
      <div className="kp-grid keypad">
        {buttons}
      </div>
    );
  }

  render() {
    const handler = console.log.bind(console);
    return (
      <div className="keypad">
        {this.xGrid()}
        {this.yGrid()}
        {this.kpGrid()}
      </div>
    );
  }
}

