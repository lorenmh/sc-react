import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  ROCKET,
  MORTAR,
  MORTAR_BR_3,
  MORTAR_BR_4,
  MORTAR_DE,
  MORTAR_TEXTS,
  GAME_SQUAD,
  GAME_PS
} from '../const';
  
import { toggleType } from '../actions';


class SquadTypeToggle extends Component {
  render() {
    const { dispatch, type } = this.props;

    let toggleHandler;

    const isRocket = type === ROCKET;

    if (isRocket) {
      toggleHandler = (e) => {
        dispatch(toggleType(MORTAR));
      };
    } else {
      toggleHandler = (e) => {
        dispatch(toggleType(ROCKET));
      };
    }

    return (
      <button
        className="type-toggle"
        onClick={toggleHandler}
      >
        {isRocket ? 'Rocket' : 'Mortar'}
      </button>
    );
  }
}

const PSOption = ({ id }) => (
  <option value={id}>{MORTAR_TEXTS[id]}</option>
);

class PSTypeToggle extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { dispatch } = this.props;
    const id = event.target.value;
    dispatch(toggleType(id));
  }


  render() {
    const { type } = this.props;

    const options = (
      Object.keys(MORTAR_TEXTS)
        .map(id => <PSOption key={id} id={id} />)
    );

    return (
      <select onChange={this.handleChange} className="type-select">
        {options}
      </select>
    );
  }
}

class TypeToggle extends Component {
  render() {
    const { dispatch, meta } = this.props;
    const { game, type } = meta;

    if (game === GAME_SQUAD) {
      return (
        <SquadTypeToggle dispatch={dispatch} type={type} />
      );
    }

    return (
      <PSTypeToggle dispatch={dispatch} type={type} />
    );
  }
}

export default connect(s => s)(TypeToggle);
