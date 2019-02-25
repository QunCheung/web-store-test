import * as types from '../conts/actionType';

/**
 * 跳转页面
 *
 * @return {Object} redux action of INIT_PAGE
 */
export const renderPageAction = (params) => {
    return {
        type: types.START_PAGE,
        params
    };
};
/**
 * 更新页面数组页面
 *
 * @return {Object} redux action of INIT_PAGE
 */
export const updatePageAction = (params) => {
    return {
        type: types.UPDATE_PAGES,
        params
    };
};

