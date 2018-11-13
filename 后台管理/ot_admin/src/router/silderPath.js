import abstract from '@/views/common/abstract.vue'
import user from '@/views/user/user.vue'
import taskUpload from '@/views/task/taskUpload.vue'
import taskManage from '@/views/task/taskManage.vue'
import taskDetail from '@/views/task/taskDetail.vue'
export default [

  {
    path: '/setting',
    name: 'setting',
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
        icon: 'el-icon-loading'
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
          icon: 'el-icon-loading'
        },
        component: taskManage
      }, {
        path: 'taskUpload',
        name: 'taskUpload',
        meta: {
          name: '发布任务',
          auth: false, // 这个字段以后用来验证必须登录才可以查看
          icon: 'el-icon-loading'
        },
        component: taskUpload
      }, {
        path: 'taskDetail/:id',
        name: 'taskDetail',
        meta: {
          name: '任务详情',
          auth: true, // 这个字段以后用来验证必须登录才可以查看
          icon: 'el-icon-loading'
        },
        component: taskDetail
      }

    ]
  }

]
