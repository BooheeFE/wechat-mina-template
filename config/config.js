/*
 * 环境配置
 * @param {string} mainHost 项目主API域名
 * @param {string} waterHost 配置中心域名
 * @param {Object} projectOptions 配置中心加密参数app_key, app_secret
 */

import envConfig from './envConfig.js';
const { mainHost } = envConfig;

// 默认接口出错弹窗文案
const defaultAlertMessage = '好像哪里出了小问题~ 请再试一次~';

// app_key
const app_key = 'sports';

export {
  defaultAlertMessage,
  app_key
};