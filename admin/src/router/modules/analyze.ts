export default {
  path: '/analyze',
  name: 'Analyze',
  meta: { name: '数据管理' },
  component: () => import('@/layouts/index.vue'),
  children:[
    {
      path: 'data',
      name:'Data',
      meta: { name: '数据分析' },
      component: () => import('@/views/dataManage/data.vue')
    },{
      path: 'track',
      name:'Track',
      meta: { name: '训练追踪' },
      component: () => import('@/views/dataManage/track.vue')
    }
  ]
}