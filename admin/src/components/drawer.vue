<script lang="ts" setup>
withDefaults(
  defineProps<{
    drawerVisible: boolean;
    title: string;
  }>(),
  {
    drawerVisible: false,
    title: '创建'
  }
);
const emits = defineEmits<{
  (e: "submit"): void;
  (e: "cancel"): void;
}>();
const cancel = ()=> {
  emits('cancel')
}
const submit = ()=> {
  emits('submit')
}
</script>
<template>
  <el-drawer
    :title="title"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
    :model-value="drawerVisible"
  >
    <slot name="content"></slot>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="submit">确定</el-button>
      </div>
    </template>
  </el-drawer>
</template>