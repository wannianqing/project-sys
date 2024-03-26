<script lang="ts" setup>
import { Plus } from "@element-plus/icons-vue";
import Drawer from "@/components/drawer.vue";
import MenuForm from "./MenuForm.vue";
import { ElMessage } from "element-plus";
import { menuListApi } from "@/apis";
import { ParameterResponse } from "@/utils/types";
const drawerVisible = ref(false);

const dataSource = ref([]);

const getMenuList = () => {
  menuListApi().then((res: ParameterResponse) => {
    console.log(res);
    if (res.code === 200) {
      dataSource.value = res.data;
    }
  });
};
getMenuList();

const handleSuccess = () => {
  drawerVisible.value = false;
  getMenuList();
  ElMessage.success("创建成功");
};

const menuFormRef = ref();
const drawerCancel = () => {
  drawerVisible.value = false;
  menuFormRef.value.close();
};
</script>
<template>
  <div class="main-page">
    <el-card shadow="always" body-class="search-card">
      <div class="space-content">
        <el-button type="primary" @click="drawerVisible = true"
          ><el-icon><Plus /></el-icon>新建菜单</el-button
        >
      </div>
    </el-card>
    <el-card class="mg-t10">
      <el-tree
        :data="dataSource"
        node-key="id"
        :props="{
          label: 'menuname',
        }"
        default-expand-all
        :expand-on-click-node="false"
      >
        <template #default="{ node, data }">
          <div class="tree-item">
            <p class="tree-name">{{ node.label }}</p>
            <div class="tree-btn">
              <el-space spacer="|">
                <el-button text type="danger">删除</el-button>
              </el-space>
            </div>
          </div>
        </template>
      </el-tree>
    </el-card>
    <Drawer
      v-model:drawerVisible="drawerVisible"
      title="创建菜单"
      @cancel="drawerCancel"
      @submit="menuFormRef.submit()"
    >
      <template #content>
        <menu-form ref="menuFormRef" @success="handleSuccess"></menu-form>
      </template>
    </Drawer>
  </div>
</template>
<style lang="scss" scoped>
.tree-item {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>
