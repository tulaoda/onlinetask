// index.js
// 获取应用实例
const WxPay = require('../../utils/wxPay.js')
const app = getApp()
const SERVER = require('../../utils/server.js')

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    encashing: '',
    encashTotal: '',
    balance: ''
  },
  onLoad: function() {
    this.getUser();
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  // 获取用户信息
  getUser: function() {
    var that = this
    SERVER.getJSON('/user/findUser', {
      openId: wx.getStorageSync('openid')
    }, function(res) {
      that.setData({
        encashing: res.data.encashing,
        encashTotal: res.data.encashTotal,
        balance: res.data.balance
      })
    })
    // console.log(username + address + phone + school + openid)
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.getUser();
  },

})