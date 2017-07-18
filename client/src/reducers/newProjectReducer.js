const initState = {
  image: null,
  appName: '',
  byline: '',
  companyName: '',
  description: '',
  location: '',
  targetUsers: '',
  technologies: '',
  coFounders: '',
  stripeAmount: 0,
  imageURL: null,
  url: ''
};

const newProjectReducer = (state = initState, action) => {
  switch (action.type) {
  case 'CHANGE_IMAGEURL':
    return { ...state, imageURL: action.payload };
  case 'CHANGE_APPNAME':
    return { ...state, appName: action.payload };
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
  case 'PROJECT_CREATED':
    return {
      ...state,
      image: null,
      appName: '',
      byline: '',
      companyName: '',
      description: '',
      location: '',
      targetUsers: '',
      technologies: '',
      coFounders: '',
      imageURL: '',
      url: ''
    };
  default:
    return state;
  }
};

export default newProjectReducer;
