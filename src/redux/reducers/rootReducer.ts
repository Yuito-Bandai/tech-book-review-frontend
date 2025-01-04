import { combineReducers } from 'redux';
import authReducer from './authReducer.ts';

const rootReducer = combineReducers({
  auth: authReducer,
});

export default rootReducer;
