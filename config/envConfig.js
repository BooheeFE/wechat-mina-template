/**
 * @desc 根据环境区分配置
 * @author simbawu
 * @date 2018-08-06
 */

/*
 * 环境切换
 */
const env = 'production';
// const env = 'qa';

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
}

export default {
	mainHost: envConfig[env].mainHost
}