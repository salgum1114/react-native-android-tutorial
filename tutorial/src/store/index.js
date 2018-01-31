import { createStore, applyMiddleware } from 'redux';

import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'redux-logger';

import rootReducer from '../reducers';

const enhancer = applyMiddleware(thunkMiddleware, loggerMiddleware);

const store = createStore(rootReducer, enhancer);

export default store;
