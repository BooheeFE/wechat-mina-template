/**
 * @desc request api
 * @author simbawu
 * @date 2018-08-06
 */

import {mainHost} from '../config/envConfig.js';
import httpServer from './httpServer.js';

//获取token
let getToken = function getToken(data) {
  return httpServer({
    url: `${mainHost}/api/v1/wechat/sessions`,
    data: data,
    method: 'POST',
  })
}

/*
 * 导出对外开放接口
 */
export {
  getToken
}