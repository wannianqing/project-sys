<script lang="ts" setup>
import { createMenuApi, parentMenuApi } from '@/apis';
import { ParameterResponse, IMenuOpt, IMenuRuleForm } from '@/utils/types'
import { FormInstance, FormRules } from 'element-plus';
const emits = defineEmits<{
  (e: "success"): void;
}>();

const formRef = ref<FormInstance>()
const close = (formEl: FormInstance | undefined = formRef.value)=> {
  if (!formEl) return
  formEl.resetFields()
}
const menuOpts = ref<IMenuOpt[]>([])
const getParentMenu = ()=> {
  parentMenuApi().then((res:ParameterResponse) => {
    if(res.code === 200){
      menuOpts.value = res.data
    }
  })
}
getParentMenu()

const menuForm = reactive<IMenuRuleForm>({
  menuname: '',
  parentid: '',
  component: '',
  icon: '',
  link: ''
})
const formRules = reactive<FormRules<IMenuRuleForm>>({
  menuname:[{ required: true, message: '请输入菜单名称', trigger: 'blur' }],
  component:[{ required: true, message: '请输入组件名称', trigger: 'blur' }],
  link:[{ required: true, message: '请输入路由地址', trigger: 'blur' }]
})
const submit = async (formEl: FormInstance | undefined = formRef.value)=> {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      menuForm.parentid = menuForm.parentid === '' ? 0 : menuForm.parentid
      createMenuApi(menuForm).then((res:ParameterResponse) => {
        if(res.code === 200){
          getParentMenu()
          close(formEl)
          emits('success');
        }
      })
    } else {
      console.log('error submit!', fields)
    }
  })
}
defineExpose({
  close, submit
})
</script>
<template>
  <el-form label-width="90px" :model="menuForm" ref="formRef" :rules="formRules">
    <el-row>
      <el-col :span="12">
        <el-form-item label="菜单名" prop="menuname">
          <el-input v-model="menuForm.menuname" placeholder="输入菜单名称"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="父菜单">
          <el-select v-model="menuForm.parentid" class="m-2" placeholder="选择父菜单" size="large">
            <el-option
              v-for="item in menuOpts"
              :key="item.id"
              :label="item.menuname"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="组件名称" prop="component">
          <el-input v-model="menuForm.component" placeholder="输入组件名称"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="icon图标">
          <el-input v-model="menuForm.icon" placeholder="请输入图标class名"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item label="路由地址" prop="link">
      <el-input v-model="menuForm.link" placeholder="输入路由地址"></el-input>
    </el-form-item>
  </el-form>
  <ul class="tips">
    <li>温馨提示：</li>
    <li>1. 子菜单必须选择所属父菜单</li>
    <li>2. icon图标使用iconfont图标的class类名</li>
  </ul>
</template>
<style lang="scss" scoped>
.tips{
  margin-top:150px;
  padding-left:20px;
  color:var(--ma-shallow-font-color);
  font-size:14px;
  li{
    margin-bottom:10px;
    &:first-child{
      color:red;
      margin-bottom:20px;
    }
  }
  
}
</style>