import React, { Component } from 'react';
import { connect } from 'react-redux';

import { toggleType } from '../actions';

class TypeToggle extends Component {
  render() {
    const { dispatch, values } = this.props;

    const toggleHandler = (e) => {
      dispatch(toggleType());
    };

    return (
      <button
        className="type-toggle"
        onClick={toggleHandler}
      >
        {values.isRocket ? 'Set to Mortar' : 'Set to Rocket'}
      </button>
    );
  }
}

export default connect(s => s)(TypeToggle);
