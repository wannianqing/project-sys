<script lang="ts" setup>
import dayjs from 'dayjs'
import Pagination from '@/components/pagination.vue'
import { ParameterResponse, PaginationState, IUserRuleForm, UserTableRow } from '@/utils/types'
import { userListByPage } from '@/apis'
import { trainListApi } from "@/apis/train";
import { ElMessage, ElMessageBox } from 'element-plus'
type PageQuery = {
  pageNum:number;
  pageSize:number;
  total:number;
  username?:string;
}
const userList = ref([])
const pageQuery = ref({
  pageNum:1,
  pageSize:10,
  total: 0
} as PageQuery)
const getUserList = () => {
  userListByPage(unref(pageQuery)).then((res:ParameterResponse) => {
    if(res.code === 200){
      userList.value = res.data.list
      pageQuery.value.total = res.data.total
    }
  })
}
getUserList()
const handleChange = (val: PaginationState) => {
  pageQuery.value = Object.assign(pageQuery.value, { ...val })
  getUserList()
}
const genderFormatter = (row:UserTableRow)=> {
  switch(row.gender){
    case 1:
      return '男';
    case 2:
      return '女';
  }
}
const trainDialog = ref(false)
const trainTypeData = ref([] as any)
const trainlistQuery = ref({
  pageNum: 1,
  pageSize: 100,
  type: 1,
});
const getTrainList = () => {
  trainListApi(unref(trainlistQuery)).then((res: ParameterResponse) => {
    if (res.code === 200) {
      const {list} = res.data
      trainTypeData.value = list.map((item:any) => {
        return { name:item.name, id:item.id}
      })
      console.log(trainTypeData.value)
      trainDialog.value = true
    }
  });
};
const handleTrace = (row:UserTableRow)=> {
}
const handleTrain = (row:UserTableRow)=> {
  getTrainList()
}
</script>
<template>
  <div class="main-page">
    <el-card class="mg-t10">
      <el-table :data="userList">
        <el-table-column prop="id" label="用户id"></el-table-column>
        <el-table-column prop="username" label="姓名"></el-table-column>
        <el-table-column prop="gender" label="性别" :formatter="genderFormatter"></el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button type="primary" @click="handleTrace(scope.row)">数据跟踪表</el-button>
            <el-button type="danger" @click="handleTrain(scope.row)">训练情况</el-button>
          </template>
        </el-table-column>
      </el-table>
      <Pagination :pagination="pageQuery" @change="handleChange" />
    </el-card>
    <el-dialog v-model="trainDialog" title="训练追踪">
      <el-table :data="trainTypeData">
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column prop="id" label="id"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>
<style lang="scss" scoped>
</style>