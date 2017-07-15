import userReducer from './userReducer.js';
import projectReducer from './projectReducer.js';
import newProjectReducer from './newProjectReducer.js';
import { combineReducers } from 'redux';

export default combineReducers({
  user: userReducer,
  projects: projectReducer,
  newProject: newProjectReducer
});
