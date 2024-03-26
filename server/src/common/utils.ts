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

export const customMsg = (msg,code) => {
  return {
    msg,
    code
  }
}

export const listToJson = (data) => {
  return data.map(item => item.toJSON());
}

export const listToTree = (mid,pid,list) => {
  function exists(list,parentId){
    for(var i=0;i<list.length;i++){
      if(list[i][mid] == parentId) return true;
    }
    return false
  }

  var nodes = [];
  for(var i=0;i<list.length;i++){
    var raw = list[i];
    if(!exists(list,raw[pid])){
      nodes.push(raw)
    }
  }

  for(var i=0;i<nodes.length;i++){
    nodes[i].children = [];
    for(var j=0;j<list.length;j++){
      if(nodes[i][mid]==list[j][pid]){
        nodes[i].children.push(list[j])
      }
    }
  }
  return nodes;
}

export const transformToArrayToTree = (data, parentid = 0)=> {
  let result = [];
  data.forEach(item => {
    if (item.parentid === parentid) {
      let children = transformToArrayToTree(data, item.id);
      if (children.length > 0) {
          item.children = children;
      }
      result.push({
        id:item.id,
        menuname:item.menuname,
        parentid:item.parentid,
        component:item.component,
        icon:item.icon,
        link:item.link,
        isParent:item.isParent,
        children:item.children
      });
    }
  });
  return result;
}