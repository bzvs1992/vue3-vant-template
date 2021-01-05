import { AxiosRequestConfig } from "axios";
/**
 * 对于一些请求需要单独处理
 * @param {Object} options
 * @param {Number} options.type  header中contenttype的几种类型, 如下
 */
export interface Options extends AxiosRequestConfig {
    type?: OptionsType;
}

/**
 * 对于部分请求是需要修改header的配置的
 * @param {*} type
 */
export type OptionsType = 0 | 1 | 2 | 3 | 4;

/**
 * 响应错误(非200)的时候参数
 */
export interface ResponseErr {
    status: number;
    statusText: string;
    message: string;
}
/**
 * 浏览器类型
 */
export enum UA {
    radarIOS, // iOS内置
    radarAndroid, // 安卓内置
    pc, // 电脑端
    wx,
    wxMin, // 微信和微信公众号内置
    Android,
    iOS, // 普通安卓或iOS浏览器
    other
}
