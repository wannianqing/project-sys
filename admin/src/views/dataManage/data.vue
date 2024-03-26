<script lang="ts" setup>
import * as echarts from "echarts";
import { PaginationState, ParameterResponse } from "@/utils/types";
import { Plus } from "@element-plus/icons-vue";
import Drawer from "@/components/drawer.vue";
import ExcelForm from "./components/excelForm.vue";
import dayjs from "dayjs";
import { ElMessage, ElMessageBox } from "element-plus";
import { scoreListApi, scoreListByUseridApi } from "@/apis";
import { yDataFormat } from "@/utils/constants";
const tableData = ref([]);
const pageQuery = ref({
  pageNum: 1,
  pageSize: 10,
  total: 0,
});
const getScoreList = () => {
  scoreListApi(unref(pageQuery)).then((res: ParameterResponse) => {
    if (res.code === 200) {
      tableData.value = res.data.list;
      pageQuery.value.total = res.data.total;
    }
  });
};
getScoreList();
const drawerVisible = ref(false);
const handleSuccess = () => {
  drawerVisible.value = false;
  ElMessage.success("导入成功");
  getScoreList();
};

const excelFormRef = ref();
const drawerCancel = () => {
  drawerVisible.value = false;
  excelFormRef.value.close();
};
const handleDelete = (id: number) => {
  ElMessageBox.confirm("确认删除吗？删除后内容不可恢复", "删除", {
    confirmButtonText: "删除",
    confirmButtonClass: "confirm-button-ok",
    cancelButtonText: "取消",
  })
    .then(() => {
      // firmDeleteApi({id}).then((res:ParameterResponse) => {
      //   if(res.code === 200){
      //     ElMessage.success('删除成功')
      //     getScoreList()
      //   }else{
      //     ElMessage.warning(res.msg)
      //   }
      // })
    })
    .catch(() => {
      ElMessage.info("取消删除");
    });
};
const formatDate = (v: string) => {
  return dayjs(v).format("YYYY-MM-DD");
};
const prvDown = computed(() => {
  return (val: any) => {
    if (val.leftScore == "" && val.rightScore == "") return;
    let valx100;
    if (val.leftScore && val.rightScore) {
      const valx100l = val.leftScore * 100;
      const valx100r = val.rightScore * 100;
      valx100 = valx100l < valx100r ? valx100l : valx100r;
    }
    if (val.leftScore && !val.rightScore) {
      valx100 = val.leftScore * 100;
    }
    if (!val.leftScore && val.rightScore) {
      valx100 = val.rightScore * 100;
    }
    console.log(valx100);
    if (valx100 == 510) {
      return true;
    }
  };
});
const cacleEye = computed(() => {
  return (val: any) => {
    if (val.leftScore == "" && val.rightScore == "") return;
    let valx100: any;
    if (val.leftScore && val.rightScore) {
      const valx100l = val.leftScore * 100;
      const valx100r = val.rightScore * 100;
      valx100 = valx100l < valx100r ? valx100l : valx100r;
    }
    if (val.leftScore && !val.rightScore) {
      valx100 = val.leftScore * 100;
    }
    if (!val.leftScore && val.rightScore) {
      valx100 = val.rightScore * 100;
    }

    if (valx100 >= 40 && valx100 <= 80) {
      return { class: "mild", name: "轻度" };
    } else if (valx100 >= 12 && valx100 < 40) {
      return { class: "moder", name: "中度" };
    } else if (valx100 <= 10) {
      return { class: "badly", name: "高度" };
    } else {
      return { class: "good", name: "良好" };
    }
    // 轻度大于等于0.4小于等于0.8显示黄色；
    // 中度大于等于0.12小于0.4显示橙色；高度小于等于0.1显示红
  };
});
const chartDialog = ref(false);
const datasList = ref([] as any);
const handleRead = (row: any) => {
  console.log(row.userid);
  datasList.value = [];
  scoreListByUseridApi({ userid: row.userid }).then(
    (res: ParameterResponse) => {
      if (res.code === 200) {
        let timeObj: any = {};
        res.data.forEach((item: any) => {
          const day = dayjs(item.create_time).format("YYYY-MM-DD");
          if (!timeObj[day]) {
            timeObj[day] = [];
            timeObj[day].push(item);
          } else {
            timeObj[day].push(item);
          }
        });
        let xData: any = [];
        let y1Data: any = [];
        let y2Data: any = [];
        Object.keys(timeObj).forEach((item) => {
          const info = timeObj[item][timeObj[item].length - 1];
          datasList.value.push(info);
          xData.push(item);
          y1Data.push(info.leftScore);
          y2Data.push(info.rightScore);
        });

        chartDialog.value = true;
        nextTick(() => {
          const dom: any = document.querySelector(".line-chart");
          const myChart = echarts.init(dom);
          myChart.setOption({
            xAxis: {
              type: "category",
              data: xData,
            },
            yAxis: {
              type: "value",
              min: 4.0,
              max: 5.3,
              interval: 0.1,
              axisLabel: {
                formatter: function (value: any) {
                  return yDataFormat[value];
                },
              },
            },
            dataZoom: [
              {
                type: "inside",
                start: 0,
                end: 10,
              },
              {
                start: 0,
                end: 10,
              },
            ],
            series: [
              {
                data: y1Data,
                type: "line",
                lineStyle: {
                  color: "#0390f1",
                },
                itemStyle: {
                  color: "#0390f1",
                  normal: {
                    label: {
                      show: true,
                    },
                  },
                },
                markLine: {
                  // silent: true,
                  lineStyle: {
                    color: "#00695c",
                  },
                  name: "争产",
                  data: [
                    {
                      yAxis: 5,
                    },
                  ],
                },
              },
              {
                data: y2Data,
                type: "line",
                lineStyle: {
                  color: "#ff0000",
                },
                itemStyle: {
                  normal: {
                    label: {
                      show: true,
                    },
                  },
                },
              },
            ],
          });
        });
      }
    }
  );
};
</script>
<template>
  <div class="main-page">
    <el-card shadow="always" body-class="search-card">
      <div class="space-content">
        <el-button type="primary" @click="drawerVisible = true"
          ><el-icon><Plus /></el-icon>导入Excel</el-button
        >
      </div>
    </el-card>
    <el-card class="mg-t10">
      <el-table
        :data="tableData"
        height="calc(100vh - 345px)"
        style="width: 100%"
      >
        <el-table-column prop="username" label="学生姓名"></el-table-column>
        <el-table-column prop="leftScore" label="左眼成绩"></el-table-column>
        <el-table-column prop="rightScore" label="右眼成绩"></el-table-column>
        <el-table-column prop="create_time" label="测试日期">
          <template #default="scope">
            <span>{{ formatDate(scope.row.create_time) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="预近视">
          <template #default="scope">
            <div v-if="prvDown(scope.row)">
              <svg
                t="1673532011887"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="4007"
                width="32"
                height="32"
              >
                <path
                  d="M335 546.6V117.1c0-54.8 44.5-99.3 99.3-99.3h165.4c54.8 0 99.3 44.5 99.3 99.3v429.5h264.7l-446.9 463L70 546.6h265z m0 0"
                  fill="#d81e06"
                  p-id="4008"
                ></path>
              </svg>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="近视程度">
          <template #default="scope">
            <div class="eyecd-box">
              <span class="eyecd" :class="cacleEye(scope.row)?.class"></span>
              <p>{{ cacleEye(scope.row)?.name }}</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="200">
          <template #default="scope">
            <el-button type="danger" @click="handleDelete(scope.row.id)"
              >删除</el-button
            >
            <el-button type="primary" @click="handleRead(scope.row)"
              >查看折线图</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <Drawer
      v-model:drawerVisible="drawerVisible"
      title="导入excel"
      @cancel="drawerCancel"
      @submit="excelFormRef.submit()"
    >
      <template #content>
        <excel-form ref="excelFormRef" @success="handleSuccess"></excel-form>
      </template>
    </Drawer>
    <el-dialog title="折线图" width="60%" v-model="chartDialog">
      <div class="container">
        <div class="line-chart"></div>
      </div>
      <div class="table-box">
        <div class="table">
          <div class="left">
            <p style="color: #0390f1">左眼</p>
            <p style="color: #ff0000">右眼</p>
            <p>日期</p>
            <p>训练类型</p>
          </div>
          <div class="right">
            <div class="column-box">
              <div class="colu">
                <div class="iput-box" v-for="item in datasList" :key="item.id">
                  <input type="text" v-model="item.leftScore" />
                </div>
              </div>
              <div class="colu">
                <div class="iput-box" v-for="item in datasList" :key="item.id">
                  <input type="text" v-model="item.rightScore" />
                </div>
              </div>
              <div class="colu">
                <p v-for="item in datasList" :key="item.id">
                  {{ formatDate(item.create_time) }}
                </p>
              </div>
              <div class="colu">
                <div class="iput-box" v-for="item in datasList" :key="item.id">
                  <input type="text" v-model="item.type" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<style lang="scss">
.eyecd-box {
  display: flex;
  align-items: center;
  p {
    margin-left: 5px;
  }
}
.eyecd {
  display: block;
  width: 40px;
  height: 20px;

  &.mild {
    background: yellow;
  }
  &.moder {
    background: orange;
  }
  &.badly {
    background: red;
  }
  &.good {
    background: green;
  }
}
.container {
  position: relative;
  height: 500px;
}
.line-chart {
  width: 100%;
  height: 480px;
  position: absolute;
}
.table-box {
  .table {
    width: 100%;
    position: relative;
    border: 1px solid #ccc;
    box-sizing: border-box;
    border-radius: 4px;
    .left {
      width: 80px;
      border-right: 1px solid #ccc;
      p {
        height: 30px;
        line-height: 30px;
        text-align: center;
        border-bottom: 1px solid #ccc;
        &:last-child {
          border-bottom: none;
        }
      }
    }
    .right {
      position: absolute;
      left: 80px;
      top: 0;
      width: calc(100% - 80px);
      overflow-y: auto;

      .colu {
        height: 30px;
        display: flex;
        flex-wrap: nowrap;
        p,
        .iput-box {
          flex-shrink: 0;
          width: 100px;
          line-height: 30px;
          text-align: center;
          border-right: 1px solid #ccc;
          border-bottom: 1px solid #ccc;
        }
        &:last-child {
          p,
          .iput-box {
            border-bottom: none;
          }
        }
        .iput-box {
          input {
            width: 100%;
            box-sizing: border-box;
            padding: 0 10px;
            // height:100%;
            border: none;
            outline: none;
          }
        }
      }
    }
  }
}
</style>
