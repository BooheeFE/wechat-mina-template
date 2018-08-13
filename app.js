/**
 * @desc app.js
 * @author simbawu
 * @date 2018-08-06
 */

import utils from './utils/util.js';

App({
  globalData: {
    token: ''
  },
  onLaunch: function() {
    // 检查小程序是否有新版本
    utils.checkUpdate();
  }
})