const initState = {
  name: '',
  byline: '',
  companyName: '',
  description: '',
  location: '',
  targetUsers: '',
  technologies: '',
  coFounders: '',
  stripeAmount: 0,
  imageURL: '',
  url: ''
};

const newProjectReducer = (state = initState, action) => {
  switch (action.type) {
  case 'CHANGE_NAME':
    return { ...state, name: action.payload };
  case 'CHANGE_COMPANYNAME':
    return { ...state, companyName: action.payload };
  case 'CHANGE_BYLINE':
    return { ...state, byline: action.payload };
  case 'CHANGE_DESCRIPTION':
    return { ...state, description: action.payload };
  case 'CHANGE_LOCATION':
    return { ...state, location: action.payload };
  case 'CHANGE_TARGETUSERS':
    return { ...state, targetUsers: action.payload };
  case 'CHANGE_TECHNOLOGIES':
    return { ...state, technologies: action.payload };
  case 'CHANGE_COFOUNDERS':
    return { ...state, coFounders: action.payload };
  case 'CHANGE_URL':
    return { ...state, url: action.payload };
  default:
    return state;
  }
};

export default newProjectReducer;
