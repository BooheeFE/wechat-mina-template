/**
 * @desc request api
 * @author simbawu
 * @date 2018-08-06
 */

import {mainHost} from '../config/env-config.js';
import httpServer from './http-server.js';

// 获取token
let getToken = function(data) {
  return httpServer({
    url: `${mainHost}/api/v1/wechat/sessions`,
    data: data,
    method: 'POST'
  });
};

// 静默获取token
let getTokenSilent = function(data) {
  return httpServer({
    url: `${mainHost}/api/v1/wechat/sessions/silent`,
    data: data,
    method: 'POST'
  });
};

/*
 * 导出对外开放接口
 */
export {
  getToken,
  getTokenSilent
};