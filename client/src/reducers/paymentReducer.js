const initState = {
  name: '',
  amount: 0,
  success: null,
  successMessage: '',
  error: null,
  errorMessage: ''
};

const paymentReducer = (state = initState, action) => {
  switch (action.type) {
  case 'CHANGE_NAME':
    return { ...state, name: action.payload };
  case 'CHANGE_AMOUNT':
    return { ...state, amount: action.payload };
  case 'CHANGE_SUCCESS':
    return { ...state, success: action.payload };
  case 'CHANGE_SUCCESSMESSAGE':
    return { ...state, successMessage: action.payload };
  case 'CHANGE_ERROR':
    return { ...state, error: action.payload };
  case 'CHANGE_ERRORMESSAGE':
    return { ...state, errorMessage: action.payload };
  default:
    return state;
  }
};

export default paymentReducer;
