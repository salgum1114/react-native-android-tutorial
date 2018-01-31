import { combineReducers } from 'redux';

import authentication from './authentication';
import post from './post';

export default combineReducers({
    authentication,
    post,
});
