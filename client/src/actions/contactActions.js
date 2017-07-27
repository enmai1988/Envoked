import axios from 'axios';
import { FETCH_CONTACT_PENDING, FETCH_CONTACT_FULFILLED, FETCH_CONTACT_REJECTED } from '../constants';

export const fetchContacts = (option = {}) => {
  return dispatch => {
    dispatch({ type: FETCH_CONTACT_PENDING });
    return axios.get('/api/contacts', option)
      .then(response => {
        dispatch({
          type: FETCH_CONTACT_FULFILLED,
          payload: response.data
        });
      })
      .catch(err => {
        dispatch({
          type: FETCH_CONTACT_REJECTED,
          payload: err
        });
      });
  };
};
