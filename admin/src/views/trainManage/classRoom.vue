<script lang="ts" setup>
import dayjs from "dayjs";
import { Plus } from "@element-plus/icons-vue";
import Pagination from "@/components/pagination.vue";
import Drawer from "@/components/drawer.vue";
import RoomForm from "./components/roomForm.vue";
import AddResource from "./components/addResource.vue";
import ReadResource from "./components/readResource.vue";
import { PaginationState, ParameterResponse, TrainData } from "@/utils/types";
import { ElMessage, ElMessageBox } from "element-plus";
import { trainListApi, deleteTrainApi, listAssetsApi } from "@/apis/train";
import { judgeEquipment } from "@/utils";
const isMobile = computed(() => judgeEquipment());
const store = useStore();

const userInfo = computed(() => store.state.userInfo);
const dataList = ref<TrainData[]>([]);
const pageQuery = ref({
  pageNum: 1,
  pageSize: 10,
  type: 1,
});
const pagination = ref({
  page: 1,
  pageSize: 10,
  total: 30,
});
const getTrainList = () => {
  trainListApi(unref(pageQuery)).then((res: ParameterResponse) => {
    if (res.code === 200) {
      dataList.value = res.data.list;
      pagination.value.total = res.data.total;
    }
  });
};
getTrainList();
const handleChange = (val: PaginationState) => {
  pagination.value = Object.assign(pagination.value, { ...val });
};
const drawerVisible = ref(false);
const isEdit = ref(false);
const handleSuccess = () => {
  drawerVisible.value = false;
  const msg = isEdit ? "更新成功" : "创建成功";
  ElMessage.success(msg);
  getTrainList();
};
const formRef = ref();
const drawerCancel = () => {
  drawerVisible.value = false;
  formRef.value.close();
};
const drawerTitle = ref("添加");
const formData = ref<TrainData>({
  id: 0,
  name: "",
  cover: "",
  intro: "",
});

const openDrawer = (type: string, row?: TrainData) => {
  if (type === "create") {
    drawerTitle.value = "添加";
    isEdit.value = false;
    formData.value = {
      id: 0,
      name: "",
      cover: "",
      intro: "",
    };
  }
  if (type === "update") {
    drawerTitle.value = "编辑";
    isEdit.value = true;
    if (!row) return;
    formData.value = row;
  }
  drawerVisible.value = true;
};
const handleDelete = (row?: TrainData) => {
  ElMessageBox.confirm(
    "确认删除吗？删除后该类型下的资源也将删除，内容不可恢复",
    "删除",
    {
      confirmButtonText: "删除",
      confirmButtonClass: "confirm-button-ok",
      cancelButtonText: "取消",
    }
  )
    .then(() => {
      deleteTrainApi({ id: row?.id }).then((res: ParameterResponse) => {
        if (res.code == 200) {
          ElMessage.success("删除成功");
          getTrainList();
        } else {
          ElMessage.warning(res.msg);
        }
      });
    })
    .catch(() => {
      ElMessage.info("取消删除");
    });
};
const picVisible = ref(false);
const bicPic = ref("");
const handleCover = (url: string) => {
  bicPic.value = url;
  picVisible.value = true;
};

const resourceVisible = ref(false);
const dataId = ref(0);
const handleResource = (id: number) => {
  resourceVisible.value = true;
  dataId.value = id;
};
const readVisible = ref(false);
const resourceList = ref([]);
const rowid: any = ref("");
const getAssetList = (id: string) => {
  return new Promise((resolve) => {
    listAssetsApi({ pid: id }).then((res: ParameterResponse) => {
      if (res.code === 200) {
        resourceList.value = res.data;
        resolve(true);
      } else {
        ElMessage.warning(res.msg);
      }
    });
  });
};
const handleRead = (id: string | number) => {
  rowid.value = id;
  getAssetList(unref(rowid)).then(() => {
    readVisible.value = true;
  });
};
const deleteSucc = () => {
  getAssetList(unref(rowid));
};
const currentInstance = getCurrentInstance();
const { appContext } = currentInstance!;
onMounted(() => {
  appContext.config.globalProperties.$emitter.on(
    "update-succ",
    (val: number) => {
      handleRead(val);
    }
  );
});
onBeforeMount(() => {
  appContext.config.globalProperties.$emitter.off("update-succ");
});
</script>
<template>
  <div class="main-page">
    <el-card shadow="always" body-class="search-card">
      <div class="space-content">
        <el-form label-width="80px" :inline="true">
          <el-form-item>
            <el-input placeholder="搜索" clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">查询</el-button>
          </el-form-item>
        </el-form>
        <el-button type="primary" @click="openDrawer('create')"
          ><el-icon><Plus /></el-icon>添加</el-button
        >
      </div>
    </el-card>
    <el-card class="mg-t10">
      <el-table
        :data="dataList"
        height="calc(100vh - 345px)"
        style="width: 100%"
      >
        <el-table-column
          prop="name"
          label="标题"
          width="200"
        ></el-table-column>
        <el-table-column prop="cover" label="封面" width="200">
          <template #default="scope">
            <el-image
              style="width: 100px"
              :src="scope.row.cover"
              @click="handleCover(scope.row.cover)"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="intro" label="说明"></el-table-column>
        <el-table-column
          label="操作"
          fixed="right"
          :width="isMobile ? 100 : 300"
        >
          <template #default="scope">
            <div>
              <el-button
                text
                type="primary"
                @click="openDrawer('update', scope.row)"
                v-if="userInfo.role.id === 1 || userInfo.role.id === 2"
                >编辑</el-button
              >
              <el-button
                text
                type="primary"
                @click="handleResource(scope.row.id)"
                v-if="userInfo.role.id === 1 || userInfo.role.id === 2"
                >上传资源</el-button
              >
            </div>
            <div>
              <el-button
                text
                type="danger"
                v-if="userInfo.role.id === 1"
                @click="handleDelete(scope.row)"
                >删除</el-button
              >
              <el-button text type="danger" @click="handleRead(scope.row.id)"
                >查看资源</el-button
              >
            </div>
          </template>
        </el-table-column>
      </el-table>
      <Pagination :pagination="pagination" @change="handleChange" />
    </el-card>
    <Drawer
      v-model:drawerVisible="drawerVisible"
      :title="drawerTitle"
      @cancel="drawerCancel"
      @submit="formRef.submit(drawerTitle)"
    >
      <template #content>
        <room-form
          :isEdit="isEdit"
          :data="formData"
          ref="formRef"
          @success="handleSuccess"
        ></room-form>
      </template>
    </Drawer>
    <el-dialog v-model="picVisible" title="封面大图" @closed="bicPic = ''">
      <div class="big-pic" style="display: flex; justify-content: center">
        <el-image :src="bicPic"></el-image>
      </div>
    </el-dialog>
    <add-resource v-model:visible="resourceVisible" :id="dataId"></add-resource>
    <read-resource
      v-model:visible="readVisible"
      :data="resourceList"
      @delete-success="deleteSucc"
    ></read-resource>
  </div>
</template>
<style lang="scss" scoped></style>
