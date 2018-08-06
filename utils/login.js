const app = getApp();
import {getToken} from './request.js';
import {appKey} from '../config/config.js';

function login(callBack) {
  if (!app.globalData.token) {
    wxLogin(callBack);
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

function wxLogin(callBack) {
  wx.login({
    success: function(res) {
      let code = res.code;
      if (code) {
        // 发起网络请求
        getUserInfo(code, callBack);
      } else {
        console.log('获取用户登录态失败！' + res.errMsg);
      }
    },
    fail: function(res) {
      console.log(res);
    }
  });
}

function getUserInfo(code, callBack) {
  wx.getUserInfo({
    withCredentials: true,
    success: function(res) {
      app.globalData.userInfo = res.userInfo;
      getUserToken(code, res, callBack);
    },
    fail: function(error) {
      wx.redirectTo({
        url: '/pages/authorize/authorize'
      });
    }
  });
}
/* eslint-disable */
function getUserToken(code, userDate, callBack) {
  let data = {
    code: code,
    data: userDate.encryptedData,
    iv: userDate.iv,
    app_key: appKey
  }

  getToken(data).then(res => {
    app.globalData.token = res.token;
    typeof callBack === 'function' && callBack();
  });
}

export default login;
