// pages/authorize/authorize.js
import login from '../../utils/login.js';
import {toast} from '../../utils/util.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  authorize() {
    let self = this;
    wx.openSetting({
      success: (res) => {
        if (res.authSetting['scope.userInfo']) {
          wx.showModal({
            title: '提示',
            content: '请点击一键授权',
            showCancel: false
          });
        } else {
          wx.showModal({
            title: '提示',
            content: '请切换到“允许”！',
            showCancel: false,
            success: function() {
              self.authorize();
            }
          });
        }
      }
    });
  },

  getUserInfo(e) {
    let self = this;
    let userData = e.detail;
    if (!userData.encryptedData) {
      self.authorize();
    } else {
      login(() => {
        toast('授权成功！', 1500, 'success');
        setTimeout(() => {
          wx.navigateBack();
        }, 1500);
      }, userData);
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  }
});