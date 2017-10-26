import React, { Component } from 'react';

class Event extends Component {
  render() {
    const { dispatch, message } = this.props;

    window.dispatch = dispatch;

    return (
      <h1>{message}</h1>
    );
  }
}

