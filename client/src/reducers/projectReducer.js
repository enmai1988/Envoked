import { FETCH_PROJECTS_PENDING, FETCH_PROJECTS_FULFILLED, FETCH_PROJECTS_REJECTED } from '../constants';

const initState = {
  content: [],
  fetching: false,
  fetched: false
};

const projectReducer = (state = initState, action) => {
  switch (action.type) {
  case FETCH_PROJECTS_PENDING:
    return {
      ...state,
      fetching: true,
      fetched: false
    };
  case FETCH_PROJECTS_FULFILLED:
    return {
      ...state,
      fetching: false,
      fetched: true,
      content: action.payload
    };
  case FETCH_PROJECTS_REJECTED:
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

export default projectReducer;
