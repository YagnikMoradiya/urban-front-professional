import {applyMiddleware, combineReducers, createStore} from 'redux';
import loadingReducer from './reducer/loadingReducer.js';
import shopReducer from './reducer/shopReducer.js';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  loading: loadingReducer,
  shopData: shopReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
