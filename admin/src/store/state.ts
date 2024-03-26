import { ISideBar } from "@/utils/types";
import { judgeEquipment } from "@/utils";
import { RouteLocationNormalized } from "vue-router";
export interface Tag extends RouteLocationNormalized {
  title?: string;
}

export interface State {
  count: Number;
  collapse: Boolean;
  tagsList: Array<Tag>;
  menus: Array<ISideBar>;
  asyncRoutes: Array<any>;
  userInfo: any;
}

export const state: State = {
  count: 0,
  collapse: judgeEquipment(),
  tagsList: [],
  menus: [],
  asyncRoutes: [],
  userInfo: {},
};
