/**
 * @desc login modules
 * @author simbawu
 * @date 2018-08-06
 */

const app = getApp();
import {getToken, getTokenSilent} from './request.js';
import {appKey} from '../config/config.js';

function login(callBack, userData) {
  if (!app.globalData.token) {
    wxLogin(callBack, userData);
  } else {
    wx.checkSession({
      success: function() {
        // session_key 未过期，并且在本生命周期一直有效
        typeof callBack === 'function' && callBack();
      },
      fail: function() {
        // session_key 已经失效，需要重新执行登录流程
        wxLogin(callBack);
      }
    });
  }
}

function wxLogin(callBack, userData) {
  wx.login({
    success: function(res) {
      let code = res.code;
      if (code) {
        // 发起网络请求
        if (userData) {
          getUserToken(code, userData, callBack);
        } else {
          getUserTokenSilent(code, callBack);
        }
      } else {
        console.log('获取用户登录态失败！' + res.errMsg);
      }
    },
    fail: function(res) {
      console.log(res);
    }
  });
}

function getUserToken(code, userDate, callBack) {
  let data = {
    code: code,
    data: userDate.encryptedData,
    iv: userDate.iv,
    app_key: appKey
  };

  getToken(data).then(res => {
    app.globalData.token = res.token;
    typeof callBack === 'function' && callBack();
  });
}

function getUserTokenSilent(code, callBack) {
  let data = {
    code: code,
    app_key: appKey
  };

  getTokenSilent(data).then(res => {
    let token = res && res.token;
    if (token) {
      handleToken(token, callBack);
    } else {
      wx.navigateTo({
        url: '/pages/authorize/authorize'
      });
    }
  });
}

function handleToken(token, callBack) {
  app.globalData.token = token;
  typeof callBack === 'function' && callBack();
}

export default login;