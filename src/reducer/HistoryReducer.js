import * as actionTypes from '../conts/actionType';

export const historyPage = (state = {
    historyPages: []
}, action) => {
    switch (action.type) {
        case actionTypes.START_PAGE:
            let oldHistory = state.historyPages;
            oldHistory.push(action.params);
            return {
                ...state,
                historyPages: oldHistory
            };

        case actionTypes.UPDATE_PAGES:
            return {
                ...state,
                historyPages: action.params
            };
        default:
            return state;
    }
};
