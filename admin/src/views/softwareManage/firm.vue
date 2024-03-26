<script lang="ts" setup>
import dayjs from "dayjs";
import { Plus } from "@element-plus/icons-vue";
import Pagination from "@/components/pagination.vue";
import Drawer from "@/components/drawer.vue";
import FirmForm from "./components/firmForm.vue";
import { ElMessage, ElMessageBox, FormInstance, FormRules } from "element-plus";
import { IFirmData, PaginationState, ParameterResponse } from "@/utils/types";
import { firmListByPage, firmDeleteApi, updateFirmApi } from "@/apis";

const drawerVisible = ref(false);
const handleSuccess = () => {
  drawerVisible.value = false;
  ElMessage.success("添加成功");
  getFirmList();
};
const formRef = ref();
const drawerCancel = () => {
  drawerVisible.value = false;
  formRef.value.close();
};
const tableData = ref([]);
const pageQuery = ref({
  pageNum: 1,
  pageSize: 10,
  total: 0,
});
const getFirmList = () => {
  firmListByPage(unref(pageQuery)).then((res: ParameterResponse) => {
    if (res.code === 200) {
      tableData.value = res.data.list;
      pageQuery.value.total = res.data.total;
    }
  });
};
getFirmList();
const handleChange = (val: PaginationState) => {
  pageQuery.value = Object.assign(pageQuery.value, { ...val });
  getFirmList();
};

const handleDelete = (id: number) => {
  ElMessageBox.confirm("确认删除吗？删除后内容不可恢复", "删除", {
    confirmButtonText: "删除",
    confirmButtonClass: "confirm-button-ok",
    cancelButtonText: "取消",
  })
    .then(() => {
      firmDeleteApi({ id }).then((res: ParameterResponse) => {
        if (res.code === 200) {
          ElMessage.success("删除成功");
          getFirmList();
        } else {
          ElMessage.warning(res.msg);
        }
      });
    })
    .catch(() => {
      ElMessage.info("取消删除");
    });
};

const formatDate = (v: string) => {
  return dayjs(v).format("YYYY-MM-DD HH:mm");
};

const updateForm = ref<FormInstance>();
const dataForm = reactive<IFirmData>({
  name: "",
  addr: "",
});
const visible = ref(false);
const formRules = reactive<FormRules<IFirmData>>({
  name: [{ required: true, message: "请输入企业名称", trigger: "blur" }],
  addr: [{ required: true, message: "请输入企业地址", trigger: "blur" }],
});
const loading = ref(false);
const handleUpdate = (row: any) => {
  dataForm.name = row.name;
  dataForm.addr = row.addr;
  dataForm.id = row.id;
  visible.value = true;
};
const submit = async (formEl: FormInstance | undefined = formRef.value) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      updateFirmApi(dataForm).then((res: ParameterResponse) => {
        if (res.code == 200) {
          ElMessage.success("更改成功");
          getFirmList();
          cancel(formEl);
        } else {
          ElMessage.warning(res.msg);
        }
      });
    } else {
      console.log("error submit!", fields);
    }
  });
};
const cancel = (formEl: FormInstance | undefined = formRef.value) => {
  if (!formEl) return;
  formEl.resetFields();
  visible.value = false;
};
</script>
<template>
  <div class="main-page">
    <el-card shadow="always" body-class="search-card">
      <div class="space-content">
        <el-button type="primary" @click="drawerVisible = true"
          ><el-icon><Plus /></el-icon>添加企业</el-button
        >
      </div>
    </el-card>
    <el-card class="mg-t10">
      <el-table
        :data="tableData"
        height="calc(100vh - 345px)"
        style="width: 100%"
      >
        <el-table-column prop="id" label="企业id" width="100"></el-table-column>
        <el-table-column prop="name" label="企业名称"></el-table-column>
        <el-table-column prop="addr" label="企业地址"></el-table-column>
        <el-table-column prop="createdAt" label="创建时间">
          <template #default="scope">
            <span>{{ formatDate(scope.row.createdAt) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="200">
          <template #default="scope">
            <el-button @click="handleUpdate(scope.row)">修改</el-button>
            <el-button type="danger" @click="handleDelete(scope.row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <Pagination :pagination="pageQuery" @change="handleChange" />
    </el-card>
    <Drawer
      v-model:drawerVisible="drawerVisible"
      title="添加企业 "
      @cancel="drawerCancel"
      @submit="formRef.submit()"
    >
      <template #content>
        <firm-form ref="formRef" @success="handleSuccess"></firm-form>
      </template>
    </Drawer>
    <el-dialog
      :model-value="visible"
      title="修改"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
    >
      <el-form
        label-width="90px"
        :model="dataForm"
        ref="updateForm"
        :rules="formRules"
      >
        <el-form-item label="企业名称" prop="name">
          <el-input
            v-model="dataForm.name"
            placeholder="输入企业名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="企业地址" prop="addr">
          <el-input
            v-model="dataForm.addr"
            placeholder="如：超级管理员"
          ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="cancel(updateForm)" :disabled="loading"
          >取消</el-button
        >
        <el-button
          type="primary"
          @click="submit(updateForm)"
          :loading="loading"
          :disabled="loading"
          >确定</el-button
        >
      </template>
    </el-dialog>
  </div>
</template>
<style lang="scss"></style>
