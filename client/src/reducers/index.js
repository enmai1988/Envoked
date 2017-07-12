// import * as ActionTypes from '../actions';
import { userReducer } from './userReducer.js';
import { projectReducer } from './projectReducer.js';
import { combineReducers } from 'redux';

export default combineReducers({
  userReducer,
  projectReducer
});
