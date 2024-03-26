<script lang="ts" setup>
import dayjs from "dayjs";
import { Plus } from "@element-plus/icons-vue";
import Pagination from "@/components/pagination.vue";
import Drawer from "@/components/drawer.vue";
import RoleForm from "./RoleForm.vue";
import { PaginationState, ParameterResponse, RoleObj } from "@/utils/types";
import { ElMessage, ElMessageBox } from "element-plus";
import { roleListByPage, roleDeleteApi } from "@/apis";
import MenuTree from "./MenuTree.vue";

const roleList = ref([]);
const pageQuery = ref({
  pageNum: 1,
  pageSize: 10,
});
const pagination = ref({
  page: 1,
  pageSize: 10,
  total: 30,
});
const getRoleList = () => {
  roleListByPage(unref(pageQuery)).then((res: ParameterResponse) => {
    if (res.code === 200) {
      roleList.value = res.data.list;
      pagination.value.total = res.data.total;
    }
  });
};
getRoleList();
const handleChange = (val: PaginationState) => {
  pagination.value = Object.assign(pagination.value, { ...val });
};
const drawerVisible = ref(false);
const handleSuccess = () => {
  drawerVisible.value = false;
  ElMessage.success("创建成功");
  getRoleList();
};
const menuTreRef = ref();

const eventAuth = (row: RoleObj) => {
  menuTreRef.value.openMenuTree(row);
};

const handleDelete = (id: string) => {
  ElMessageBox.confirm("确认删除吗？删除后内容不可恢复", "删除", {
    confirmButtonText: "删除",
    confirmButtonClass: "confirm-button-ok",
    cancelButtonText: "取消",
  })
    .then(() => {
      roleDeleteApi({ id }).then((res: ParameterResponse) => {
        if (res.code === 200) {
          ElMessage.success("删除成功");
          getRoleList();
        } else {
          ElMessage.warning(res.msg);
        }
      });
    })
    .catch(() => {
      ElMessage.info("取消删除");
    });
};

const roleFormRef = ref();
const drawerCancel = () => {
  drawerVisible.value = false;
  roleFormRef.value.close();
};

const formatDate = (v: string) => {
  return dayjs(v).format("YYYY-MM-DD HH:mm");
};
</script>
<template>
  <div class="main-page">
    <el-card shadow="always" body-class="search-card">
      <div class="space-content">
        <el-form label-width="80px" :inline="true">
          <el-form-item>
            <el-input placeholder="输入角色搜索" clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">查询</el-button>
          </el-form-item>
        </el-form>
        <el-button type="primary" @click="drawerVisible = true"
          ><el-icon><Plus /></el-icon>创建角色</el-button
        >
      </div>
    </el-card>
    <el-card class="mg-t10">
      <el-table
        :data="roleList"
        height="calc(100vh - 345px)"
        style="width: 100%"
      >
        <el-table-column prop="id" label="角色id"></el-table-column>
        <el-table-column prop="rolename" label="角色名称"></el-table-column>
        <el-table-column prop="remark" label="角色说明"></el-table-column>
        <el-table-column prop="createdAt" label="创建时间">
          <template #default="scope">
            <span>{{ formatDate(scope.row.createdAt) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="300">
          <template #default="scope">
            <el-button text type="primary" @click="eventAuth(scope.row)"
              >授权</el-button
            >
            <!-- <el-button text type="primary">编辑</el-button> -->
            <el-button text type="danger" @click="handleDelete(scope.row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <Pagination :pagination="pagination" @change="handleChange" />
    </el-card>
    <Drawer
      v-model:drawerVisible="drawerVisible"
      title="创建角色"
      @cancel="drawerCancel"
      @submit="roleFormRef.submit()"
    >
      <template #content>
        <role-form ref="roleFormRef" @success="handleSuccess"></role-form>
      </template>
    </Drawer>
    <menu-tree ref="menuTreRef"></menu-tree>
  </div>
</template>
<style lang="scss" scoped>
.auth-dialog-box {
  height: 400px;
  overflow: auto;
}
</style>
