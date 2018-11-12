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
    imgArr: ['https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1541147283742&di=fa7c6e1063a2e6a151a3148068c72fdf&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20180318%2F6c7b1e4e835a4c6f94a29d4eeff77254.jpeg',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1541147283742&di=fa7c6e1063a2e6a151a3148068c72fdf&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20180318%2F6c7b1e4e835a4c6f94a29d4eeff77254.jpeg',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1541147283742&di=fa7c6e1063a2e6a151a3148068c72fdf&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20180318%2F6c7b1e4e835a4c6f94a29d4eeff77254.jpeg'
    ]
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

  saveImgToPhotosAlbumTap: function (e) {
    var that = this
    console.log(this)
    wx.downloadFile({
      url: that.data.tmpurl,
      success: function (res) {
        console.log(res)
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: function (res) {
            console.log(res)
          },
          fail: function (res) {
            console.log(res)
            console.log('fail')
          }
        })
      },
      fail: function () {
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
  findTaskBYTaskId: function (option) {
    var that = this;
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 1000
    })
    var that = this
    SERVER.getJSON('/task/findTaskBYTaskId', {
      'taskId': option.taskId,
    }, function (res) {
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
  onLoad: function (option) {
    this.findTaskBYTaskId(option);

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