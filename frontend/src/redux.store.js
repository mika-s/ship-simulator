import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import reducer from './reducers';

const middleware = applyMiddleware(logger, thunk);
// const middleware = applyMiddleware(thunk);

export default createStore(reducer, middleware);
