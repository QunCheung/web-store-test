import * as actionTypes from '../conts/actionType';
import common from "../utils/common";

export const userInfo = (state = {
    userToken: ""
}, action) => {
    switch (action.type) {
        case actionTypes.UPDATE_TOKEN:
            return {
                userToken: action.params.token
            };

        case actionTypes.UPDATE_LOGIN_STATUS:
            const token = common.getCookie("token");
            if (!action.params) {
                common.setCookie("token", "");
                return {
                    ...state,
                    ...action.params,
                    userToken: ""
                };
            }
            return {
                ...state,
                ...action.params,
                userToken: token
            };
        default:
            return state;
    }
};
