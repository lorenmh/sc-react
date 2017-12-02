import React, { Component } from 'react';

class SavedItem extends Component {
  render() {
    let { savedItem } = this.props;

    let { mnemonic, position } = savedItem;

    return (
      <tr key={mnemonic + position.toString()} className="saved-item">
        <td className="saved-item-position">{position}</td>
        <td className="saved-item-mnemonic">{mnemonic}</td>
        <td className="saved-item-controls">
          <button>Load</button>
          <button>Del</button>
        </td>
      </tr>
    );
  }
}

export default class LoadView extends Component {
  render() {
    let { savedItems } = this.props;

    let savedItemComponents = (
      savedItems.map(savedItem => <SavedItem savedItem={savedItem} />)
    );

    return (
      <table className="saved-items">
        <tbody>
          <tr>
            <th>position</th>
            <th>mnemonic</th>
            <th>cntrl</th>
          </tr>
          {savedItemComponents}
        </tbody>
      </table>
    );
  }
}
