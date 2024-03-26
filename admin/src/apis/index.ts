import { server } from "./request";
import http from "./request";

type DataRecord = Record<string, string | number | number[]>;

/** 角色模块 */
export const createRoleApi = (data: DataRecord) => {
  return server({
    url: "/role/create",
    method: "POST",
    data: data,
  });
};

export const roleListByPage = (data: DataRecord) => {
  return server({
    url: "/role/list",
    method: "GET",
    params: data,
  });
};

export const menuForRole = (data: DataRecord) => {
  return server({
    url: "/role/menuChecked",
    method: "GET",
    params: data,
  });
};

export const roleAddMenu = (data: DataRecord) => {
  return server({
    url: "/role/addMenu",
    method: "POST",
    data: data,
  });
};

export const roleDeleteApi = (data: DataRecord) => {
  return server({
    url: "/role/delete",
    method: "GET",
    params: data,
  });
};

export const roleListAll = () => {
  return server({
    url: "/role/listAll",
    method: "GET",
  });
};
/** 用户模块 */
export const loginUserApi = (data: DataRecord) => {
  return http({
    url: "/user/login",
    method: "POST",
    data: data,
  });
};
export const createUserApi = (data: DataRecord) => {
  return server({
    url: "/user/create",
    method: "POST",
    data: data,
  });
};
export const updateUserApi = (data: DataRecord) => {
  return server({
    url: "/user/update",
    method: "POST",
    data: data,
  });
};
export const resetPwdApi = (data: DataRecord) => {
  return server({
    url: "/user/resetPwd",
    method: "POST",
    data: data,
  });
};

export const userDeleteApi = (data: DataRecord) => {
  return server({
    url: "/user/delete",
    method: "GET",
    params: data,
  });
};

export const userInfoApi = () => {
  return server({
    url: "/user/info",
    method: "GET",
  });
};
export const userListByPage = (data: DataRecord) => {
  return server({
    url: "/user/list",
    method: "GET",
    params: data,
  });
};

export const userMenusApi = () => {
  return server({
    url: "/user/menus",
    method: "GET",
  });
};

/** 菜单模块 */
export const createMenuApi = (data: DataRecord) => {
  return server({
    url: "/menu/add",
    method: "POST",
    data: data,
  });
};

export const parentMenuApi = () => {
  return server({
    url: "/menu/parent/list",
    method: "GET",
  });
};

export const menuListApi = () => {
  return server({
    url: "/menu/list",
    method: "GET",
  });
};

export const uploadFileApi = (params = {}) => {
  return server({
    url: `/public/upload`,
    method: "post",
    data: params,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const createFirmApi = (data: DataRecord) => {
  return server({
    url: "/firm/create",
    method: "POST",
    data: data,
  });
};

export const updateFirmApi = (data: DataRecord) => {
  return server({
    url: "/firm/update",
    method: "POST",
    data: data,
  });
};

export const firmListByPage = (data: DataRecord) => {
  return server({
    url: "/firm/list",
    method: "GET",
    params: data,
  });
};

export const firmDeleteApi = (data: DataRecord) => {
  return server({
    url: "/firm/delete",
    method: "GET",
    params: data,
  });
};

export const firmAllApi = () => {
  return server({
    url: "/firm/all",
    method: "GET",
  });
};

export const scoreListApi = (data: DataRecord) => {
  return server({
    url: "/score/list",
    method: "GET",
    params: data,
  });
};

export const batchScoreApi = (data: DataRecord) => {
  return server({
    url: "/score/batch/create",
    method: "POST",
    data: data,
  });
};

export const scoreListByUseridApi = (data: DataRecord) => {
  return server({
    url: "/score/list/userid",
    method: "GET",
    params: data,
  });
};
