const initState = {
  appName: '',
  blurb: '',
  companyName: '',
  description: '',
  location: '',
  goal: 0,
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
  case 'CHANGE_BLURB':
    return { ...state, blurb: action.payload };
  case 'CHANGE_DESCRIPTION':
    return { ...state, description: action.payload };
  case 'CHANGE_LOCATION':
    return { ...state, location: action.payload };
  case 'CHANGE_GOAL':
    return { ...state, goal: action.payload };
  case 'CHANGE_URL':
    return { ...state, url: action.payload };
  case 'PROJECT_CREATED':
    return {
      ...state,
      appName: '',
      blurb: '',
      companyName: '',
      description: '',
      location: '',
      goal: 0,
      imageURL: '',
      url: ''
    };
  default:
    return state;
  }
};

export default newProjectReducer;
