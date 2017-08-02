import { CHECKING_ISCONTACT_PENDING, CHECKING_ISCONTACT_FULFILLED, CHECKING_ISCONTACT_REJECTED } from '../constants';

const initState = {
  fetching: false,
  fetched: false,
  isContact: null,
  error: null
};

const isContactReducer = (state = initState, action) => {
  switch (action.type) {
  case CHECKING_ISCONTACT_PENDING:
    return { ...state, fetching: true };
  case CHECKING_ISCONTACT_FULFILLED:
    return {
      ...state,
      fetching: false,
      fetched: true,
      isContact: action.payload
    };
  case CHECKING_ISCONTACT_REJECTED:
    return {
      ...state,
      error: action.payload,
      fetched: true,
      fetching: false
    };
  default:
    return state;
  }
};

export default isContactReducer;
