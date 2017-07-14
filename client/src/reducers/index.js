// import * as ActionTypes from '../actions';
import userReducer from './userReducer.js';
import projectReducer from './projectReducer.js';
import handleLoginModal from './loginModalReducer.js';
import { combineReducers } from 'redux';

export default combineReducers({
  userReducer,
  projectReducer,
  handleLoginModal
});
