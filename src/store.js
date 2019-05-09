import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { logger } from 'redux-logger';
import rootReducer from './reducers';

const initialState = {};

const middleware = process.env.NODE_ENV === 'production' ? [ thunk ] : [thunk, logger];

export default createStore(rootReducer, initialState, applyMiddleware(...middleware));
