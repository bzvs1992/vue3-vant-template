/**
 * 对于axios的封装
 */
import axios from "axios";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { ResponseErr } from "./index";
import store from "@/store/index";

const { CancelToken } = axios;
const pending: Array<any> = [];
function _removePending(config: AxiosRequestConfig) {
    if (!config.url) return;
    for (const p in pending) {
        if (pending[p].u === config.url.split("?")[0] + "&" + config.method) {
            //当当前请求在数组中存在时执行函数体
            pending[p].f(); //执行取消操作
            pending.splice(parseInt(p), 1); //数组移除当前请求
        }
    }
}
const service = axios.create({
    timeout: 5000 // 请求超时时间
});

// 请求的拦截
service.interceptors.request.use(
    config => {
        // 发送请求前先取消一下看看
        _removePending(config);
        config.cancelToken = new CancelToken(c => {
            // pending存放每一次请求的标识，一般是url + 参数名 + 请求方法，当然你可以自己定义
            if (!config.url) return;
            pending.push({
                u: config.url.split("?")[0] + "&" + config.method,
                f: c
            }); //config.data为请求参数
        });
        // 头部添加token信息
        if (store.getters["userModule/token"]) {
            config.headers["token"] = store.getters["userModule/token"];
        }
        return config;
    },
    err => {
        // 请求发送错误
        console.log("请求发送错误");
        return Promise.reject(err);
    }
);

// 响应的全局拦截
service.interceptors.response.use(
    response => {
        // 请求结束从数组移除该请求
        _removePending(response.config);
        if (response.status === 200) {
            return _errCodeHandler(response.data);
        } else {
            const err: ResponseErr = _httpErrorHandler(response);
            return Promise.reject(err);
        }
    },
    err => {
        // 响应错误
        return Promise.reject(err);
    }
);
/**
 * 对请求错误代码的处理, 返回值-自定义
 */
function _errCodeHandler(res: any) {
    const { errno } = res;
    switch (errno) {
        case 0:
            return Promise.resolve(res);
        default:
            return Promise.reject(res);
    }
}

// http状态码错误
function _httpErrorHandler(response: AxiosResponse): ResponseErr {
    const { status, statusText } = response;
    const err = {
        status,
        statusText,
        message: ""
    };
    // 这里status：需要和服务器约定统一
    switch (status) {
        case 400:
            err.message = "请求错误";
            break;
        case 401:
            err.message = "未授权，请重新登录，2 秒后将跳转至登录页面";
            break;
        case 403:
            err.message = "拒绝访问";
            break;
        case 404:
            err.message = `请求地址出错: ${response.config.url || "no url"}`;
            break;
        case 408:
            err.message = "请求超时";
            break;
        case 500:
            err.message = "服务器内部错误";
            break;
        case 501:
            err.message = "服务未实现";
            break;
        case 502:
            err.message = "网关错误";
            break;
        case 503:
            err.message = "服务不可用";
            break;
        case 504:
            err.message = "网关超时";
            break;
        case 505:
            err.message = "HTTP版本不受支持";
            break;
        default:
    }
    return err;
}

export default service;
