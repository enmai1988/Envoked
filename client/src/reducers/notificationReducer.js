import { FETCH_NOTIFICATION_PENDING, FETCH_NOTIFICATION_FULFILLED, FETCH_NOTIFICATION_REJECTED } from '../constants';

const initState = {
  content: [],
  fetching: false,
  fetched: false
};

const notificationReducer = (state = initState, action) => {
  switch (action.type) {
  case FETCH_NOTIFICATION_PENDING:
    return {
      ...state,
      fetching: true,
      fetched: false
    };
  case FETCH_NOTIFICATION_FULFILLED:
    return {
      ...state,
      fetching: false,
      fetched: true,
      content: action.payload
    };
  case FETCH_NOTIFICATION_REJECTED:
    return {
      ...state,
      fetching: false,
      fetched: true,
      error: action.payload
    };
  default:
    return state;
  }
};

export default notificationReducer;
