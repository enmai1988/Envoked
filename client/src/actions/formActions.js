import axios from 'axios';
import {
  FORM_SUBMISSION_PENDING,
  FORM_SUBMISSION_FULFILLED,
  FORM_SUBMISSION_REJECTED
} from '../constants';

export const submitForm = (form, endpoint) => {
  return dispatch => {
    dispatch({ type: FORM_SUBMISSION_PENDING });
    axios.post(endpoint, form)
      .then(response => {
        if (response.status !== 201) { throw response; }
        dispatch({ type: FORM_SUBMISSION_FULFILLED });
      })
      .catch(err => {
        dispatch({ type: FORM_SUBMISSION_REJECTED });
      });
  };
};
