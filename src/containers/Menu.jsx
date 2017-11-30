import React, { Component } from 'react';

export default class Menu extends Component {
  render() {
    const { dispatch, message } = this.props;

    window.dispatch = dispatch;

    return (
      <div className="menu-wrap">
        <ul className="menu">
          {/*
          <li><a href="/tutorial">tutorials</a></li>
          <li><a href="/settings">settings</a></li>
          <li><a href="/feedback">feedback</a></li>
          <li><a href="/about">about</a></li>
          */}
        </ul>
      </div>
    );
  }
}

