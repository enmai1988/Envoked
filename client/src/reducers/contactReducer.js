import { FETCH_CONTACT_PENDING, FETCH_CONTACT_FULFILLED, FETCH_CONTACT_REJECTED } from '../constants';

const initState = {
  content: [],
  fetching: false,
  fetched: false
};

const contactReducer = (state = initState, action) => {
  switch (action.type) {
  case FETCH_CONTACT_PENDING:
    return {
      ...state,
      fetching: true,
      fetched: false
    };
  case FETCH_CONTACT_FULFILLED:
    return {
      ...state,
      fetching: false,
      fetched: true,
      content: action.payload
    };
  case FETCH_CONTACT_REJECTED:
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

export default contactReducer;
