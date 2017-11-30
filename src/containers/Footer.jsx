import React, { Component } from 'react';

export default class Footer extends Component {
  render() {
    const { dispatch, message } = this.props;

    window.dispatch = dispatch;

    return (
      null
      //<footer>© venyou.io 2017</footer>
    );
  }
}
