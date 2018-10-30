import Vue from 'vue'
import Router from 'vue-router'
import home from '@/views/home.vue'
import login from '@/views/login.vue'
import notFound from '@/views/error/404.vue'
import sliderPath from './silderPath.js'
Vue.use(Router)

export default new Router({
  routes: [{
    path: '/login',
    name: 'login',
    meta: {
      name: '登录'
    },
    component: login
  },
  {
    path: '/',
    name: 'home',
    meta: {
      name: '首页',
      auth: false
    },
    component: home,
    children: sliderPath
  }, {
    path: '/404',
    name: '404',
    meta: {
      name: '404'
    },
    component: notFound
  }, {
    path: '*',
    redirect: '/404'
  }
  ]
})
