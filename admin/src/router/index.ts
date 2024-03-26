import {
  RouteRecordRaw, 
  createRouter, 
  createWebHashHistory
} from 'vue-router'

const constantRoutes:RouteRecordRaw[] = [
  {
    path:'/',
    redirect:'/dashboard/home'
  },{
    path: '/dashboard',
    name: 'Dashboard',
    meta: { name: '首页' },
    component: () => import('@/layouts/index.vue'),
    children:[
      {
        path: 'home',
        name: 'Home',
        meta: { name: '面板' },
        component: () => import('@/views/home.vue')
      }
    ]
  },{
    path:'/404',
    name:'404',
    component:() => import('@/views/404.vue')
  },{
    path:'/login',
    name:'login',
    component:()=>import('@/views/login.vue')
  }
]

export const BLACK_URLS = [
  '/login'
]

export const sideBars = [
  {
    menuName: "面板",
    menuUrl: "/dashboard/home",
    menuIcon: "iconfont icon-dashboard",
  }
]

const router = createRouter({
  routes:constantRoutes,
  history:createWebHashHistory(),
  scrollBehavior(){
    return { top: 0 }
  }
})

export default router