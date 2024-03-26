import { UserTableRow } from "@/utils/types"
import dayjs from "dayjs"

export default ()=> {
  const roleFormatter = (row:UserTableRow) => {
    return row.role.remark
  }
  const formatDate = (row:UserTableRow)=> {
    return dayjs(row.createdAt).format('YYYY-MM-DD HH:mm')
  }
  const genderFormatter = (row:UserTableRow)=> {
    switch(row.gender){
      case 1:
        return '男';
      case 2:
        return '女';
    }
  }
  const statusFormatter = (row:UserTableRow)=> {
    switch(row.status){
      case 1:
        return '停用';
      case 2:
        return '启用';
    }
  }
  const typeFormatter = (row:UserTableRow)=> {
    if(row.firm){
      return row.firm.name
    }
  }
  const firmFormatter = (row:UserTableRow)=> {
    switch(row.type){
      case 1:
        return '个人';
      case 2:
        return '机构';
    }
  }
  return [
    { prop:'username', label:'用户姓名' },
    { prop:'id', label:'用户id' },
    { prop:'age', label:'年龄' },
    { prop:'gender', label:'性别', formatter:genderFormatter },
    { prop:'phone', label:'手机号', width:150 },
    { prop:'province', label:'城市' },
    { prop:'school', label:'学校' },
    { prop:'grade', label:'年级' },
    { prop:'type', label:'账号类型', formatter:typeFormatter },
    { prop:'status', label:'账号状态', formatter:statusFormatter },
    { prop:'firmid', label:'机构企业', formatter:firmFormatter },
    { prop:'remark', label:'所属角色', formatter:roleFormatter },
    { prop:'createdAt', label:'创建时间', formatter:formatDate, width:200 },
    { isOperate:true, label:'操作', width:200, fixed:'right' }
  ]
}