export default {
  path: '/software',
  name: 'Software',
  meta: { name: '软件管理' },
  component: () => import('@/layouts/index.vue'),
  children:[
    {
      path: 'firm',
      name:'Firm',
      meta: { name: '企业管理' },
      component: () => import('@/views/softwareManage/firm.vue')
    },{
      path: 'manage',
      name:'Manage',
      meta: { name: '软件管理' },
      component: () => import('@/views/softwareManage/software.vue')
    }
  ]
}