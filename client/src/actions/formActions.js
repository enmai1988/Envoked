import axios from 'axios';
import {
  FORM_SUBMISSION_PENDING,
  FORM_SUBMISSION_FULFILLED,
  FORM_SUBMISSION_REJECTED
} from '../constants';

export const submitForm = (form, endpoint) => {
  return dispatch => {
    dispatch({ type: FORM_SUBMISSION_PENDING });
    return axios.post(endpoint, form)
      .then(response => {
        dispatch({ type: 'PROJECT_CREATED' });
        dispatch({ type: FORM_SUBMISSION_FULFILLED });
        return response.status === 201 ? true : false;
      })
      .catch(err => {
        dispatch({ type: FORM_SUBMISSION_REJECTED, payload: 'An error has occured' });
      });
  };
};
