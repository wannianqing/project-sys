<script lang="ts" setup>
import { ElMessage, FormInstance, UploadInstance, UploadRawFile, genFileId } from "element-plus";
import { createAssetsApi } from '@/apis/train'
import { uploadFileApi } from "@/apis";
import { ParameterResponse } from "@/utils/types";
const props = withDefaults(
  defineProps<{
    visible: boolean;
    id:number;
  }>(),
  {
    visible: false,
  }
);
const emits = defineEmits<{
  (e:'update:visible',value:boolean):void
}>();

const formParam = reactive({
  type:1,
  name:'',
  url:'',
  train:1
})

const typeOpts = [
  { label:'视频', value:1 },
  { label:'音频', value:2 },
  { label:'pdf', value:3 }
]
const trainTypeOpts = [
  { label:'量化训练', value:1 },
  { label:'睫状肌训练', value:2 },
  { label:'三步曲', value:3 },
  { label:'红光控制', value:4 },
  { label:'音乐训练', value:5 },
  { label:'课堂训练', value:6 },
  { label:'教师培训', value:7 },
  { label:'品格教育', value:8 },
  { label:'其它', value:9 },
]
const formRules = reactive({
  type: [{ required: true, message: "请选择资源类型", trigger: "change" }],
  name: [{ required: true, message: "请输入文件名称", trigger: "blur" }],
  url: [{ required: true, message: "请上传资源", trigger: "change" }],
});
const loading = ref(false)
const formRef = ref<FormInstance>()
const handleChange = (file: any)=> {
  loading.value = true
  const formData = new FormData();
  formData.append("file", file.raw);
  uploadFileApi(formData).then((res: ParameterResponse) => {
    if(res.code === 200){
      formParam.url = res.data
    }
  }).finally(() => {
    loading.value = false
  });
}
const handleRemove = (file:any) => {
  console.log(file,666666)
}
const upload = ref<UploadInstance>()

const handleExceed = (files:any) => {
  upload.value!.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  upload.value!.handleStart(file)
}
const submit = async (formEl: FormInstance | undefined = formRef.value)=> {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      const prams = Object.assign({ pid:props.id },{...formParam})
      loading.value = true
      createAssetsApi(prams).then((res: ParameterResponse) => {
        if(res.code === 200){
          ElMessage.success('上传成功')
          formEl.resetFields()
          cancel(formEl)
        }else{
          ElMessage.warning(res.msg)
        }
      }).finally(() => {
        loading.value = false
      });
    } else {
      console.log("error submit!", fields);
    }
  });
}
const cancel = (formEl: FormInstance | undefined = formRef.value)=> {
  if (!formEl) return
  formEl.resetFields()
  emits('update:visible',false)
}
</script>
<template>
  <el-dialog 
    :model-value="visible" 
    title="上传资源" 
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
  >
    <el-form
      label-width="90px"
      :model="formParam"
      ref="formRef"
      :rules="formRules"
    >
      <el-form-item label="资源类型" prop="type">
        <el-select v-model="formParam.type">
          <el-option 
            v-for="item in typeOpts"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="文件名称" prop="name">
        <el-input v-model="formParam.name" placeholder="请输入文件名称"></el-input>
      </el-form-item>
      <el-form-item label="训练类型" prop="train">
        <el-select v-model="formParam.train">
          <el-option 
            v-for="item in trainTypeOpts"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="文件上传" prop="url">
        <el-upload
          ref="upload"
          class="upload-box"
          action="#"
          :auto-upload="false"
          :limit="1"
          accept=".pdf,.mp3,.wav,.mp4"
          :on-change="handleChange"
          :on-remove="handleRemove"
          :on-exceed="handleExceed"
        >
          <template #trigger>
            <el-button type="primary">选择文件</el-button>
          </template>
          <template #tip>
            <div class="el-upload__tip text-red">
              <p style="color:red;font-size:12px;margin-left:10px;">(可上传音频、视频或pdf文件)</p>
            </div>
          </template>
        </el-upload>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="cancel(formRef)" :disabled="loading">取消</el-button>
      <el-button type="primary" @click="submit(formRef)" :loading="loading" :disabled="loading">确定</el-button>
    </template>
  </el-dialog>
</template>
<style lang="scss">
.upload-box{
  ::v-deep(.el-upload-list__item-file-name){
    white-space:normal;
    text-align:left;
  }
}
</style>