import * as CryptoJS from 'crypto-js'

const cryptKey = CryptoJS.enc.Utf8.parse('KS202120192018..')
const iv = CryptoJS.enc.Utf8.parse('KS202120192018..')

const cryObj = {
  iv: iv,
  mode: CryptoJS.mode.CBC,
  padding: CryptoJS.pad.Pkcs7
}
// 加密方法
export const encrypt = (data:any) => {
  const srcs = CryptoJS.enc.Utf8.parse(data)
  const encrypted = CryptoJS.AES.encrypt(srcs, cryptKey, cryObj)
  return encrypted.toString()
}

// 解密
export const decrypt = (dnValue: string): string => {
  const decryptRes = CryptoJS.AES.decrypt(dnValue, cryptKey, cryObj)
  return decryptRes.toString(CryptoJS.enc.Utf8)
}