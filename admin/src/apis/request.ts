import axios from "axios";
import type { AxiosInstance, AxiosRequestConfig } from "axios";
import { ElMessage } from "element-plus";
import { encrypt } from "@/utils/encrypt";
import { getStorage, removeStorage } from "@/utils";
import { useRouter } from "vue-router";
import DOMPurify from "dompurify";
const router = useRouter();

type RequestCustomConfig = {
  isCrypto?: Boolean;
  isPurify?: Boolean;
};

const WHITE_URL = ['/public/upload']

const BASEURL = import.meta.env.VITE_BASEURL;

function createInstance(
  axiosConfig: AxiosRequestConfig,
  customConfig?: RequestCustomConfig
) {
  const request: AxiosInstance = axios.create({
    baseURL: BASEURL,
    timeout: 60 * 1000 * 5,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });

  const customOpt = Object.assign(
    { isCrypto: false, isPurify: true },
    customConfig
  );

  request.interceptors.request.use((config) => {
    if (customOpt.isCrypto) {
      // 加密
      config.data = { data: encrypt(JSON.stringify(config.data)) };
      console.log(config.data, 22);
    }
    const url = config.url
    const isContain = url && WHITE_URL.includes(url)
    if (customOpt.isPurify && !isContain) {
      if (config.method === "post" && config.data) {
        let dataStr = JSON.stringify(config.data);
        config.data = JSON.parse(DOMPurify.sanitize(dataStr));
      }
      if (config.method === "get" && config.params) {
        for (let key in config.params) {
          config.params[key] = DOMPurify.sanitize(String(config.params[key]));
        }
      }
    }
    const token = getStorage("token");
    if (token) {
      config.headers.authorization = "Bearer " + token;
    }

    return config;
  });

  request.interceptors.response.use(
    (response) => {
      return response.data;
    },
    (error) => {
      let message = "";
      if (error && error.response) {
        switch (error.response.status) {
          case 401:
            message = "未登录，请先登录";
            removeStorage("token");
            removeStorage("sidebars");
            removeStorage("staticMenu");
            router.push({ path: "/login" });
            break;
          case 403:
            message = "您没有权限操作！";
            break;
          case 404:
            message = "资源路径不存在！";
            break;
          case 400:
            message = error.response.data.msg;
            break;
          case 500:
            message = error.response.data.msg;
            break;
          default:
            message = "服务器错误";
            break;
        }
      }
      ElMessage({ type: "error", message, duration: 1000 });
      return Promise.reject(error);
    }
  );

  return request(axiosConfig);
}

export const server = (() => {
  let history: Array<string> = [];
  return function (
    config: AxiosRequestConfig,
    customConfig?: RequestCustomConfig
  ) {
    const { url } = config;
    if (history.includes(url!)) {
      return Promise.reject({ msg: "请求已提交" });
    }
    history.push(url!);
    return createInstance({
      ...config,
    }).finally(() => {
      const idx = history.indexOf(url!);
      history.splice(idx, 1);
    });
  };
})();

export default createInstance;
