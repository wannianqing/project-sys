<script lang="ts" setup>
withDefaults(
  defineProps<{
    tableData: Array<Record<string, unknown>>,
    columns: Array<Record<string, unknown>>
  }>(),
  {
    tableData: ()=>[],
    columns:()=>[]
  }
);
</script>
<template>
  <el-table v-bind="$attrs" :data="tableData">
    <el-table-column
      v-for="(column,index) in columns"
      :key="index"
      :prop="column.prop"
      :label="column.label"
      :formatter="column?.formatter"
      :width="column.width"
      :fixed="column.fixed"
    >
      <template v-if="column.isOperate" #default="scope">
        <slot name="operate" :row="scope.row"></slot> 
      </template>
    </el-table-column>
  </el-table>
</template>