import { applyMiddleware, combineReducers, createStore } from 'redux';
import loadingReducer from './reducer/loadingReducer.js';
import shopReducer from './reducer/shopReducer.js';
import thunk from 'redux-thunk';
import workerReducer from './reducer/workerReducer.js';
import conversationReducer from './reducer/conversationReducer.js';
import messageReducer from './reducer/messageReducer.js';
import socketReducer from './reducer/socketReducer.js';

const rootReducer = combineReducers({
  loading: loadingReducer,
  shopData: shopReducer,
  workerData: workerReducer,
  conversationData: conversationReducer,
  messageData: messageReducer,
  socketData: socketReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
