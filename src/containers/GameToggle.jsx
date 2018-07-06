import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  GAME_SQUAD,
  GAME_PS,
} from '../const';

import { toggleGame } from '../actions';

class GameToggle extends Component {
  render() {
    const { dispatch, meta } = this.props;
    const { game } = meta;

    let toggleHandler;

    const isSquad = game === GAME_SQUAD;

    if (isSquad) {
      toggleHandler = (e) => {
        dispatch(toggleGame(GAME_PS));
      };
    } else {
      toggleHandler = (e) => {
        dispatch(toggleGame(GAME_SQUAD));
      };
    }

    return (
      <button
        className="game-toggle"
        onClick={toggleHandler}
      >
        {isSquad ? 'Squad' : 'Post Scriptum'}
      </button>
    );
  }
}

export default connect(s => s)(GameToggle);
