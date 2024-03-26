<script lang="ts" setup>
import { ParameterResponse, TrainData } from "@/utils/types";
import { Plus } from "@element-plus/icons-vue";
import { ElMessage, FormInstance } from "element-plus";
import { uploadFileApi } from "@/apis";
import { createTrainApi, updateTrainApi } from '@/apis/train'

const props = defineProps<{
  data: TrainData | undefined;
  isEdit: boolean;
}>();

const emits = defineEmits<{
  (e: "success"): void;
}>();

const route = useRoute()
const type = ref(1)
switch(route.fullPath){
  case '/train/classroom':
    type.value = 1
    break;
  case '/train/afterclass':
    type.value = 2
    break;
  case '/train/character':
    type.value = 3
    break;
  case '/train/teacher':
    type.value = 4
    break;
  default:
    type.value = 1
}

const parameterForm = reactive({
  name: "",
  cover: "",
  intro: "",
  type: type.value
});
const formRules = reactive({
  name: [{ required: true, message: "请输入标题名称", trigger: "blur" }],
  intro: [{ required: true, message: "请输入文本说明", trigger: "blur" }],
  cover: [{ required: true, message: "请上传封面图", trigger: "change" }],
});

watchEffect(() => {
  if (props.data) {
    parameterForm.name = props.data.name;
    parameterForm.cover = props.data.cover;
    parameterForm.intro = props.data.intro;
  }
});

const handleImgChange = (file: any) => {
  const formData = new FormData();
  formData.append("file", file.raw);
  uploadFileApi(formData).then((res: ParameterResponse) => {
    console.log(res);
    if(res.code === 200){
      parameterForm.cover = res.data
    }
  });
};
const formRef = ref<FormInstance>();
const close = (formEl: FormInstance | undefined = formRef.value) => {
  if (!formEl) return;
  formEl.resetFields();
};
const submit = async (type:string,formEl: FormInstance | undefined = formRef.value) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      if(type === '添加'){
        createTrainApi(parameterForm).then((res:ParameterResponse) => {
          if(res.code == 200){
            emits('success')
            close(formEl)
          }else{
            ElMessage.warning(res.msg)
          }
        })
      }else if(type === '编辑'){
        const prams = {
          id:props.data?.id, 
          cover:parameterForm.cover,
          intro:parameterForm.intro
        }
        updateTrainApi(prams).then((res:ParameterResponse) => {
          if(res.code == 200){
            emits('success')
            close(formEl)
          }else{
            ElMessage.warning(res.msg)
          }
        })
      }
    } else {
      console.log("error submit!", fields);
    }
  });
};

defineExpose({
  close,
  submit,
});
</script>
<template>
  <el-form
    label-width="90px"
    :model="parameterForm"
    ref="formRef"
    :rules="formRules"
  >
    <el-form-item label="标题名称" prop="name">
      <el-input
        v-model="parameterForm.name"
        placeholder="输入标题名称"
        :disabled="isEdit"
      ></el-input>
    </el-form-item>
    <el-form-item label="说明" prop="intro">
      <el-input
        v-model="parameterForm.intro"
        placeholder="输入文本说明"
        :rows="3"
        type="textarea"
      ></el-input>
    </el-form-item>
    <el-form-item label="封面上传" prop="cover">
      <el-upload
        class="avatar-uploader"
        action="#"
        :auto-upload="false"
        :show-file-list="false"
        accept="image/*"
        :on-change="handleImgChange"
      >
        <img
          v-if="parameterForm.cover"
          :src="parameterForm.cover"
          class="avatar"
        />
        <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
      </el-upload>
    </el-form-item>
  </el-form>
</template>
<style lang="scss">
.avatar-uploader .el-upload {
  border: 1px dashed var(--ma-shallow-font-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: 0.3;
}

.avatar-uploader .el-upload:hover {
  border-color: var(--ma-primry-color);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 208px;
  text-align: center;
}
.avatar-uploader{
  .avatar{
    width:200px;
  }
}
</style>
