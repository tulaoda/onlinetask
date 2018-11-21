// pages/encash/index.js
const SERVER = require('../../utils/server.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data: [],
    page: 1,
    pageSize: 10,
    value1: '',
    balance: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.findBillByOpenId('数据加载中');
    // this.initValidate();
  },
  formSubmit: function(e) {
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
    this.createBill(e);
  },
  //创建提现记录
  createBill: function(e) {
    // 保存用户信息
    SERVER.getJSON('/bill/createBill', {
      money: e.detail.value.value1,
      openID: wx.getStorageSync('openid')
    }, function(res) {
      if (res.code = "200") {
        wx.showToast({
          title: '提交成功',
          icon: 'success',
          showCancel: false
        })
        setTimeout(function() {
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
  findBillByOpenId: function(message) {
    var that = this;
    wx.showLoading({
      title: message,
    })
    SERVER.getJSON('/bill/findBillByOpenId', {
      'openId': wx.getStorageSync('openid'),
      'page': this.data.page,
      'pageSize': this.data.pageSize
    }, function(res) {
      if (res) {
        wx.hideLoading();
        // complete
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
        that.setData({
          data: that.data.data.concat(res.data.data.bill),
          page: that.data.page + 1,
          balance: res.data.data.balance
        })
        that.initValidate();
      }
    })
  },
  formReset: function() {
    console.log('form发生了reset事件')
  },
  upper: function(e) {
    console.log(e)
  },
  lower: function(e) {
    this.findBillByOpenId('加载更多数据')
  },
  scroll: function(e) {
    // console.log(e)
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


  initValidate() {
    //表单验证初始化
    this.WxValidate = app.WxValidate({
      value1: {
        required: true,
        min: 10,
        max: this.data.balance,
      }
    }, {
      value1: {
        required: '请输入提现金额',
        min: '提现金额不小于10',
        max: `提现金额不大于${this.data.balance} `,
      }
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    this.data.page = 1;
    this.findBillByOpenId('正在刷新数据')
    wx.showNavigationBarLoading() //在标题栏中显示加载
    this.data.data = []
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    this.findBillByOpenId('加载更多数据')
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})