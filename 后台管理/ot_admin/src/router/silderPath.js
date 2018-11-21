import abstract from '@/views/common/abstract.vue'
import user from '@/views/user/user.vue'
import taskUpload from '@/views/task/taskUpload.vue'
import taskManage from '@/views/task/taskManage.vue'
import taskDetail from '@/views/task/taskDetail.vue'
import encash from '@/views/bill/encash.vue'
import encashFinish from '@/views/bill/encashFinish.vue'
import bannerManage from '@/views/banner/bannerManage.vue'
import bannerUpload from '@/views/banner/bannerUpload.vue'
export default [

  {
    path: '/user',
    name: 'user',
    meta: {
      name: '用户管理',
      auth: false, // 这个字段以后用来验证必须登录才可以查看
      icon: 'el-icon-menu'
    },
    component: abstract,
    children: [{
      path: 'user',
      name: 'user',
      meta: {
        name: '用户列表',
        auth: false, // 这个字段以后用来验证必须登录才可以查看
        icon: 'el-icon-news'
      },
      component: user
    }]

  },
  {
    path: '/task',
    name: 'task',
    meta: {
      name: '任务管理',
      auth: false, // 这个字段以后用来验证必须登录才可以查看
      icon: 'el-icon-menu'
    },
    component: abstract,
    children: [

      {
        path: 'taskManage',
        name: 'taskManage',
        meta: {
          name: '任务列表',
          auth: false, // 这个字段以后用来验证必须登录才可以查看
          icon: 'el-icon-tickets'
        },
        component: taskManage
      }, {
        path: 'taskUpload',
        name: 'taskUpload',
        meta: {
          name: '发布任务',
          auth: false, // 这个字段以后用来验证必须登录才可以查看
          icon: 'el-icon-upload'
        },
        component: taskUpload
      }, {
        path: 'taskDetail/:id',
        name: 'taskDetail',
        meta: {
          name: '任务详情',
          auth: true, // 这个字段以后用来验证必须登录才可以查看
          icon: 'el-icon-search'
        },
        component: taskDetail
      }

    ]
  }, {
    path: '/bill',
    name: 'bill',
    meta: {
      name: '用户提现',
      auth: false, // 这个字段以后用来验证必须登录才可以查看
      icon: 'el-icon-menu'
    },
    component: abstract,
    children: [{
      path: 'encash',
      name: 'encash',
      meta: {
        name: '未提现',
        auth: false, // 这个字段以后用来验证必须登录才可以查看
        icon: 'el-icon-goods'
      },
      component: encash
    }, {
      path: 'encashFinish',
      name: 'encashFinish',
      meta: {
        name: '已提现',
        auth: false, // 这个字段以后用来验证必须登录才可以查看
        icon: 'el-icon-sold-out'
      },
      component: encashFinish
    }]

  }, {
    path: '/banner',
    name: 'banner',
    meta: {
      name: '轮播管理',
      auth: false, // 这个字段以后用来验证必须登录才可以查看
      icon: 'el-icon-menu'
    },
    component: abstract,
    children: [{
      path: 'bannerList',
      name: 'bannerList',
      meta: {
        name: '轮播图列表',
        auth: false, // 这个字段以后用来验证必须登录才可以查看
        icon: 'el-icon-goods'
      },
      component: bannerManage
    }, {
      path: 'bannerUpload',
      name: 'bannerUpload',
      meta: {
        name: '轮播图上传',
        auth: false, // 这个字段以后用来验证必须登录才可以查看
        icon: 'el-icon-sold-out'
      },
      component: bannerUpload
    }]

  },

]
