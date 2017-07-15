const initState = {
  fetchedUser: null,
  fetching: false,
  fetched: false,
  error: null
};

const userReducer = (state = initState, action) => {
  switch (action.type) {
  case 'FETCH_USER_PENDING':
    return {
      ...state,
      fetching: true,
      fetched: false
    };
  case 'FETCH_USER_FULFILLED':
    return {
      ...state,
      fetching: false,
      fetched: true,
      fetchedUser: action.payload
    };
  case 'FETCH_USER_REJECTED':
    return {
      ...state,
      fetching: false,
      fetched: true,
      error: action.payload
    };
  default:
    return state;
  }
};

export default userReducer;
