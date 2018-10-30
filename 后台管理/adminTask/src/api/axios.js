import axios from 'axios'

const instance = axios.create({
  // baseURL: 'http://www.tulaoda.top/api/NetSDPP-1.0',//生产环境
  baseURL: '/api', // 开发环境
  timeout: 10000
})
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
// instance.defaults.headers.post['Content-Type'] = 'application/json';

export default instance
