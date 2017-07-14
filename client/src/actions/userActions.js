import axios from 'axios';

export const FETCH_USER_PENDING = 'FETCH_USER_PENDING';
export const FETCH_USER_FULFILLED = 'FETCH_USER_FULFILLED';
export const FETCH_USER_REJECTED = 'FETCH_USER_REJECTED';

export const fetchUser = () => {
  console.log('running fetchUser');
  return dispatch => {
    dispatch({ type: FETCH_USER_PENDING });
    axios.get('/user')
      .then(response => {
        console.log(response);
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
