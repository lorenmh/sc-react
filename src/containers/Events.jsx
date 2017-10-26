import React, { Component } from 'react';
import { connect } from 'react-redux';

import Event from './Event';

class Events extends Component {
  componentWillMount() {
  }

  render() {
    let { events } = this.props;
    events = events || [];

    return (
      <div className="events">
        { events.map(event => <Event event={event} />) }
      </div>
    );
  }
}

export default connect(s => s)(Events);
