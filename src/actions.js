import { httpGet } from './http';

const DEFAULT_EVENTS_URI = '/api/events/';

export const UPDATE_POSITION_STRING = 'UPDATE_POSITION_STRING';
export const REQUEST_EVENTS = 'REQUEST_EVENTS';
export const RECEIVE_EVENTS = 'RECEIVE_EVENTS';
export const HTTP_ERROR = 'HTTP_ERROR';

export function updatePositionFromString(positionId, positionString) {
  return {
    type: UPDATE_POSITION_STRING,
    positionId,
    positionString
  };
}

export function receiveEvents(events) {
  return { type: RECEIVE_EVENTS, events };
}

export function httpError(err) {
  return { type: HTTP_ERROR, err };
}

export function requestEvents(query) {
  return (dispatch) => {
    httpGet(DEFAULT_EVENTS_URI)
      .then((result) => {
        dispatch(receiveEvents(result.data));
      })
      .catch((err) => {
        dispatch(httpError(err));
      })
    ;

    dispatch({ type: REQUEST_EVENTS, query });
  };
}

export function initialAction() {
  return dispatch => dispatch(requestEvents());
}
