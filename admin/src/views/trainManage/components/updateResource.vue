<script lang="ts" setup>
import { ElMessage, FormInstance } from "element-plus";
import { updateAssetsApi } from "@/apis/train";
import { IResource, ParameterResponse } from "@/utils/types";
const props = withDefaults(
  defineProps<{
    visible: boolean;
    row: IResource | undefined;
  }>(),
  {
    visible: false,
  }
);
const emits = defineEmits<{
  (e: "update:visible", value: boolean): void;
}>();

const formParam = reactive({
  type: 1,
  name: "",
  train: 1,
});

watchEffect(() => {
  if (!props.row) return;
  formParam.type = props.row.type;
  formParam.name = props.row.name;
  formParam.train = props.row.train;
});

const typeOpts = [
  { label: "视频", value: 1 },
  { label: "音频", value: 2 },
  { label: "pdf", value: 3 },
];
const trainTypeOpts = [
  { label: "量化训练", value: 1 },
  { label: "睫状肌训练", value: 2 },
  { label: "三步曲", value: 3 },
  { label: "红光控制", value: 4 },
  { label: "音乐训练", value: 5 },
  { label: "课堂训练", value: 6 },
  { label: "教师培训", value: 7 },
  { label: "品格教育", value: 8 },
  { label: "其它", value: 9 },
];
const formRules = reactive({
  type: [{ required: true, message: "请选择资源类型", trigger: "change" }],
  name: [{ required: true, message: "请输入文件名称", trigger: "blur" }],
});
const loading = ref(false);
const formRef = ref<FormInstance>();
const currentInstance = getCurrentInstance();

const { appContext } = currentInstance!;
const submit = async (formEl: FormInstance | undefined = formRef.value) => {
  console.log(props.row, 66666);
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      if (!props.row) return;
      console.log(formParam);
      console.log(props.row.id);
      const prams = Object.assign({ id: props.row.id }, { ...formParam });
      loading.value = true;
      updateAssetsApi(prams)
        .then((res: ParameterResponse) => {
          if (res.code === 200) {
            ElMessage.success("更新成功");
            formEl.resetFields();
            appContext.config.globalProperties.$emitter.emit(
              "update-succ",
              props.row?.pid
            );
            cancel(formEl);
          } else {
            ElMessage.warning(res.msg);
          }
        })
        .finally(() => {
          loading.value = false;
        });
    } else {
      console.log("error submit!", fields);
    }
  });
};
const cancel = (formEl: FormInstance | undefined = formRef.value) => {
  if (!formEl) return;
  formEl.resetFields();
  emits("update:visible", false);
};
</script>
<template>
  <el-dialog
    :model-value="visible"
    title="修改资源"
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
        <el-input
          v-model="formParam.name"
          placeholder="请输入文件名称"
        ></el-input>
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
    </el-form>
    <template #footer>
      <el-button @click="cancel(formRef)" :disabled="loading">取消</el-button>
      <el-button
        type="primary"
        @click="submit(formRef)"
        :loading="loading"
        :disabled="loading"
        >确定</el-button
      >
    </template>
  </el-dialog>
</template>
<style lang="scss">
.upload-box {
  ::v-deep(.el-upload-list__item-file-name) {
    white-space: normal;
    text-align: left;
  }
}
</style>
