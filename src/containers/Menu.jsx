import React, { Component } from 'react';

export default class Menu extends Component {
  render() {
    const { dispatch, message } = this.props;

    window.dispatch = dispatch;

    return (
      <div className="menu-wrap">
        <ul className="menu">
          <li><a href="/events">events</a></li>
          <li><a href="/venues">venues</a></li>
          <li><a href="/about">about</a></li>
        </ul>
      </div>
    );
  }
}

