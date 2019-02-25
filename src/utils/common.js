import config from '../conts/conf';
import action from "../action/action";
import * as PATH from "../conts/path";

/**
 * 返回数据类型
 *
 * @param {Object} obj - 待判断的数据
 * @return {string}  返回数据类型
 */
let getType = function (obj) {
    // tostring会返回对应不同的标签的构造函数
    let toString = Object.prototype.toString;
    const map = {
        '[object Boolean]': 'boolean',
        '[object Number]': 'number',
        '[object String]': 'string',
        '[object Function]': 'function',
        '[object Array]': 'array',
        '[object Date]': 'date',
        '[object RegExp]': 'regExp',
        '[object Undefined]': 'undefined',
        '[object Null]': 'null',
        '[object Object]': 'object'
    };
    if (obj instanceof Element) {
        return 'element';
    }
    return map[toString.call(obj)];
};

/**
 * 公共业务模块
 * @type {Object}
 */
export default {

    /**
     * 发起http请求 in promise
     *
     * @DateTime 2017-10-28
     * @param    {[type]}   options              [description]
     *           {
     *               type:,
     *               url:,
     *               data:,
     *               success:,
     *               error,
     *               complete:
     *           }
     * @return {Promise} 请求
     */
    requestInPromise(options = {}) {
        const opt = Object.assign({}, {
            type: 'GET',
            contentType: 'application/json; charset=utf-8',
            data: {}
        }, options);
        let self = this;
        return new Promise(function (resolve, reject) {
            let data = opt.data;
            if (opt.type.toUpperCase() === 'POST' && opt.data && opt.contentType && opt.contentType.indexOf('application/json') > -1) {
                data = JSON.stringify(opt.data);
            }
            let processData = true;
            if (opt.dataType && opt.dataType === "file") {
                processData = false;
            }
            $.ajax({
                type: opt.type,
                url: opt.url,
                data: data,
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true,
                dataType: 'json',
                processData: processData,
                contentType: opt.contentType,
                cache: true,
                success(data) {
                    if (data.ret === '200') {
                        resolve(data.res);
                    } else if (data.ret === 'start_home' ||
                        data.ret === 'no_login') {
                        self.gotoPage(data.ret);
                    } else {
                        reject(data.res || "UNKNOWN ERROR");
                    }
                },
                error(xhr, type) {
                    reject('net work error');
                }
            });
        });
    },

    /**
     * 跳转固定page
     *
     * @param key
     */
    gotoPage(key) {
        let page = "/";
        switch (key) {
            case 'no_login':
                page = PATH.LOGIN;
                break;
            case 'start_home':
                page = PATH.HOME;
                break;
        }
        window.location.href = page;
    },

    filterStr(str) {
        str = str + '';
        str = str.replace(/&/g, '&amp;');
        str = str.replace(/</g, '&lt;');
        str = str.replace(/>/g, '&gt;');
        str = str.replace(/'/g, '&#39;');
        str = str.replace(/"/g, '&quot;');
        str = str.replace(/;/g, '');
        str = str.replace(/--/g, ' ');
        // 有参数内容是url, 不过滤'/'
        // str = str.replace(/\//g, '');
        return str;
    },

    filterUrl(str) {
        let indexOf = str.indexOf("home");
        if (indexOf === -1) {
            indexOf = str.indexOf("information");
        }
        if (indexOf === -1) {
            indexOf = str.indexOf("brands");
        }
        if (indexOf === -1) {
            indexOf = str.indexOf("my");
        }
        if (indexOf === -1) {
            indexOf = str.split(PATH.DEFAULT)[1] === "" ? 1 : -1;
        }
        return indexOf === -1;
    },

    getQueryUrl() {
        const self = this;
        let href = window.location.href;
        let number = href.lastIndexOf("/");
        if (number === href.length - 1) {
            return false;
        }
        let currentUrl = href.substr(number);
        let f = self.filterStr(currentUrl);
        return self.filterUrl(f);
    },

    /**
     * 获取url中的指定参数值
     *
     * @param {string} name [指定的查找字段]
     * @param {string=} search [指定的查找范围，不传则使用 window.location.search]
     * @return {void}        [无]
     */
    getQueryString(name, search = window.location.search) {
        const self = this;
        const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        const r = search.substr(1).match(reg);
        if (r !== null) {
            return self.filterStr(decodeURIComponent(r[2]));
        }
        return null;
    },

    /**
     * 获取当前的路径
     * @param self
     */
    getCurrentUrl(self) {
        const {location} = self.props;
        const {pathname, search} = location;
        return pathname + search
    },

    getCookie(key) {
        const name = key + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            const c = ca[i].trim();
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    },


    setCookie(key, value) {
        const d = new Date();
        d.setTime(d.getTime() + (30 * 24 * 60 * 60 * 1000));
        const expires = "expires=" + d.toGMTString();
        document.cookie = key + "=" + value + "; " + expires + "; path=/";
    },

    /**
     * 复杂数据类型深度拷贝
     *
     * @param {Object} data 待拷贝的数据
     * @return {Object} 新的对象
     *
     */
    deepClone(data) {
        let type = getType(data);
        let obj;
        if (type === 'array') {
            obj = [];
        } else if (type === 'object') {
            obj = {};
        } else {
            // 不再具有下一层次
            return data;
        }
        if (type === 'array') {
            for (let i = 0, len = data.length; i < len; i++) {
                obj.push(this.deepClone(data[i]));
            }
        } else if (type === 'object') {
            for (let key in data) {
                obj[key] = this.deepClone(data[key]);
            }
        }
        return obj;
    }
    ,

    /**
     * 生成[min, max)区间的随机数
     *
     * @param {number} min min最小数
     * @param {number} max max最大数
     * @return {number} 返回结果
     */
    randomInRange(min, max) {
        return min + Math.floor(Math.random() * (max - min));
    }
    ,

    /**
     * 区分中英文获取字符串长度
     *
     * @param {string} str 字符串
     * @return {number} 字符串长度
     */
    getBLen(str) {
        if (str == null) {
            return 0;
        }
        if (typeof str !== 'string') {
            str += '';
        }
        return str.replace(/[^\x00-\xff]/g, '01').length;
    }
};
