import { AxiosResponse } from "axios";
import { Tree } from "element-plus/es/components/tree-v2/src/types";

export interface PaginationState {
  pageNum?: number;
  total?: number;
  pageSize?: number;
}

export interface RoleCreate {
  rolename: string;
  remark: string;
}

export interface IMenuOpt {
  menuname: string;
  id: number;
}

export interface ParameterResponse extends AxiosResponse {
  data: any;
  code?: number;
  msg?: string;
}

export interface RoleObj {
  id: number;
  remark: string;
  rolename: string;
}

export interface ExtraTree extends Tree {
  id?: number;
}

export interface IBaseMenu {
  component: string;
  icon: string;
  id: number;
  isParent: true;
  link: string;
  menuname: string;
  parentid: number | string;
}

export interface IMenuObj extends IBaseMenu {
  children: IBaseMenu[];
}

export interface ISideBarBase {
  menuName: string;
  menuUrl: string;
}
export interface ISideBar extends ISideBarBase {
  menuIcon: string;
  children: ISideBarBase[];
}

export interface IUserRuleForm {
  id: string | number;
  num: string | number;
  province: string;
  school: string;
  phone: string;
  gender: number;
  age: number | string;
  grade: string;
  formGrade: number[];
  roleId: number | string;
}

export interface IRoleRuleForm {
  rolename: string;
  remark: string;
}

export interface IMenuRuleForm {
  menuname: string;
  parentid: number | string;
  component: string;
  icon: string;
  link: string;
}

export interface RoleTableRow {
  id: number;
  remark: string;
  rolename: string;
  createdAt: string;
}
export interface IFirmRow {
  id: number;
  name: string;
  addr: string;
}
export interface UserTableRow {
  id: number;
  account: string;
  phone: string;
  gender: number;
  grade: string;
  role: RoleTableRow;
  firm: IFirmRow;
  status: number;
  type: number;
  createdAt: string;
}

export interface TrainData {
  id: number;
  name: string;
  cover: string;
  intro: string;
}

export interface IResource {
  id: number;
  name: string;
  pid: number;
  type: number;
  train: number;
  url: string;
}

export interface IFirmData {
  name: string;
  addr: string;
  id?: number;
}
