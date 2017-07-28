import axios from 'axios';
import { FETCH_NOTIFICATION_PENDING, FETCH_NOTIFICATION_FULFILLED, FETCH_NOTIFICATION_REJECTED } from '../constants';

export const fetchNotifications = (option = {}) => {
  return dispatch => {
    dispatch({ type: FETCH_NOTIFICATION_PENDING });
    return axios.get('/api/notifications', option)
      .then(response => {
        dispatch({
          type: FETCH_NOTIFICATION_FULFILLED,
          payload: response.data
        });
      })
      .catch(err => {
        dispatch({
          type: FETCH_NOTIFICATION_REJECTED,
          payload: err
        });
      });
  };
};
