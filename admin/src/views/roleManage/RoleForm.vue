<script lang="ts" setup>
import { createRoleApi } from '@/apis'
import { ParameterResponse, IRoleRuleForm } from '@/utils/types';
import { FormInstance, FormRules } from 'element-plus';
const emits = defineEmits<{
  (e: "success"): void;
}>();

const formRef = ref<FormInstance>()
const roleForm = reactive<IRoleRuleForm>({
  rolename: '',
  remark: '',
})
const formRules = reactive<FormRules<IRoleRuleForm>>({
  rolename:[{ required: true, message: '请输入角色名称', trigger: 'blur' }],
  remark:[{ required: true, message: '请输入角色说明，如：超级管理员', trigger: 'blur' }]
})
const close = (formEl: FormInstance | undefined = formRef.value)=> {
  if (!formEl) return
  formEl.resetFields()
}
const submit = async (formEl: FormInstance | undefined = formRef.value)=> {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      createRoleApi(roleForm).then((res:ParameterResponse) => {
        if(res.code == 200){
          emits('success');
          close(formEl)
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
  <el-form label-width="90px" :model="roleForm" ref="formRef" :rules="formRules">
    <el-form-item label="角色名称" prop="rolename">
      <el-input v-model="roleForm.rolename" placeholder="输入账户名称"></el-input>
    </el-form-item>
    <el-form-item label="角色说明" prop="remark">
      <el-input v-model="roleForm.remark" placeholder="如：超级管理员"></el-input>
    </el-form-item>
  </el-form>
</template>