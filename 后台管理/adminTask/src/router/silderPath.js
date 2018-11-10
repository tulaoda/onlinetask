import abstract from '@/views/common/abstract.vue'
import user from '@/views/user/user.vue'
import goodList from '@/views/goods/good-list.vue'
import orderList from '@/views/orders/order-list.vue'
import orderList2 from '@/views/orders/order-list_2.vue'
import taskUpload from '@/views/task/taskUpload.vue'
import taskManage from '@/views/task/taskManage.vue'
export default [{
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
    children: [{
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
    }]
  },
  {
    path: '/orders',
    name: 'orders',
    meta: {
      name: '订单管理',
      auth: false, // 这个字段以后用来验证必须登录才可以查看
      icon: 'el-icon-tickets'
    },
    component: abstract,
    children: [{
        path: 'list',
        name: 'orderList',
        meta: {
          name: '已支付',
          auth: false, // 这个字段以后用来验证必须登录才可以查看
          icon: 'el-icon-loading'
        },
        component: orderList
      },
      {
        path: 'list2',
        name: 'orderList2',
        meta: {
          name: '待配送',
          auth: false, // 这个字段以后用来验证必须登录才可以查看
          icon: 'el-icon-loading'
        },
        component: orderList2
      }
    ]
  }     
]
