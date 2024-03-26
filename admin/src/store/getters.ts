import { GetterTree } from 'vuex'
import { State } from './state'
import { getStorage } from '@/utils'

export const getters: GetterTree<State, State> = {
  getSidebars(state) {
    const menusStr = getStorage('sidebars')
    if(!menusStr) {
      return state.menus
    }
    const menus = JSON.parse(menusStr)

    return menus || state.menus
  },
  getSyncRoutes(state){
    const routesStr = getStorage('staticMenu')
    if(!routesStr) {
      return state.asyncRoutes
    }
    const routes = JSON.parse(routesStr)
    return routes || state.asyncRoutes
  }
}