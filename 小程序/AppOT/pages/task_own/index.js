// pages/type2/index.js
const SERVER = require('../../utils/server.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 2,
    params: {
      page: 1,
      pageSize: 10
    },
    data: []
  },


  taskOrderByOpenId: function (type) {
    var that = this;
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 1000
    })
    var that = this
    SERVER.getJSON('/taskOrder/taskOrderByOpenId', {
      'openId': wx.getStorageSync('openid'),
      'state': 0,
      'page': this.data.params.page,
      'pageSize': this.data.params.pageSize
    }, function (res) {
      console.log(res)
      wx.hideToast()
      that.setData({
        data: that.data.data.concat(res.data.content)
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.taskOrderByOpenId()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})