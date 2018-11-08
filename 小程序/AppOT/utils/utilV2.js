const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
 * wxPromisify 使用promise封装request请求
 * @fn 传入的函数，如wx.request、wx.download
 */
function wxPromisify(fn) {
  return function(obj = {}) {
    return new Promise((resolve, reject) => {
      obj.success = function(res) {
        console.log(res)
        if (res.data.code == 200) {
          return resolve(res)
        } else if (res.data.code == 40003) {
          getOpenid()
        } else {
          wx.hideLoading();
          wx.showModal({
            title: res.data.msg,
            content: "错误码：" + res.data.code,
            showCancel: false,
          })
        }
      }
      obj.fail = function(res) {
        showError()
        return reject(res)
      }
      if(obj instanceof Function)fn(obj) //执行函数，obj为传入函数的参数
    })
  }
}
/**
 * 加载超时后显示网络错误提示
 */
function racePromise(proRequest){
  return Promise.race([
    proRequest,
    new Promise(function (resolve, reject) {
      setTimeout(() => reject(), 5000)
    })
  ])
}

/**
 * 弹窗提示网络错误
 */
function showError(){
  wx.showToast({
    title: '请检查网络连接',
    icon: 'none',
    duration: 1000,
    mask: true,
  })
}

function getOpenid(){
  console.log("执行登录")
  wx.login({
    success: function (res) {
      const proRequest = wxPromisify(wx.request)
      proRequest({
        url: "https://cp.baidingyouji.com/v1/user?code=" + res.code,
        method: 'POST',
      }).then(res => {
        setStorageSync("openid", res.data.data.openid)
      });
    },
  })
}

/**
 * 封装设置缓存函数
 */
function setStorageSync(key, value) {
  try {
    wx.setStorageSync(key, value)
  } catch (e) {
    wx.showToast({
      title: 'storage异常',
      icon: 'loading',
      duration: 1200,
      mask: true,
    })
  }
}

module.exports = {
  URL: "https://cp.baidingyouji.com/v1/",
  formatTime: formatTime,
  wxPromisify: wxPromisify,
  setStorageSync: setStorageSync,
  racePromise: racePromise,
  showError: showError,
}