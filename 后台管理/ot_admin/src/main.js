// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import store from './store'

import 'element-ui/lib/theme-chalk/index.css'
import axios from './api/axios.js'
Vue.prototype.$ajax = axios;
Vue.use(ElementUI)
Vue.config.productionTip = false
router.beforeEach(({
  meta,
  path
}, from, next) => {
  let {
    auth = true
  } = meta // 该路由是否需要登录
  let $user = JSON.parse(sessionStorage.getItem('$user')) || {} // 保存用户登录后信息
  let isLogin = Boolean($user.auth) // true 用户已经登录，false 用户未登录
  // const isLogin = false // true 用户已经登录，false 用户未登录
  if (!auth && !isLogin && path !== '/login') {
    return next({
      path: '/login'
    })
  } else {
    next()
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
