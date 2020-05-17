import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { logger } from 'redux-logger';
import rootReducer from './reducers';

const middleware = process.env.NODE_ENV === 'production' ? [ thunk ] : [thunk, logger];

const store = createStore(rootReducer, {}, applyMiddleware(...middleware));

export default store;

export let Dispatch = store.dispatch;
