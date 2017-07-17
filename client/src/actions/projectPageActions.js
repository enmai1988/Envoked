import axios from 'axios';
import { FETCH_PROJECT_PENDING, FETCH_PROJECT_FULFILLED, FETCH_PROJECT_REJECTED } from '../constants';

export const fetchProject = (id) => {
  return dispatch => {
    dispatch({ type: FETCH_PROJECT_PENDING });
    axios.get(`/api/project/${id}`)
      .then(response => {
        dispatch({
          type: FETCH_PROJECT_FULFILLED,
          payload: response.data
        });
      })
      .catch(err => {
        dispatch({
          type: FETCH_PROJECT_REJECTED,
          payload: err
        });
      });
  };
};
