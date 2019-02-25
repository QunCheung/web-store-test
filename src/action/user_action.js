import * as types from '../conts/actionType';

/**
 * 更新登陆状态
 *
 * @return {Object} redux action of INIT_PAGE
 */
export const renderUserLoginStatusAction = (params) => {
    return {
        type: types.UPDATE_LOGIN_STATUS,
        params
    };
};
/**
 * 更新登陆状态
 *
 * @return {Object} redux action of INIT_PAGE
 */
export const updateUserToken = (params) => {
    return {
        type: types.UPDATE_TOKEN,
        params
    };
};

