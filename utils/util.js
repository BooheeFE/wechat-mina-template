// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format('yyyy-MM-dd hh:mm:ss.S') ==> 2006-07-02 08:09:04.423
// (new Date()).Format('yyyy-M-d h:m:s.S')      ==> 2006-7-2 8:9:4.18
Date.prototype.format = function(fmt) {
  let o = {
    'M+': this.getMonth() + 1,
    'd+': this.getDate(),
    'h+': this.getHours(),
    'm+': this.getMinutes(),
    's+': this.getSeconds(),
    'q+': Math.floor((this.getMonth() + 3) / 3),
    'S': this.getMilliseconds()
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
    }
  }
  return fmt;
};

import {defaultAlertMsg} from '../config/config.js';

let util = {
  toast(title, duration = 1500, icon = 'none') {
    wx.showToast({
      title: title,
      icon: icon,
      duration: duration
    });
  },
  alert(title = '提示', content = defaultAlertMsg, showCancel = false) {
    if (typeof content === 'object') {
      content = JSON.stringify(content) || defaultAlertMsg;
    }
    wx.showModal({
      title: title,
      content: content,
      showCancel: showCancel
    });
  },
  /**
   * 比较日期时间差
   * @method getDateDiff
   * @param {String} startDate 开始日期.
   * @param {String} endDate 参考版本.
   * @return {number} 返回日期时间差.
   */
  getDateDiff(startDate, endDate) {
    let startTime = new Date(Date.parse(startDate.replace(/-/g, '/'))).getTime();
    let endTime = new Date(Date.parse(endDate.replace(/-/g, '/'))).getTime();
    return (endTime - startTime) / (1000 * 60 * 60 * 24);

  },
  /**
   * 解码二维码参数
   * @method query2Dict
   * @param {String} param 二维码参数.
   * @return {Object} 返回参数键值对.
   */
  query2Dict(param) {
    let dict = {};
    let pattern = /([^?&=]+)=([^&#]*)/g;
    param.replace(pattern, function(rs, $1, $2) {
      let key = decodeURIComponent($1);
      let value = decodeURIComponent($2);
      dict[key] = value;
      return rs;
    });
    return dict;
  },
  /**
   * 在线图片转换为本地地址
   * @method onlineImageToLocal
   * @param {String} onlineImageUrl 在线图片地址.
   * @return {Object} 返回本地地址.
   */
  onlineImageToLocal(onlineImageUrl) {
    return new Promise((resolve, reject) => {
      wx.downloadFile({
        url: onlineImageUrl,
        success: function(res) {
          if (res.statusCode === 200) {
            resolve(res.tempFilePath);
          }
        }
      });
    });
  },
  /**
   * 数据格式检测
   */
  myRegExp: {
    isWeixin: (data, tips = '请填写正确的微信号') => {
      let reg = /[1-9][0-9]{4,}|^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/;
      if (reg.test(data)) {
        return true;
      } else {
        util.toast(tips);
        return false;
      }
    },
    isPhoneNumber: (data, tips = '请填写正确的手机号') => {
      let reg = /^1[0-9]{10}$/;
      if (reg.test(data)) {
        return true;
      } else {
        util.toast(tips);
        return false;
      }
    },
    isFloatNumber: (data, tips = '数字格式不正确哦～') => {
      let reg = /^((?!0)\d+(.\d{1,2})?)$/;
      if (reg.test(data)) {
        return true;
      } else {
        util.toast(tips);
        return false;
      }
    }
  },
  /**
   * 防抖
   * @method debounce
   * @param {function} func 回调函数.
   * @param {String} wait 等待时间.
   * @param {Boolean} immediate 是否立即调用.
   * @return  回调函数结果.
   */
  debounce(func, wait, immediate) {
    let timeout, result;

    return function() {
      let context = this;
      let args = arguments;

      if (timeout) clearTimeout(timeout);
      if (immediate) {
        // 如果已经执行过，不再执行
        let callNow = !timeout;
        timeout = setTimeout(function() {
          timeout = null;
        }, wait);
        if (callNow) result = func.apply(context, args);
      } else {
        timeout = setTimeout(function() {
          result = func.apply(context, args);
        }, wait);
      }
      return result;
    };
  },
  /**
   * 检测小程序更新
   * @method updateManager
   */
  checkUpdate() {
    const updateManager = wx.getUpdateManager();

    updateManager.onCheckForUpdate(function(res) {
      // 请求完新版本信息的回调
      console.log('小程序是否有新版本：', res.hasUpdate);
    });

    updateManager.onUpdateReady(function() {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启小程序？',
        success: function(res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate();
          }
        }
      });
    });

    updateManager.onUpdateFailed(function() {
      // 新的版本下载失败
      console.log('新的版本下载失败');
    });
  },
  /**
   * 获取当前页面path
   * @method getCurrentPage
   * @return {String} 返回当前页面path.
   */
  getCurrentPage() {
    let _currentPage = getCurrentPages();
    let currentPage = _currentPage[_currentPage.length - 1].route;
    return currentPage;
  }
}

export default util;


