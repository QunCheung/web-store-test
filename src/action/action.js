import * as pageAction from './page_action';
import * as historyAction from './history_action';
import * as userAction from './user_action';

// ！需要各个 action 避免同名的问题。
const actions = {
    ...pageAction,
    ...historyAction,
    ...userAction
};
export default actions;
