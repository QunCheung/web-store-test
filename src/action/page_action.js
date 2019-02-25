import * as types from '../conts/actionType';

/**
 * 初始化页面
 *
 * @return {Object} redux action of INIT_PAGE
 */
export const renderPageData = (initConfig) => {
    return {
        type: types.INIT,
        initConfig
    };
};

/**
 * 屏幕变化
 * @param params
 * @returns {{type: string, params: *}}
 */
export const renderPageScreen = params => {
    return {
        type: types.UPDATE_SCREEN,
        params
    };
};

/**
 * 显示底部
 * @returns {{type: string, params: {isShow: boolean}}}
 */
export const showNav = () => {
    return {
        type: types.SHOW_NAV,
        params: {isShow: true}
    };
};

/**
 * 隐藏底部
 * @returns {{type: string, params: {isShow: boolean}}}
 */
export const hideNav = () => {
    return {
        type: types.SHOW_NAV,
        params: {isShow: true}
    };
};

/**
 * 获取语言包
 * @returns {{type: string, params: {...params}}}
 */
export const renderPageLanguage = (params) => {
    return {
        type: types.UPDATE_LANGUAGE,
        params: params
    };
};
/**
 * 获取分类
 * @returns {{type: string, params: {...params}}}
 */
export const renderPageCategorys = (params) => {
    return {
        type: types.UPDATE_CATEGORY,
        params: params
    };
};
/**
 * 获取推荐品牌
 * @returns {{type: string, params: {...params}}}
 */
export const renderPageRecommendBrands = (params) => {
    return {
        type: types.UPDATE_BRANDS,
        params: params
    };
};
/**
 * 获取推荐品牌
 * @returns {{type: string, params: {...params}}}
 */
export const renderPageMatch = (params) => {
    return {
        type: types.UPDATE_MATCH,
        params: params
    };
};
