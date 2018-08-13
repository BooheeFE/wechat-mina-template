/**
 * @desc http server
 * @author simbawu
 * @date 2018-08-06
 */

import './toPromise.js';
import utils from 'util.js';

const DEFAULT_REQUEST_OPTIONS = {
  url: '',
  data: {},
  header: {
    'Content-Type': 'application/json',
    'Client': 'mina'
  },
  method: 'GET',
  dataType: 'json'
};

function httpServer(opt) {
  let options = Object.assign({}, DEFAULT_REQUEST_OPTIONS, opt);
  let {url, data, header, method, dataType} = options;
  let timer = null;
  timer = setTimeout(() => {
    utils.toast('加载中...', 1500, 'loading');
  }, 500);
  return wx.request({
    url: url,
    data: data,
    header: header,
    method: method,
    dataType: dataType
  })
    .then((res) => {
      clearTimeout(timer);
      if (res && res.statusCode === 200 && res.data && res.data.success) {
        return res.data;
      } else if (res && res.statusCode === 200 && res.data) {
        throw new Error(res.data.msg.toString());
      } else {
        throw new Error();
      }
    }).catch(err => {
      clearTimeout(timer);
      if (err.message) {
        utils.alert('提示', err.message);
      } else {
        setTimeout(() => {
          utils.toast('哎呦，网络开小差了≧﹏≦');
        }, 0);
        console.log('err:', err, 'url:', url, 'data:', data);
      }
      throw new Error();
    })
    .finally(() => {
      wx.hideToast();
    });
}

export default httpServer;
