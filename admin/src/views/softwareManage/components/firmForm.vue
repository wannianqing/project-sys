<script lang="ts" setup>
import { createFirmApi } from '@/apis'
import { ParameterResponse, IFirmData } from '@/utils/types';
import { FormInstance, FormRules } from 'element-plus';
const emits = defineEmits<{
  (e: "success"): void;
}>();

const formRef = ref<FormInstance>()
const dataForm = reactive<IFirmData>({
  name: '',
  addr: '',
})
const formRules = reactive<FormRules<IFirmData>>({
  name:[{ required: true, message: '请输入企业名称', trigger: 'blur' }],
  addr:[{ required: true, message: '请输入企业地址', trigger: 'blur' }]
})
const close = (formEl: FormInstance | undefined = formRef.value)=> {
  if (!formEl) return
  formEl.resetFields()
}
const submit = async (formEl: FormInstance | undefined = formRef.value)=> {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      createFirmApi(dataForm).then((res:ParameterResponse) => {
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
  <el-form label-width="90px" :model="dataForm" ref="formRef" :rules="formRules">
    <el-form-item label="企业名称" prop="name">
      <el-input v-model="dataForm.name" placeholder="输入企业名称"></el-input>
    </el-form-item>
    <el-form-item label="企业地址" prop="addr">
      <el-input v-model="dataForm.addr" placeholder="如：超级管理员"></el-input>
    </el-form-item>
  </el-form>
</template>