import reducers from '../reducers';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import promise from 'redux-promise-middleware';

const initState = {

};

export default createStore(reducers, initState, applyMiddleware(promise(), thunk, logger));
