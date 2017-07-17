import { FETCH_PROJECT_PENDING, FETCH_PROJECT_FULFILLED, FETCH_PROJECT_REJECTED } from '../constants';

const initState = {
  content: {},
  fetching: false,
  fetched: false
};

const projectPageReducer = (state = initState, action) => {
  switch (action.type) {
  case FETCH_PROJECT_PENDING:
    return {
      ...state,
      fetching: true,
      fetched: false
    };
  case FETCH_PROJECT_FULFILLED:
    return {
      ...state,
      fetching: false,
      fetched: true,
      content: action.payload
    };
  case FETCH_PROJECT_REJECTED:
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

export default projectPageReducer;
