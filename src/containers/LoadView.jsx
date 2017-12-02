import React, { Component } from 'react';
import { connect } from 'react-redux';

import { MORTAR_ID, TARGET_ID } from '../const';

import {
  updatePositionLoad,
  deleteSavedPosition,
  savePosition
} from '../actions';

class SavedPosition extends Component {
  render() {
    let {
      savedPosition,
      loadMortarHandler,
      loadTargetHandler,
      deleteHandler
    } = this.props;

    let { mnemonic, position } = savedPosition;

    return (
      <tr className="saved-item">
        <td className="saved-item-position">{position.toElement()}</td>
        <td className="saved-item-mnemonic">{mnemonic}</td>
        <td className="saved-item-controls">
          <button
            className="load-mortar"
            onClick={loadMortarHandler}
          >
            Mortar
          </button>
          <button
            className="load-target"
            onClick={loadTargetHandler}
          >
            Target
          </button>
        </td>
        <td className="saved-item-delete-wrap">
          <button
            className="saved-item-delete"
            onClick={deleteHandler}
          >
            Delete
          </button>
        </td>
      </tr>
    );
  }
}

class LoadView extends Component {
  render() {
    let { savedPositions, dispatch } = this.props;

    if (!savedPositions.length) return null;

    let handleLoadMortar = (position, index) => () => {
      dispatch(updatePositionLoad(MORTAR_ID, position, index));
    }

    let handleLoadTarget = (position, index) => () => {
      dispatch(updatePositionLoad(TARGET_ID, position, index));
    }

    let handleDelete = (index) => () => {
      dispatch(deleteSavedPosition(index));
    }

    let savedPositionComponents = (
      savedPositions.map((saved, index) => (
        <SavedPosition
          key={saved.position.toString() + saved.mnemonic}
          savedPosition={saved}
          loadMortarHandler={handleLoadMortar(saved.position, index)}
          loadTargetHandler={handleLoadTarget(saved.position, index)}
          deleteHandler={handleDelete(index)}
        />
      ))
    );

    return (
      <table className="saved-items">
        <tbody>
          <tr>
            <th>Position</th>
            <th>Mnemonic</th>
            <th>Load</th>
            <th></th>
          </tr>
          {savedPositionComponents}
        </tbody>
      </table>
    );
  }
}
export default connect(s => s)(LoadView);
