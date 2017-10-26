import { RECEIVE_EVENTS } from './actions';

const events = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_EVENTS:
      return [
        ...state,
        ...action.events,
      ];
    default:
  }
};

const rootReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_EVENTS:
      return Object.assign({}, state, {
        events: events(state.events, action),
      });
    default:
      return state;
  }
};

export default rootReducer;
