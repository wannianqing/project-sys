<script lang="ts" setup>
import { menuListApi, menuForRole, roleAddMenu } from '@/apis'
import { ParameterResponse, ExtraTree, RoleObj } from '@/utils/types';
import { ElMessage } from 'element-plus';

const authDialog = ref(false)
const dataSource = ref([])

const getMenuList = ()=> {
  menuListApi().then((res:ParameterResponse) => {
    if(res.code === 200){
      dataSource.value = res.data
    }
  })
}

const checkedArr = ref([] as any)

const getCheckedMenus = (id:number)=> {
  menuForRole({id}).then((res:ParameterResponse) => {
    if(res.code === 200){
      checkedArr.value = res.data
    }
  })
}

const handleCheckChange = (
  data: ExtraTree,
  checked: boolean,
  indeterminate: boolean
) => {
  const { id } = data
  const isInclude = unref(checkedArr).includes(id)
  if(checked && !isInclude){
    checkedArr.value.push(id)
  }
  if(!checked && isInclude){
    const idx = unref(checkedArr).findIndex((item:any) => item === id)
    checkedArr.value.splice(idx,1)
  }
}
const rowObj = ref()
const submit = ()=> {
  roleAddMenu({
    roleid: rowObj.value.id,
    menuIds:unref(checkedArr)
  }).then((res:ParameterResponse) => {
    if(res.code === 200){
      ElMessage.success('授权成功')
      authDialog.value = false
    }
  })
}

const openMenuTree = async (row:RoleObj) => {
  rowObj.value = row
  await getMenuList()
  authDialog.value = true
  await getCheckedMenus(row.id)
}

const beforeClose = (done: () => void)=> {
  close()
  done()
}
const close = ()=> {
  checkedArr.value = []
  console.log(checkedArr.value,66666)
  rowObj.value = {}
  authDialog.value = false
}

defineExpose({
  openMenuTree
})
</script>
<template>
  <el-dialog v-model="authDialog" title="分配权限" :before-close="beforeClose">
    <div class="auth-dialog-box">
      <el-tree
        :data="dataSource"
        node-key="id"
        :props="{
          label:'menuname'
        }"
        default-expand-all
        show-checkbox
        :expand-on-click-node="false"
        :default-checked-keys="checkedArr"
        @check-change="handleCheckChange"
      >
      </el-tree>
    </div>
    <template #footer>
      <el-button @click="close">取消</el-button>
      <el-button type="primary" @click="submit">确定</el-button>
    </template>
  </el-dialog>
</template>