<script lang="ts" setup>
import { PaginationState } from '@/utils/types'
withDefaults(
  defineProps<{
    pagination: Partial<PaginationState>;
  }>(),
  {
    pagination: () => {
      return {
        pageNum: 1,
        pageSize: 10,
        total: 30,
      };
    },
  }
);
const emits = defineEmits<{
  (
    e: "change",
    target: {
      pageNum?: number;
      pageSize?: number;
    }
  ): void;
}>();
const currentChange = (pageNum: number) => {
  //切换分页
  emits("change", { pageNum });
}
</script>
<template>
  <el-pagination 
    background 
    layout="prev, pager, next" 
    :page-size="pagination.pageSize"
    :total="pagination.total" 
    class="ma-pagination"
    v-model:currentPage="pagination.pageNum"
    @current-change="currentChange"
  />
</template>
<style lang="scss" scoped>
.ma-pagination {
  display: flex;
  justify-content: center;
  padding-top: 15px;
}
</style>