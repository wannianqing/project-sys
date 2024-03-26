import { ActionTree } from "vuex";
import { State } from "./state";
import { userMenusApi } from '@/apis'
import { IMenuObj, ISideBar, ISideBarBase } from '@/utils/types'
import { MutationTypes } from "./constants";
import { sideBars } from '@/router'

export const actions:ActionTree<State, State> = {
  async generateRoutes({ commit }){
    try {
      const result = await userMenusApi()
      const { data: menus } = result
      const syncMenus = generateMenus(menus)
      commit(MutationTypes.SET_ASYNCROUTE,result.data)
      commit(MutationTypes.SET_SIDEBAR,sideBars.concat(syncMenus))
      return result
    } catch (error) {
      
    }
  }
}

function generateMenus(menus:IMenuObj[]){
  let sideMenus:ISideBar[] = []
  menus.forEach((menu:IMenuObj) => {
    let children: ISideBarBase[] = []
    if(menu.children){
      menu.children.forEach((cMenu:any)=>{
        children.push({
          menuName:cMenu.menuname,
          menuUrl:cMenu.link
        })
      })
    }
    sideMenus.push({
      menuName: menu.menuname,
      menuUrl: menu.link,
      menuIcon: menu.icon,
      children: children
    })
  })
  return sideMenus
}