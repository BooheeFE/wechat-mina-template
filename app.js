/**
 * @desc app.js
 * @author simbawu
 * @date 2018-08-06
 */

import utils from './utils/util.js';

App({
  globalData: {
  	openFrom: '', // 小程序打开来源
    token: ''
  },
  onLaunch: function(options) {
  	// 开发者工具启动参数请添加 openFrom=devtools。在根据进行版本类型自动切换host类型时，低版本微信和开发者工具均无法获取envVersion，需添加标示区分
  	this.globalData.openFrom = options.query.openFrom;

    // 检查小程序是否有新版本
    utils.checkUpdate();
  }
})