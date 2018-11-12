// pages/type1/index.js
const SERVER = require('../../utils/server.js')
const WxPay = require('../../utils/wxPay.js')
Page({
  data: {
    startImg: '', //任务开始图片
    startImgUrl: '', //开始地址
    endImg: '', //任务结束图片
    endImgUrl: '', //结束地址
    upImgUrl: 'https://www.tulaoda.top/api/NetOT/upload'
  },
  chooseImage_startImg: function (e) {
    var that = this
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          startImg: res.tempFilePaths
        })
        if (that.data.startImg.length > 0) {
          that.uploadimg({
            url: that.data.upImgUrl, //这里是你图片上传的接口
            path: that.data.startImg //这里是选取的图片的地址数组
          }).then(res2 => {
            let tmp = JSON.parse(res2.data)
            that.setData({
              startImgUrl: tmp.url
            })
          });;
        } else {
          console.log("没有可上传的文件");
        }
      }
    })
  },
  chooseImage_endImg: function (e) {
    var that = this
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          endImg: res.tempFilePaths
        })
        if (that.data.startImg.length > 0) {
          that.uploadimg({
            url: that.data.upImgUrl, //这里是你图片上传的接口
            path: that.data.endImg //这里是选取的图片的地址数组
          }).then(res2 => {
            let tmp = JSON.parse(res2.data)
            that.setData({
              endImgUrl: tmp.url
            })
            console.log(res2)
          });
        } else {
          console.log("没有可上传的文件");
        }
      }
    })
  },
  previewImage_startImg: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.startImg // 需要预览的图片http链接列表
    })
  },
  previewImage_endImg: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.endImg // 需要预览的图片http链接列表
    })
  },
  uploadimg: function (data) {
    return new Promise((resolve, reject) => {

      var that = this;
      var i = data.i ? data.i : 0, //要上传的图片
        success = data.success ? data.success : 0, //上传成功的个数
        fail = data.fail ? data.fail : 0; //上传失败的个数
      wx.uploadFile({
        url: data.url, //开发者服务器 url
        filePath: data.path[i],
        name: 'picture',
        formData: {
          // 'user': 'test'
        },
        success: function (res) {
          success++;
          resolve(res);
        },
        fail: function (res) {
          fail++;
          reject(res);
        },
        complete: function () {
          i++;
          if (i == data.path.length) {
            console.log("Success：" + success + "-----------Fail" + fail);
          } else {
            data.i = i;
            data.success = success;
            resolve("ceshi");
            data.fail = fail;
            that.uploadimg(data);
          }
        }
      })

    })


  },
  handleClick: function (e) {
    let startImgUrl = this.data.startImgUrl;
    let endImgUrl = this.data.endImgUrl;

    if (startImgUrl == '' && endImgUrl == '') {
      wx.showToast({
        title: "请补充图片信息",
        icon: 'none',
        duration: 2000
      })
      return false;
    }
  }

})