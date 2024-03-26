export const setStorage = (key: string, value: any) => {
  if (typeof value !== "object") {
    sessionStorage.setItem(key, value);
  }
  if (
    Object.prototype.toString.call(value) === "[Object object]" ||
    Object.prototype.toString.call(value) === "[object Array]"
  ) {
    sessionStorage.setItem(key, JSON.stringify(value));
  }
};

export const getStorage = (key: string) => {
  return sessionStorage.getItem(key);
};

export const removeStorage = (key: string) => {
  sessionStorage.removeItem(key);
};

export const judgeEquipment = (): boolean => {
  //判断设备类型是否为手机
  let flag = navigator.userAgent.match(
    /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
  );
  return !!flag;
};
