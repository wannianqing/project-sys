<script lang="ts" setup>
import dayjs from 'dayjs'
import { Plus } from '@element-plus/icons-vue'
import Pagination from '@/components/pagination.vue'
import Drawer from '@/components/drawer.vue'
import CustomTable from '@/components/CustomTable.vue'
import UserForm from './UserForm.vue'
import resetPwd from './resetPwd.vue'
import { ParameterResponse, PaginationState, IUserRuleForm, UserTableRow } from '@/utils/types'
import { userDeleteApi, userListByPage } from '@/apis'
import { ElMessage, ElMessageBox } from 'element-plus'
import useColumn from './columns'
type PageQuery = {
  pageNum:number;
  pageSize:number;
  total:number;
  username?:string;
}
const userList = ref([])
const pageQuery = ref({
  pageNum:1,
  pageSize:10,
  total: 0
} as PageQuery)
const username = ref('')
const search = ()=> {
  pageQuery.value.username = username.value
  getUserList()
}
const getUserList = () => {
  userListByPage(unref(pageQuery)).then((res:ParameterResponse) => {
    if(res.code === 200){
      userList.value = res.data.list
      pageQuery.value.total = res.data.total
    }
  })
}
getUserList()
const handleChange = (val: PaginationState) => {
  pageQuery.value = Object.assign(pageQuery.value, { ...val })
  getUserList()
}
const drawerVisible = ref(false)
const handleSuccess = ()=> {
  drawerVisible.value = false
  getUserList()
}
const userFormRef = ref()
const formData = ref<IUserRuleForm>({
  id:'',
  num:'',
  province:'',
  school: '',
  phone: '',
  gender: 1,
  age: '',
  grade: '',
  roleId: '',
  formGrade:[]
})
const drawerCancel = ()=> {
  drawerVisible.value = false
  userFormRef.value.close()
}
const openDrawer = (row:IUserRuleForm)=> {
  if(!row) return
  formData.value = row
  console.log(formData.value,77777)
  drawerVisible.value = true
}
const handleDelete = (row:IUserRuleForm)=> {
  ElMessageBox.confirm('确认删除吗？删除后内容不可恢复','删除',{
    confirmButtonText: '删除',
    confirmButtonClass: 'confirm-button-ok',
    cancelButtonText: '取消'
  }).then(() => {
    userDeleteApi({id:row.id}).then((res:ParameterResponse) => {
      if(res.code === 200){
        ElMessage.success('删除成功')
        getUserList()
      }else{
        ElMessage.warning(res.msg)
      }
    })
  }).catch(() => {
    ElMessage.info('取消删除')
  })
}

const pwdVisible = ref(false)
const resetid = ref(0 as number|string)
const handleResetPwd = (row:IUserRuleForm)=> {
  resetid.value = row.id
  pwdVisible.value = true
}
const resetSucc = ()=> {
  getUserList()

}
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
const gradeArrs = [
  ['小学', '初中','高中'],
  [
    '一年级', '二年级', '三年级', '四年级', '五年级', '六年级', 
    '七年级', '八年级', '九年级', '高一', '高二', '高三'
  ]
]
const gradeFormatter = (row:UserTableRow)=> {
  if(!row.grade) return ''
  const gradeArray = row.grade.split(',')
  const index1:number = +gradeArray[0]
  const index2:number = +gradeArray[1]
  const gradeText = `${gradeArrs[0][index1]},${gradeArrs[1][index2]}`
  return gradeText
}
const typeFormatter = (row:UserTableRow)=> {
  switch(row.type){
    case 1:
      return '个人';
    case 2:
      return '机构';
  }
}
const firmFormatter = (row:UserTableRow)=> {
  if(row.firm){
    return row.firm.name
  }
}
</script>
<template>
  <div class="main-page">
    <el-card shadow="always" body-class="search-card">
      <div class="space-content">
        <el-form label-width="80px" :inline="true">
          <el-form-item>
            <el-input v-model="username" placeholder="输入姓名搜索" clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="mg-t10">
      <el-table height="calc(100vh - 345px)" :data="userList" :default-sort="{ prop: 'num', order: 'descending' }">
        <el-table-column label="序号" prop="num" sortable></el-table-column>
        <el-table-column label="用户姓名" prop="username"></el-table-column>
        <el-table-column label="用户id" prop="id"></el-table-column>
        <el-table-column label="年龄" prop="age"></el-table-column>
        <el-table-column label="性别" prop="gender" :formatter="genderFormatter"></el-table-column>
        <el-table-column label="手机号" prop="phone" width="150"></el-table-column>
        <el-table-column label="城市" prop="province"></el-table-column>
        <el-table-column label="学校" prop="school"></el-table-column>
        <el-table-column label="年级" prop="grade" :formatter="gradeFormatter" width="120"></el-table-column>
        <el-table-column label="账号类型" prop="type" :formatter="typeFormatter"></el-table-column>
        <el-table-column label="账号状态" prop="status" :formatter="statusFormatter"></el-table-column>
        <el-table-column label="机构企业" prop="firmid" :formatter="firmFormatter"></el-table-column>
        <el-table-column label="所属角色" prop="remark" :formatter="roleFormatter"></el-table-column>
        <el-table-column label="创建时间" prop="createdAt" :formatter="formatDate" width="200"></el-table-column>
        <el-table-column label="操作" width="200" fixed="right">
          <template #default="scope">
            <div>
              <el-button type="primary" @click="openDrawer(scope.row)">编辑</el-button>
              <el-button type="danger" @click="handleDelete(scope.row)">删除</el-button>
            </div>
            <div class="btn-group mg-t10">
              <el-button type="primary" @click="handleResetPwd(scope.row)">重置密码</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <Pagination :pagination="pageQuery" @change="handleChange" />
    </el-card>
    <Drawer
      v-model:drawerVisible="drawerVisible" 
      title="修改用户"
      @cancel="drawerCancel"
      @submit="userFormRef.submit()"
    >
      <template #content>
        <user-form ref="userFormRef" :data="formData" @success="handleSuccess"></user-form>
      </template>
    </Drawer>
    <reset-pwd v-model:visible="pwdVisible" :resetid="resetid" @success="resetSucc"></reset-pwd>
  </div>
</template>
<style lang="scss" scoped>
</style>