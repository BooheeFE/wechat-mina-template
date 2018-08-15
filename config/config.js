/*
 * @desc 系统配置
 * @author simbawu
 * @date 2018-08-06
 */

import envConfig from './env-config.js';
const { mainHost } = envConfig;

// 默认接口出错弹窗文案
const defaultAlertMessage = '好像哪里出了小问题~ 请再试一次~';

// app_key
const app_key = 'sports';

export {
  defaultAlertMessage,
  app_key
};