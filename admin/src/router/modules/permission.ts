export default {
  path: '/permission',
  name: 'Permission',
  meta: { name: '权限管理' },
  component: () => import('@/layouts/index.vue'),
  children:[
    {
      path: 'user',
      name:'User',
      meta: { name: '用户管理' },
      component: () => import('@/views/userManage/index.vue')
    },{
      path: 'role',
      name:'Role',
      meta: { name: '角色管理' },
      component: () => import('@/views/roleManage/index.vue')
    },{
      path: 'menu',
      name:'Menu',
      meta: { name: '菜单管理' },
      component: () => import('@/views/menuManage/index.vue')
    }
  ]
}