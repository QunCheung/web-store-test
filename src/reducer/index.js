import {combineReducers} from 'redux';
import * as BasicReducer from './BasicReducer';
import * as HistoryReducer from './HistoryReducer';
import * as UserReducer from './UserReducer';

export default combineReducers({
    ...BasicReducer,
    ...HistoryReducer,
    ...UserReducer
});
