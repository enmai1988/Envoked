import {
  FORM_SUBMISSION_PENDING,
  FORM_SUBMISSION_FULFILLED,
  FORM_SUBMISSION_REJECTED
} from '../constants';

const initState = {
  submitted: false,
  created: false,
  error: null
};

const formReducer = (state = initState, action) => {
  switch (action.type) {
  case FORM_SUBMISSION_PENDING:
    return { ...state, initiated: true, created: false };
  case FORM_SUBMISSION_FULFILLED:
    return { ...state, initiated: false, created: true };
  case FORM_SUBMISSION_REJECTED:
    return { ...state, initiated: false, created: false, error: action.payload };
  default:
    return state;
  }
};

export default formReducer;
