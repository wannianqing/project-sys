<script lang="ts" setup>
import { uploadFileApi, batchScoreApi } from "@/apis";
import { ParameterResponse } from "@/utils/types";
import { genFileId } from "element-plus";
import type {
  FormInstance,
  UploadInstance,
  UploadProps,
  UploadRawFile,
} from "element-plus";

const emits = defineEmits<{
  (e: "success"): void;
}>();

const parameterForm = reactive({
  userid: "",
  excelUrl: "",
});
const formRules = reactive({
  userid: [{ required: true, message: "请输入用户id", trigger: "blur" }],
  excelUrl: [{ required: true, message: "请上传文件", trigger: "change" }],
});

const upload = ref<UploadInstance>();

const handleExceed = (files: any) => {
  upload.value!.clearFiles();
  const file = files[0] as UploadRawFile;
  file.uid = genFileId();
  upload.value!.handleStart(file);
};
const loading = ref(false);
const handleChange = (file: any) => {
  loading.value = true;
  const formData = new FormData();
  formData.append("file", file.raw);
  uploadFileApi(formData)
    .then((res: ParameterResponse) => {
      if (res.code === 200) {
        parameterForm.excelUrl = res.data;
      }
    })
    .finally(() => {
      loading.value = false;
    });
};
const formRef = ref<FormInstance>();
const close = (formEl: FormInstance | undefined = formRef.value) => {
  if (!formEl) return;
  formEl.resetFields();
};
const submit = async (formEl: FormInstance | undefined = formRef.value) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      const prams = {
        userid: Number(parameterForm.userid),
        url: parameterForm.excelUrl,
      };
      batchScoreApi(prams)
        .then((res: ParameterResponse) => {
          emits("success");
          close(formEl);
        })
        .finally(() => {});
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
    <el-form-item label="用户id" prop="userid">
      <el-input
        v-model="parameterForm.userid"
        placeholder="输入用户id"
      ></el-input>
    </el-form-item>
    <el-form-item label="上传excel" prop="excelUrl">
      <el-upload
        ref="upload"
        class="upload-demo"
        action="#"
        :auto-upload="false"
        :limit="1"
        accept=".xlsx"
        :on-exceed="handleExceed"
        :on-change="handleChange"
      >
        <template #trigger>
          <el-button type="primary">选择excel</el-button>
        </template>
        <template #tip>
          <div class="el-upload__tip text-red">一次只可选择一个excel文件</div>
        </template>
      </el-upload>
    </el-form-item>
  </el-form>
</template>
