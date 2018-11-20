// pages/encash/index.js
const SERVER = require('../../utils/server.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data: [],
    page: 1,
    pageSize: 10,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.findBillByOpenId('数据加载中')
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
          page: that.data.page + 1
        })
      }
    })
  },

  upper: function(e) {
    console.log(e)
  },
  lower: function(e) {
    this.findBillByOpenId('加载更多数据')
  },
  scroll: function(e) {
    console.log(e)
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