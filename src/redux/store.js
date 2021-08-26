import {applyMiddleware, combineReducers, createStore} from 'redux';
import loadingReducer from './reducer/loadingReducer.js';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  loading: loadingReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
