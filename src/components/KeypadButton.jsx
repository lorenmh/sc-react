import React, { Component } from 'react';

export default class KeypadButton extends Component {
  render() {
    const { clickHandler, type, value } = this.props;

    return (
      <button
        onClick={() => clickHandler(type, value)}
        blah="2"
        tabIndex="-1"
      >
        {value}
      </button>
    );
  }
}

