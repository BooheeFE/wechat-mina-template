/**
 * @desc 根据环境区分配置
 * @author simbawu
 * @date 2018-08-06
 */

/**
 * 获取小程序环境
 * @function
 * @param {Number} defaultEnv
 * @return {string}
 */
function getEnv(defaultEnv) {
  // envVersion值有：正式版 release、体验版 trial、开发版 develop、开发者工具 undefined、低版本微信 undefined
  let envVersion = __wxConfig.envVersion;
  let env = 'production';
  const envList = ['production', 'qa'];

  if (envVersion === 'trial' || envVersion === 'develop' || wx.getStorageSync('env') === 'qa') {
    env = 'qa';
  } else if (envVersion === 'release') {
    env = 'production';
  }

  env = envList[defaultEnv] || env;

  return env;
}

// 如果希望强制使用某个环境，可手动在getEnv内传入数字，0 => production，1 => qa，不传表示通过小程序版本类型自动决定。
const env = getEnv();

/*
 * 环境配置
 */
const envConfig = {
  production: {
    // 项目接口域名
    mainHost: 'https://github.com/BooheeFE/'
  },
  qa: {
    // 项目接口域名
    mainHost: 'https://github.com/BooheeFE/'
  }
};

const { mainHost } = envConfig[env];

export {
  mainHost
};