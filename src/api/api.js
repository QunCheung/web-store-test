/**
 * @file 接口请求
 */
import config from '../conts/conf';
import common from '../utils/common';


/**
 * 生成jobCode
 *
 * @return {string} jobCode '0-时间戳-随机数'
 */
function generateJobCode() {
    return `t0_${new Date().valueOf()}`;
}

/**
 * 生产program的jobCode
 *
 * @param {string} programId programId
 * @return {string} jobCode '0-programId-随机数'
 */
function generateProgramJobCode(programId) {
    return `p${programId}_${new Date().valueOf()}`;
}

export const getProjects = () => (
    common.requestInPromise({
        url: config.requestUrl.getProject
    })
);

/**
 * 获取语言
 * @returns {*|Promise}
 */
export const getLanguage = () => {
    const language = common.getCookie("language");
    if (!language) {
        common.setCookie("language", 'en');
    }
    return common.requestInPromise({
        type: 'POST',
        url: config.requestUrl.getLanguage,
        data: {language: language ? language : "en"}
    });
};
/**
 * 获取国家列表
 * @returns {*|Promise}
 */
export const getCountry = () => {
    return common.requestInPromise({
        type: 'POST',
        url: config.requestUrl.getCountry,
    });
};


export const getJobInfo = params => {
    return common.requestInPromise({
        url: config.requestUrl.getJobInfo,
        type: 'POST',
        data: params
    });
};

/**
 * 获取商品 分页加载
 * @returns {*|Promise}
 */
export const getProducts = (pageSize, currentPage, params) => {
    return common.requestInPromise({
        url: config.requestUrl.getProducts + "?pageSize=" + pageSize + "&currentPage=" + currentPage,
        type: 'POST',
        data: params
    });
};

/**
 * 获取详情
 * @returns {*|Promise}
 */
export const getProductDetail = id => {
    return common.requestInPromise({
        url: config.requestUrl.getProductDetail + id,
        type: 'POST',
    });
};

/**
 * 获取浏览历史的详情
 * @returns {*|Promise}
 */
export const getProductHistory = (pageSize, currentPage, params) => {
    return common.requestInPromise({
        url: config.requestUrl.getHistory + "?pageSize=" + pageSize + "&currentPage=" + currentPage,
        type: 'POST',
        data: params
    });
};

/**
 * 获取品牌详情
 * @returns {*|Promise}
 */
export const getBrand = params => {
    return common.requestInPromise({
        url: config.requestUrl.getBrand,
        type: 'POST',
        data: params
    });
};

/**
 * 获取品牌列表
 * @returns {*|Promise}
 */
export const getBrands = () => {
    return common.requestInPromise({
        url: config.requestUrl.getBrand,
        type: 'POST',
    });
};
/**
 * 获取推荐品牌列表
 * @returns {*|Promise}
 */
export const getRecommendBrands = (params) => {
    return common.requestInPromise({
        url: config.requestUrl.getBrand,
        type: 'POST',
        data: params
    });
};
/**
 * 获取推荐品牌列表
 * @returns {*|Promise}
 */
export const getTitleRecommendBrands = () => {
    return common.requestInPromise({
        url: config.requestUrl.getBrand,
        type: 'POST',
        data: {
            isRecommend: 1,
            limit: 10
        }
    });
};
/**
 * 获取活动列表
 * @returns {*|Promise}
 */
export const getActivitys = (params) => {
    return common.requestInPromise({
        url: config.requestUrl.getActivitys,
        type: 'POST',
        data: params
    });
};

/**
 * 获取活动详情
 * @returns {*|Promise}
 */
export const getActivityDetail = (id, pageSize, currentPage) => {
    return common.requestInPromise({
        url: config.requestUrl.getActivitys + "/" + id + "?pageSize=" + pageSize + "&currentPage=" + currentPage,
        type: 'POST',
    });
};
/**
 * 获取轮播图
 * @returns {*|Promise}
 */
export const getBanners = () => {
    return common.requestInPromise({
        url: config.requestUrl.getBanners,
        type: 'POST'
    });
};

/**
 * 获取品牌商品详情，可以分页
 * @returns {*|Promise}
 */
export const getBrandProduct = (pageSize, currentPage, params) => {
    return common.requestInPromise({
        url: config.requestUrl.getBrandProducts + "?pageSize=" + pageSize + "&currentPage=" + currentPage,
        type: 'POST',
        data: params
    });
};
/**
 * 测试跳转登陆
 * @returns {*|Promise}
 */
export const testLogin = () => {
    return common.requestInPromise({
        url: "/fs/api/users/reload",
        type: 'GET'
    });
};

/**
 * 测试跳转登陆
 * @returns {*|Promise}
 */
export const register = params => {
    return common.requestInPromise({
        url: config.requestUrl.register,
        type: 'POST',
        data: params
    });
};
/**
 * 测试跳转登陆
 * @returns {*|Promise}
 */
export const login = params => {
    return common.requestInPromise({
        url: config.requestUrl.login,
        type: 'POST',
        data: params
    });
};

/**
 * 检验用户名是否存在
 * @returns {*|Promise}
 */
export const checkUsername = (params) => {
    return common.requestInPromise({
        url: config.requestUrl.checkUsername,
        type: 'POST',
        data: params
    });
};

/**
 * 检验用户名是否存在
 * @returns {*|Promise}
 */
export const checkEmail = (params) => {
    return common.requestInPromise({
        url: config.requestUrl.checkEmail,
        type: 'POST',
        data: params
    });
};
/**
 * 检验用户名是否登陆的状态
 * @returns {*|Promise}
 */
export const queryLoginStatus = (params) => {
    return common.requestInPromise({
        url: config.requestUrl.checkLoginStatus,
        type: 'GET',
        data: params
    });
};


/**
 * 检验用户名是否登陆的状态
 * @returns {*|Promise}
 */
export const logout = (params) => {
    return common.requestInPromise({
        url: config.requestUrl.logout,
        type: 'POST',
        data: params
    });
};

/**
 * 获取用户基本信息
 * @returns {*|Promise}
 */
export const getProfile = () => {
    return common.requestInPromise({
        url: config.requestUrl.getProfile,
        type: 'POST',
    });
};
/**
 * 更新用户的信息
 * @returns {*|Promise}
 */
export const updateUserParams = (params) => {
    return common.requestInPromise({
        url: config.requestUrl.update,
        type: 'POST',
        data: params,
        dataType: "file",
        contentType: false
    });
};
/**
 * 修改密码
 * @returns {*|Promise}
 */
export const updatePassword = (params) => {
    return common.requestInPromise({
        url: config.requestUrl.updatePassword,
        type: 'POST',
        data: params,
    });
};

/**
 * 获取资讯
 * @returns {*|Promise}
 */
export const forgetPassword = params => {
    return common.requestInPromise({
        url: config.requestUrl.forgetPassword,
        type: 'POST',
        data: params
    });
};


/**
 * 重置密码
 * @returns {*|Promise}
 */
export const resetPassword = (params) => {
    return common.requestInPromise({
        url: config.requestUrl.resetPassword,
        type: 'POST',
        data: params,
    });
};


/**
 * 校验重置密码k
 * @returns {*|Promise}
 */
export const checkForgetPwdKey = (params) => {
    return common.requestInPromise({
        url: config.requestUrl.checkForgetPwdKey,
        type: 'POST',
        data: params,
    });
};


/**
 * 创建订单
 * @returns {*|Promise}
 */
export const createOrder = (params) => {
    return common.requestInPromise({
        url: config.requestUrl.createOrder,
        type: 'POST',
        data: params,
    });
};

/**
 * 获取资讯
 * @returns {*|Promise}
 */
export const getInformation = (pageSize, currentPage, params) => {
    return common.requestInPromise({
        url: config.requestUrl.getInformation + "?pageSize=" + pageSize + "&currentPage=" + currentPage,
        type: 'POST',
        data: params
    });
};

/**
 * 获取资讯
 * @returns {*|Promise}
 */
export const getInformationDetail = id => {
    return common.requestInPromise({
        url: config.requestUrl.getInformation + "/" + id,
        type: 'POST'
    });
};


/**
 * 获取资讯
 * @returns {*|Promise}
 */
export const getCategorys = () => {
    return common.requestInPromise({
        url: config.requestUrl.getCategorys,
        type: 'POST',
    });
};


/**
 * 添加品牌收藏
 * @returns {*|Promise}
 */
export const addBrandFavorites = (params) => {
    return common.requestInPromise({
        url: config.requestUrl.addBrandFavorites,
        type: 'POST',
        data: params
    });
};


/**
 * 删除品牌收藏
 * @returns {*|Promise}
 */
export const delBrandFavorites = (params) => {
    return common.requestInPromise({
        url: config.requestUrl.delBrandFavorites,
        type: 'POST',
        data: params
    });
};


/**
 * 获取列表
 * @returns {*|Promise}
 */
export const getBrandCollections = (pageSize, currentPage, params) => {
    return common.requestInPromise({
        url: config.requestUrl.getBrandCollections + "?pageSize=" + pageSize + "&currentPage=" + currentPage,
        type: 'POST',
        data: params
    });
};


/**
 * 添加商品收藏
 * @returns {*|Promise}
 */
export const addProductFavorites = (params) => {
    return common.requestInPromise({
        url: config.requestUrl.addProductFavorites,
        type: 'POST',
        data: params
    });
};


/**
 * 删除商品收藏
 * @returns {*|Promise}
 */
export const delProductFavorites = (params) => {
    return common.requestInPromise({
        url: config.requestUrl.delProductFavorites,
        type: 'POST',
        data: params
    });
};


/**
 * 获取商品收藏列表
 * @returns {*|Promise}
 */
export const getProductsCollections = (pageSize, currentPage, params) => {
    return common.requestInPromise({
        url: config.requestUrl.getProductsCollections + "?pageSize=" + pageSize + "&currentPage=" + currentPage,
        type: 'POST',
        data: params
    });
};


/**
 * 获取筛选列表
 * @returns {*|Promise}
 */
export const getRange = (params) => {
    return common.requestInPromise({
        url: config.requestUrl.getRange,
        type: 'POST',
        data: params
    });
};

/**
 * 获取搜索
 * @returns {*|Promise}
 */
export const startSearch = (pageSize, currentPage, params) => {
    return common.requestInPromise({
        url: config.requestUrl.search + "?pageSize=" + pageSize + "&currentPage=" + currentPage,
        type: 'POST',
        data: params
    });
};





/**
 * 获取搜索
 * @returns {*|Promise}
 */
export const getOrder = (pageSize, currentPage) => {
    return common.requestInPromise({
        url: config.requestUrl.orders + "?pageSize=" + pageSize + "&currentPage=" + currentPage,
        type: 'POST'
    });
};

