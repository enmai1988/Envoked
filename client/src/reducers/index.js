import userReducer from './userReducer';
import projectReducer from './projectReducer';
import projectPageReducer from './projectPageReducer';
import newProjectReducer from './newProjectReducer';
import formReducer from './formReducer';
import tabsReducer from './tabsReducer';
import { combineReducers } from 'redux';

export default combineReducers({
  user: userReducer,
  projects: projectReducer,
  projectPage: projectPageReducer,
  projectCreation: newProjectReducer,
  formControl: formReducer,
  tabs: tabsReducer
});
