import * as actionTypes from '../conts/actionType';

export const pageInfo = (state = {
    screen: 1,
    isShow: true,
    language: {},
    category: {},
    brands: [],
    match:{}
}, action) => {
    switch (action.type) {
        case actionTypes.INIT:
            return {
                ...state,
                ad_url: action.initConfig.ad_url,
                error_url: action.initConfig.error_url,
                sign_key: action.initConfig.sign_key
            };
        case actionTypes.UPDATE_SCREEN:
            return {
                ...state,
                screen: action.params.screen,
            };
        case actionTypes.SHOW_NAV:
            return {
                ...state,
                isShow: action.params.isShow,
            };
        case actionTypes.UPDATE_LANGUAGE:
            return {
                ...state,
                language: action.params,
            };
        case actionTypes.UPDATE_CATEGORY:
            return {
                ...state,
                category: action.params,
            };
        case actionTypes.UPDATE_BRANDS:
            return {
                ...state,
                brands: action.params,
            };
        case actionTypes.UPDATE_MATCH:
            console.log(action);
            return {
                ...state,
                match: action.params,
            };
        default:
            return state;
    }
};
