import React, { Component } from 'react';

export default class Event extends Component {
  render() {
    const { event } = this.props;
    const snippets = event.snippets || [];

    return (
      <div className="event-item">
        <h1>{ event.title }</h1>
        <h4>{ event.start_dt }</h4>
        <a href={event.link_url}>Link</a>
        <div className="event-snippets">
          { snippets.map(snippet => <p>{ snippet }</p>) }
        </div>
      </div>
    );
  }
}

