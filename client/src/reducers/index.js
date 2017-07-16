import userReducer from './userReducer';
import projectReducer from './projectReducer';
<<<<<<< HEAD
import projectPageReducer from './projectPageReducer';
=======
>>>>>>> create user with social network login
import newProjectReducer from './newProjectReducer';
import formReducer from './formReducer';
import { combineReducers } from 'redux';

export default combineReducers({
  user: userReducer,
  projects: projectReducer,
  projectPage: projectPageReducer,
  projectCreation: newProjectReducer,
  formControl: formReducer
});
