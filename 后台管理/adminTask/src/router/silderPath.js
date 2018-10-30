import abstract from '@/views/common/abstract.vue'
import user from '@/views/setting/user.vue'
import goodList from '@/views/goods/good-list.vue'
import orderList from '@/views/orders/order-list.vue'
import orderList2 from '@/views/orders/order-list_2.vue'

export default [{
  path: '/setting',
  name: 'setting',
  meta: {
    name: '用户管理',
    auth: false, // 这个字段以后用来验证必须登录才可以查看
    icon: 'el-icon-caret-bottom'
  },
  component: abstract,
  children: [{
    path: 'user',
    name: 'setting',
    meta: {
      name: '用户列表',
      auth: false, // 这个字段以后用来验证必须登录才可以查看
      icon: 'el-icon-loading'
    },
    component: user
  }]

},
{
  path: '/runningMan',
  name: 'runningMan',
  meta: {
    name: '跑男管理',
    auth: false, // 这个字段以后用来验证必须登录才可以查看
    icon: 'el-icon-caret-bottom'
  },
  component: abstract,
  children: [{
    path: 'list',
    name: 'runningMan',
    meta: {
      name: '跑男列表',
      auth: false, // 这个字段以后用来验证必须登录才可以查看
      icon: 'el-icon-loading'
    },
    component: goodList
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
