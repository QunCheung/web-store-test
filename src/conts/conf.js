const IS_RELEASE = false;

const BASE_URL = IS_RELEASE ? "https://api.fashion-safari.com" : "";

const GLOBAL_CONFIG = {
    requestUrl: {
        // 获取项目列表
        getProject: BASE_URL + '/fs/api/initConfig',
        getLanguage: BASE_URL + '/fs/api/getLanguage',
        getCountry: BASE_URL + '/fs/api/countrys',
        getJobInfo: BASE_URL + '/fs/api/bd_logo1.png?qua=high',
        getProducts: BASE_URL + '/fs/api/products',
        getProductDetail: BASE_URL + '/fs/api/products/',
        getBrandProducts: BASE_URL + '/fs/api/products',
        getBrand: BASE_URL + '/fs/api/brands',
        getRecommendBrands: BASE_URL + '/fs/api/brands',
        getHistory: BASE_URL + '/fs/api/products/history',
        getActivitys: BASE_URL + '/fs/api/activitys',
        getBanners: BASE_URL + '/fs/api/banners',
        register: BASE_URL + '/fs/api/users/register',
        login: BASE_URL + '/fs/api/login',
        checkUsername: BASE_URL + '/fs/api/users/checkUserName',
        checkEmail: BASE_URL + '/fs/api/users/checkEmail',
        checkLoginStatus: BASE_URL + '/fs/api/users/queryLoginStatus',
        logout: BASE_URL + '/fs/api/logout',
        getProfile: BASE_URL + '/fs/api/users/profile',
        update: BASE_URL + '/fs/api/users/update',
        updatePassword: BASE_URL + '/fs/api/users/updatePassword',
        createOrder: BASE_URL + '/fs/api/orders/click',
        resetPassword: BASE_URL + '/fs/api/users/resetPassword',
        getInformation: BASE_URL + '/fs/api/informations',
        forgetPassword: BASE_URL + '/fs/api/users/forgetPassword',
        getCategorys: BASE_URL + '/fs/api/categorys',
        addBrandFavorites: BASE_URL + '/fs/api/brands/collection/add',
        delBrandFavorites: BASE_URL + '/fs/api/brands/collection/delete',
        getBrandCollections: BASE_URL + '/fs/api/brands/collections',
        addProductFavorites: BASE_URL + "/fs/api/products/collection/add",
        delProductFavorites: BASE_URL + "/fs/api/products/collection/delete",
        getProductsCollections: BASE_URL + "/fs/api/products/collections",
        checkForgetPwdKey: BASE_URL +'/fs/api/users/checkForgetPwdKey',
        getRange: BASE_URL +"/fs/api/search/range",
        search: BASE_URL +"/fs/api/search",
        orders: BASE_URL +"/fs/api/orders"
    }
};

module.exports = GLOBAL_CONFIG;
