import { MutationTree } from "vuex";
import { State } from './state'
import { MutationTypes } from './constants'
import { setStorage } from "@/utils";
export const mutations:MutationTree<State> = {
  [MutationTypes.SET_COUNT](state, count) {
    state.count = count
  },
  [MutationTypes.SET_COLLAPSE](state, collapse) {
    state.collapse = collapse
  },
  [MutationTypes.PUSH_TAGSLIST](state, tag) {
    state.tagsList.push(tag)
  },
  [MutationTypes.DELETE_TAG](state, index) {
    state.tagsList.splice(index,1)
  },
  [MutationTypes.SET_SIDEBAR](state, menus){
    setStorage('sidebars',menus)
    state.menus = menus
  },
  [MutationTypes.SET_ASYNCROUTE](state, menus){
    setStorage('staticMenu',menus)
    state.asyncRoutes = menus
  },
  [MutationTypes.SET_USERINFO](state, useInfo){
    state.userInfo = useInfo
  }
}