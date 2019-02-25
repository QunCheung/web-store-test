/**
 * @file saga
 * @author chicunxiang@baidu.com
 */
import {effects} from 'redux-saga';
import actions from '../action/action.js';
import * as api from '../api/api';
import {getCategorys} from "../api/api";

const {fork, put, call, take, all, select} = effects;


function* getLanguage() {
    try {
        const [initLanguage] = yield all([
            call(api.getLanguage)
        ]);
        yield put(actions.renderPageLanguage(initLanguage));
    }
    catch (e) {
        yield put(console.log(e));
    }
}

function* getLoginStatus() {
    try {
        const [status] = yield all([
            call(api.queryLoginStatus)
        ]);
        yield put(actions.renderUserLoginStatusAction(status));
    }
    catch (e) {
        yield put(console.log(e));
    }
}

function* getCategories() {
    try {
        const [category] = yield all([
            call(api.getCategorys)
        ]);
        yield put(actions.renderPageCategorys(category));
    }
    catch (e) {
        yield put(console.log(e));
    }
}


function* getRecommendBrands() {
    try {
        const [brands] = yield all([
            call(api.getTitleRecommendBrands)
        ]);
        yield put(actions.renderPageRecommendBrands(brands));
    }
    catch (e) {
        yield put(console.log(e));
    }
}


function* initLanguage() {
    yield fork(getLanguage);
}

function* initQueryLoginStatus() {
    yield fork(getLoginStatus);
}

function* initCategory() {
    yield fork(getCategories);
}

function* initRecommendBrands() {
    yield fork(getRecommendBrands);
}

export default function* root() {
    yield all([
        fork(initLanguage),
        fork(initQueryLoginStatus),
        fork(initCategory),
        fork(initRecommendBrands)
    ]);
}
