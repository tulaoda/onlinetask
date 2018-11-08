// index.js
// 获取应用实例
const SERVER = require('../../utils/server.js')
const app = getApp()
Page({
  data: {
    value1: '',
    value2: '',
    value3: '',
    value4: '',
    value5: '',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },

  onLoad: function () {

    this.getUser()
    this.initValidate()
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


  formSubmit: function (e) {
    //提交错误描述
    if (!this.WxValidate.checkForm(e)) {
      const error = this.WxValidate.errorList[0]
      wx.showToast({
        title: `${error.msg} `,
        icon: 'none',
        duration: 2000
      })
      return false
    }
    this.saveUserInfo(e)
  },
  // 获取用户信息
  getUser: function () {
    var that = this
    SERVER.getJSON('/user/findUser', {
      openId: wx.getStorageSync('openid')
    }, function (res) {
      that.setData({
        value1: res.data.name,
        value2: res.data.tel,
        value3: res.data.address,
        value4: res.data.alipay,
        value5: res.data.wechat
      })
    })
    // console.log(username + address + phone + school + openid)
  },


  saveUserInfo: function (e) {
    // 保存用户信息
    SERVER.getJSON('/user/register', {
      name: e.detail.value.value1,
      telephone: e.detail.value.value2,
      address: e.detail.value.value3,
      alipay: e.detail.value.value4,
      wechat: e.detail.value.value5,
      openid: wx.getStorageSync('openid')
    }, function (res) {
      if (res.code = "200") {
        wx.showToast({
          title: '提交成功',
          icon: 'success',
          showCancel: false
        })
        setTimeout(function () {
          wx.switchTab({
            url: '../mine/index'
          })
        }, 1000)
      } else {
        wx.showToast({
          title: '请检查网络连接',
          icon: 'none',
          duration: 1000,
          mask: true,
        })
      }

    })
  },

  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  initValidate() {
    //表单验证初始化
    this.WxValidate = app.WxValidate({
      value1: {
        required: true,
        minlength: 2,
        maxlength: 10,
      },
      value2: {
        required: true,
        tel: true,
      },
      value3: {
        required: true,
        minlength: 2,
        maxlength: 100,
      },
      value4: {
        required: true,
        minlength: 2,
        maxlength: 100,
      },
      value5: {
        required: true,
        minlength: 2,
        maxlength: 100,
      },
    }, {
      value1: {
        required: '请填写您的姓名',
      },
      value2: {
        required: '请填写您的手机号',
      },
      value3: {
        required: '请输入地址',
      },
      value4: {
        required: '请输入支付宝号',
      },
      value5: {
        required: '请输入微信号',
      }
    })
  },


  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  }
})