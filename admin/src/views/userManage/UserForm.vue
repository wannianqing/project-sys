<script lang="ts" setup>
import { updateUserApi, roleListAll } from '@/apis'
import { ParameterResponse, RoleObj, IUserRuleForm } from '@/utils/types';
import { ElMessage, FormInstance, FormRules } from 'element-plus';

const props = defineProps<{
  data: any;
}>();

const emits = defineEmits<{
  (e: "success"): void;
}>();

const formRef = ref<FormInstance>()
const roleOpts = ref<RoleObj[]>([])
const getRoleList = ()=> {
  roleListAll().then((res:ParameterResponse) => {
    if(res.code === 200){
      roleOpts.value = res.data
    }
  })
}
getRoleList()
const userForm = reactive<IUserRuleForm>({
  id:'',
  num:'',
  province:'',
  school: '二小',
  phone: '',
  gender: 1,
  age: '',
  grade: '',
  formGrade:[],
  roleId: ''
})
const formRules = reactive<FormRules<IUserRuleForm>>({
  province:[{ required: true, message: '请输入城市', trigger: 'blur' }],
  num:[{ required: true, message: '请输入序号', trigger: 'blur' }],
  school:[{ required: true, message: '请输入学校名称', trigger: 'blur' }],
  phone:[{ required: true, message: '请输入用户手机号码', trigger: 'blur' }],
  gender:[{ required: true, message: '请选择性别', trigger: 'change' }],
  age:[{ required: true, message: '请输入年龄', trigger: 'blur' }],
  formGrade:[{ required: true, message: '请选择年级', trigger: 'change' }],
  roleId:[{ required: true, message: '请选择角色', trigger: 'change' }],
})
watchEffect(() => {
  let grade = []
  if(props.data.grade){
    grade = props.data.grade.split(',').map((item:string) => +item)
  }
  if (props.data) {
    userForm.id = props.data.id;
    userForm.province = props.data.province;
    userForm.num = String(props.data.num);
    userForm.school = props.data.school;
    userForm.phone = props.data.phone;
    userForm.gender = props.data.gender;
    userForm.age = String(props.data.age);
    userForm.formGrade = grade;
    userForm.roleId = props.data.role.id;
  }
});
const gradeProps = {
  expandTrigger: 'hover' as const,
}
const gradeOpts = [
  {
    label:'小学',
    value:0,
    children:[
      { label:'一年级', value:0 },
      { label:'二年级', value:1 },
      { label:'三年级', value:2 },
      { label:'四年级', value:3 },
      { label:'五年级', value:4 },
      { label:'六年级', value:5 }
    ]
  },
  {
    label:'中学',
    value:1,
    children:[
      { label:'七年级', value:6 },
      { label:'八年级', value:7 },
      { label:'九年级', value:8 }
    ]
  },
  {
    label:'高中',
    value:2,
    children:[
      { label:'高一', value:9 },
      { label:'高二', value:10 },
      { label:'高三', value:11 }
    ]
  }
]
const close = (formEl: FormInstance | undefined = formRef.value)=> {
  if (!formEl) return
  formEl.resetFields()
}
const submit = async (formEl: FormInstance | undefined = formRef.value)=> {
  console.log()
  if (!formEl) return
  await formEl.validate((valid:any, fields:any) => {
    if (valid) {
      userForm.grade = userForm.formGrade.join(',')
      updateUserApi(userForm).then((res:ParameterResponse) => {
        if(res.code === 200){
          emits('success');
          ElMessage.success('修改成功')
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
  <el-form label-width="90px" :model="userForm" ref="formRef" :rules="formRules">
    <el-form-item label="序号" prop="num">
      <el-input v-model="userForm.num" placeholder="修改序号"></el-input>
    </el-form-item>
    <el-form-item label="城市" prop="province">
      <el-input v-model="userForm.province" placeholder="输入省市区地址"></el-input>
    </el-form-item>
    <el-form-item label="学校" prop="school">
      <el-input v-model="userForm.school" placeholder="输入学校名称"></el-input>
    </el-form-item>
    <el-form-item label="家长电话" prop="phone">
      <el-input v-model="userForm.phone" placeholder="请输入用户手机号码"></el-input>
    </el-form-item>
    <el-row>
      <el-col :span="12">
        <el-form-item label="性别" prop="gender">
          <el-select v-model="userForm.gender" placeholder="请选择性别">
            <el-option label="男" :value="1"></el-option>
            <el-option label="女" :value="2"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="年龄" prop="age">
          <el-input v-model="userForm.age" placeholder="请输入年龄"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item label="年级" prop="grade">
      <el-cascader
        v-model="userForm.formGrade"
        :options="gradeOpts"
        :props="gradeProps"
      />
    </el-form-item>
    <el-form-item label="角色分配" prop="roleId">
      <el-select v-model="userForm.roleId" placeholder="请选择角色">
        <el-option 
          v-for="item in roleOpts"
          :key="item.id"
          :label="item.rolename"
          :value="item.id"
        ></el-option>
      </el-select>
    </el-form-item>
  </el-form>
</template>