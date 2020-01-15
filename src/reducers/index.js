import { combineReducers } from 'redux';
import { user } from './user';
import { errorMsg } from './errorMsg';
import { messages } from './messages';

const rootReducer = combineReducers({
  user,
  errorMsg,
  messages
});

export default rootReducer;
