<script lang="ts" setup>
import { ElMessage, FormInstance } from 'element-plus';
import { resetPwdApi } from '@/apis'
import { ParameterResponse } from '@/utils/types';
const prop = defineProps<{
  visible:boolean;
  resetid:number|string;
}>()

const emits = defineEmits<{
  (e:"update:visible", value:boolean): void;
  (e:"success"):void;
}>()

const formData = ref({
  password:'',
  confirmPwd:''
})
const repeatPwd = (
  rule:any,
  value:string,
  callback:(v?:Error)=>void
)=>{
  if(value.trim() === ''){
    callback(new Error('确认密码必须填写'))
  }else if(value !== formData.value.password){
    console.log(112)
    callback(new Error('两次输入不一致'))
  }else{
    callback()
  }
}
const rules = reactive({
  password:[{ required: true, message: '请输入新密码', trigger: 'blur' }],
  confirmPwd:[{ validator:repeatPwd, trigger:'blur' }],
})
const formRef = ref<FormInstance>()

const beforeClose = (done:()=>void)=> {
  emits('update:visible',false)
}

const cancel = (formEl: FormInstance | undefined)=> {
  if (!formEl) return
  emits('update:visible',false)
  formEl.resetFields()
}
const submit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      const prams = {
        id:prop.resetid,
        password:formData.value.password
      }
      resetPwdApi(prams).then((res:ParameterResponse) => {
        if(res.code === 200){
          ElMessage.success('重置成功')
          cancel(formEl)
          emits('success')
        }else{
          ElMessage.warning(res.msg)
        }
      })
    } else {
      console.log('error submit!', fields)
    }
  })
}
</script>
<template>
  <el-dialog :model-value="visible" title="重置密码" width="30%" :before-close="beforeClose">
    <el-form :model="formData" :rules="rules" ref="formRef" label-width="90px">
      <el-form-item label="新密码" prop="password">
        <el-input show-password v-model="formData.password" placeholder="请输入新密码"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmPwd">
        <el-input show-password v-model="formData.confirmPwd" placeholder="再次输入密码"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="cancel(formRef)">取消</el-button>
      <el-button type="primary" @click="submit(formRef)">确定</el-button>
    </template>
  </el-dialog>
</template>