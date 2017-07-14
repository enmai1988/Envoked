import axios from 'axios';
import { fetchUser } from '../actions/userActions.js';

const initUserState = {
  currUser: null,
  fetchingUser: false,
  fetchedUser: false,
  fetchError: null
};

const userReducer = (state = initUserState, action) => {
  switch (action.type) {
  case 'FETCH_USER_PENDING':
    return {
      ...state,
      fetchingUser: true,
      fetchedUser: false
    };
  case 'FETCH_USER_FULFILLED':
    return {
      ...state,
      fetchingUser: false,
      fetchedUser: true,
      currUser: action.payload
    };
  case 'FETCH_USER_REJECTED':
    return {
      ...state,
      fetchingUser: false,
      fetchedUser: true,
      fetchError: action.payload
    };
  default:
    return state;
  }
};

export default userReducer;
