// pages/type3/index.js
const SERVER = require('../../utils/server.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    visible: false,
    data: '',
    tmpurl: '', // 图片临时存放
  },

  // 弹出对话框
  handleOpen(e) {
    console.log(e.currentTarget.dataset.imgurl)
    const imgUrl = e.currentTarget.dataset.imgurl
    this.setData({
      visible: true,
      tmpurl: imgUrl
    })
  },
  // 用户点击对话框
  handleClickOK() {
    this.setData({
      visible: false
    })
    this.saveImgToPhotosAlbumTap()
  },
  handleClickCancel() {
    this.setData({
      visible: false
    })
  },

  saveImgToPhotosAlbumTap: function(e) {
    var that = this
    console.log(this)
    wx.downloadFile({
      url: that.data.tmpurl,
      success: function(res) {
        console.log(res)
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: function(res) {
            console.log(res)
          },
          fail: function(res) {
            console.log(res)
            console.log('fail')
          }
        })
      },
      fail: function() {
        console.log('fail')
      }
    })
  },

  // 复制到剪切板
  setClipboardData(e) {
    console.log(e.currentTarget.dataset.content)
    wx.setClipboardData({
      data: e.currentTarget.dataset.content,
      success(res) {
        wx.getClipboardData({
          success(res) {
            console.log(res.data) // data
          }
        })
      }
    })
  },


  //领取任务

  createTask(e) {
    let taskId = e.currentTarget.dataset.taskid;
    SERVER.getJSON('/taskOrder/createTaskOrder', {
      taskId: taskId,
      openId: wx.getStorageSync('openid')
    }, function(res) {
      if (res.data.code == 200) {
        setTimeout(function() {
          wx.switchTab({
            url: '../index/index'
          })
        }, 1000)
        wx.showToast({
          title: '领取成功',
          icon: 'success',
          duration: 1000
        })

      }
      console.log(res)

    })

  },
  findTaskBYTaskId: function(option) {
    var that = this;
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 1000
    })
    var that = this
    SERVER.getJSON('/task/findTaskBYTaskId', {
      'taskId': option.taskId,
    }, function(res) {
      console.log(res)
      wx.hideToast()
      that.setData({
        data: res.data.task
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(option) {
    this.findTaskBYTaskId(option);

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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})