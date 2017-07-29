import {
  FORM_SUBMISSION_PENDING,
  FORM_SUBMISSION_FULFILLED,
  FORM_SUBMISSION_REJECTED
} from '../constants';

const initState = {
  pending: false,
  fulfilled: false,
  error: null
};

const formReducer = (state = initState, action) => {
  switch (action.type) {
  case FORM_SUBMISSION_PENDING:
    return { ...state, pending: true, fulfilled: false };
  case FORM_SUBMISSION_FULFILLED:
    return { ...state, pending: false, fulfilled: true };
  case FORM_SUBMISSION_REJECTED:
    return { ...state, pending: false, fulfilled: false, error: action.payload };
  default:
    return state;
  }
};

export default formReducer;
