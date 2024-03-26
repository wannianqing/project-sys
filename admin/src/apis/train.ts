import { server } from "./request";
import http from "./request";

type DataRecord = Record<string, unknown>;

/** 训练模块 */
export const createTrainApi = (data: DataRecord) => {
  return server({
    url: "/train/create",
    method: "POST",
    data: data,
  });
};

export const trainListApi = (data: DataRecord) => {
  return server({
    url: "/train/list",
    method: "GET",
    params: data,
  });
};

export const updateTrainApi = (data: DataRecord) => {
  return server({
    url: "/train/update",
    method: "POST",
    data: data,
  });
};

export const deleteTrainApi = (data: DataRecord) => {
  return server({
    url: "/train/delete",
    method: "POST",
    data: data,
  });
};

/** 资源 */
export const createAssetsApi = (data: DataRecord) => {
  return server({
    url: "/assets/create",
    method: "POST",
    data: data,
  });
};

export const updateAssetsApi = (data: DataRecord) => {
  return server({
    url: "/assets/update",
    method: "POST",
    data: data,
  });
};

export const listAssetsApi = (data: DataRecord) => {
  return server({
    url: "/assets/list",
    method: "GET",
    params: data,
  });
};

export const deleteAssetsByIdApi = (data: DataRecord) => {
  return server({
    url: "/assets/delete",
    method: "POST",
    data: data,
  });
};
