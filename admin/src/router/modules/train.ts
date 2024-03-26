export default {
  path: '/train',
  name: 'Train',
  meta: { name: '训练管理' },
  component: () => import('@/layouts/index.vue'),
  children:[
    {
      path: 'teacher',
      name:'Teacher',
      meta: { name: '教师培训' },
      component: () => import('@/views/trainManage/teacher.vue')
    },
    {
      path: 'classroom',
      name:'ClassRoom',
      meta: { name: '课堂训练' },
      component: () => import('@/views/trainManage/classRoom.vue')
    },{
      path: 'afterclass',
      name:'Afterclass',
      meta: { name: '课后训练' },
      component: () => import('@/views/trainManage/afterClass.vue')
    },{
      path: 'character',
      name:'Character',
      meta: { name: '品格教育' },
      component: () => import('@/views/trainManage/character.vue')
    }
  ]
}