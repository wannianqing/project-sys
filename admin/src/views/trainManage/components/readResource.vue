<script lang="ts" setup>
import { ElMessage, ElMessageBox } from "element-plus";
import { deleteAssetsByIdApi } from "@/apis/train";
import { IResource, ParameterResponse } from "@/utils/types";
import UpdateResource from "./updateResource.vue";
import { judgeEquipment } from "@/utils";
const isMobile = computed(() => judgeEquipment());
const props = withDefaults(
  defineProps<{
    visible: boolean;
    data: Array<IResource>;
  }>(),
  {
    visible: false,
  }
);
const emits = defineEmits<{
  (e: "update:visible", value: boolean): void;
  (e: "delete-success"): void;
}>();

const cancel = () => {
  emits("update:visible", false);
};

const handleDelete = (id: number) => {
  console.log(id);
  ElMessageBox.confirm(
    "确认删除吗？删除后该类型下的资源也将删除，内容不可恢复！",
    "删除",
    {
      confirmButtonText: "删除",
      confirmButtonClass: "confirm-button-ok",
      cancelButtonText: "取消",
    }
  )
    .then(() => {
      deleteAssetsByIdApi({ id }).then((res: ParameterResponse) => {
        if (res.code == 200) {
          ElMessage.success("删除成功");
          emits("delete-success");
        } else {
          ElMessage.warning(res.msg);
        }
      });
    })
    .catch(() => {
      ElMessage.info("取消删除");
    });
};

const dataObj = ref();
const startTime = ref(0);
const handleRead = (row: IResource) => {
  dataObj.value = row;
  startTime.value = new Date().getTime();
  previewVisible.value = true;
};

const typeFormat = (row: IResource) => {
  const typeOpt = [
    { label: "视频", value: 1 },
    { label: "音频", value: 2 },
    { label: "pdf", value: 3 },
  ];
  const obj:
    | {
        label: string;
        value: number;
      }
    | undefined = typeOpt.find((item) => item.value === row.type);
  return obj?.label;
};
const typeOpt = [
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
const trainTypeFormat = (row: IResource) => {
  const obj:
    | {
        label: string;
        value: number;
      }
    | undefined = typeOpt.find((item) => item.value === row.train);
  return obj?.label;
};

const previewVisible = ref(false);
const previewCancel = () => {
  const endTime = new Date().getTime();
  if (endTime - startTime.value > 2 * 60 * 1000) {
    // 调用 创建记录接口    参数 train 训练类型
  }
  previewVisible.value = false;
};
const store = useStore();

const userInfo = computed(() => store.state.userInfo);

const resourceVisible = ref(false);
const updateData = ref<IResource>();

const handleUpdate = (row: IResource) => {
  resourceVisible.value = true;
  updateData.value = row;
};
</script>
<template>
  <el-dialog
    :model-value="visible"
    title="查看资源"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
    :width="isMobile ? '90%' : '70%'"
  >
    <el-table :data="data" v-if="!isMobile">
      <el-table-column label="序号" type="index" :width="isMobile ? 50 : 150" />
      <el-table-column prop="name" label="文件名称"></el-table-column>
      <el-table-column
        prop="type"
        label="文件类型"
        :formatter="typeFormat"
      ></el-table-column>
      <el-table-column
        prop="train"
        label="训练类型"
        :formatter="trainTypeFormat"
      ></el-table-column>
      <el-table-column label="操作" fixed="right" :width="isMobile ? 100 : 300">
        <template #default="scope">
          <el-button type="primary" @click="handleRead(scope.row)"
            >查看</el-button
          >
          <el-button @click="handleUpdate(scope.row)">修改</el-button>
          <el-button
            type="danger"
            v-if="userInfo.role.id === 1"
            @click="handleDelete(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="mobile-table" v-else>
      <div class="m-table">
        <div class="m-table-head">
          <div class="head-item file-name">文件名称</div>
          <div class="head-item file-type">文件类型</div>
          <div class="head-item train-type">训练类型</div>
          <div class="head-item m-table-opera">操作</div>
        </div>
        <div class="m-table-body" v-for="item in data">
          <div class="body-item file-name">
            <p class="text">{{ item.name }}</p>
          </div>
          <div class="body-item file-type">
            <p class="text">{{ typeFormat(item) }}</p>
          </div>
          <div class="body-item train-type">
            <p class="text">{{ trainTypeFormat(item) }}</p>
          </div>
          <div class="body-item m-table-opera">
            <p class="btn" @click="handleRead(item)">查看</p>
          </div>
        </div>
      </div>
    </div>
    <template #footer>
      <div class="btn-wrap">
        <el-button type="primary" @click="cancel">关闭</el-button>
      </div>
    </template>

    <update-resource
      v-model:visible="resourceVisible"
      :row="updateData"
    ></update-resource>
    <el-dialog
      v-model="previewVisible"
      title="训练学习"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      width="90%"
    >
      <div class="video-type" v-if="dataObj.type === 1">
        <p style="margin-bottom: 20px">播放视频</p>
        <video
          :src="dataObj.url"
          controls
          controlslist="nodownload noremoteplayback"
          class="video"
        ></video>
      </div>
      <div class="video-type" v-if="dataObj.type === 2">
        <p style="margin-bottom: 20px">播放音频</p>
        <audio :src="dataObj.url" controls></audio>
      </div>
      <div class="pdf-type" v-if="dataObj.type === 3">
        <iframe
          :src="`/pdfjs/web/viewer.html?file=${dataObj.url}`"
          width="100%"
          height="100%"
          frameborder="0"
        ></iframe>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="previewCancel">关闭</el-button>
        </span>
      </template>
    </el-dialog>
  </el-dialog>
</template>
<style lang="scss">
.btn-wrap {
  text-align: center;
}
.video {
  width: 100%;
  height: 100%;
}
.pdf-type {
  height: 900px;
}
</style>
