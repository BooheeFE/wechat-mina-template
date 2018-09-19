/**
 * @desc extend & Promise api
 * @author simbawu
 * @date 2018-08-06
 */

let wxKeys = [
  // 存储需要Promise化的接口名字
  'request'
];

// 扩展 Promise 的 finally 功能
Promise.prototype.finally = function(callback) {
  let P = this.constructor;
  return this.then(
    value => P.resolve(callback()).then(() => value),
    reason =>
      P.resolve(callback()).then(() => {
        throw reason;
      })
  );
};
wxKeys.forEach(key => {
  const wxKeyFn = wx[key]; // 将wx的原生函数临时保存下来
  if (wxKeyFn && typeof wxKeyFn === 'function') {
    // 如果这个值存在并且是函数的话，进行重写
    Object.defineProperty(wx, key, {
      get() {
        // 一旦目标对象访问该属性，就会调用这个方法，并返回结果
        // 调用 wx.request({}) 时候，就相当于在调用此函数
        return (option = {}) => {
          // 函数运行后，返回 Promise 实例对象
          return new Promise((resolve, reject) => {
            option.success = res => {
              resolve(res);
            };
            option.fail = res => {
              reject(res);
            };
            wxKeyFn(option);
          });
        };
      }
    });
  }
});