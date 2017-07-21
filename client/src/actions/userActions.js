import axios from 'axios';
import { FETCH_USER_PENDING, FETCH_USER_FULFILLED, FETCH_USER_REJECTED } from '../constants';

export const fetchUser = () => {
  return dispatch => {
    dispatch({ type: FETCH_USER_PENDING });
    axios.get('/auth')
      .then(response => {
        dispatch({
          type: FETCH_USER_FULFILLED,
          payload: response.data
        });
      })
      .catch(err => {
        dispatch({
          type: FETCH_USER_REJECTED,
          payload: err
        });
      });
  };
};
