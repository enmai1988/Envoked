import axios from 'axios';
import { CHECKING_ISCONTACT_PENDING, CHECKING_ISCONTACT_FULFILLED, CHECKING_ISCONTACT_REJECTED } from '../constants';

export const isContact = id => {
  return dispatch => {
    dispatch({ type: CHECKING_ISCONTACT_PENDING });
    axios.get(`/api/contacts/${id}`)
      .then(response => {
        let isContact = false;
        console.log(response);
        if (response.data === 'self') {
          isContact = null;
        } else if (response.data && response.data.status === 'contact') {
          isContact = true;
        }
        dispatch({type: CHECKING_ISCONTACT_FULFILLED, payload: isContact});
      })
      .catch(err => {
        dispatch({ type: CHECKING_ISCONTACT_REJECTED, payload: err });
      });
  };
};
