<script lang="ts" setup>
import { ArrowDown } from "@element-plus/icons-vue";
import { MutationTypes } from '@/store/constants'
import { removeStorage } from '@/utils';
const uStore = useStore()
const route = useRoute()
const router = useRouter()
const collapse = computed(() => uStore.state.collapse)
const switchCollapse = () => {
  uStore.commit(MutationTypes.SET_COLLAPSE,!unref(collapse))
}
const handleCommand = (command:string) => {
  if(command === 'signOut'){
    removeStorage('token')
    removeStorage('sidebars')
    removeStorage('staticMenu')
    router.push({ path: '/login' })
    window.location.reload()
  }
}

const userInfo = computed(() => uStore.state.userInfo)
</script>
<template>
  <div class="header-wrapper">
    <div class="header-left">
      <div class="collapse-btn">
        <el-tooltip content="点击折叠菜单">
          <span 
            :class="[
              'iconfont',
              collapse ? 'icon-collpaseRight':'icon-collaseLeft'
            ]"
            @click="switchCollapse"
          ></span>
        </el-tooltip>
      </div>
      <div class="bread-crumb">
        <el-breadcrumb>
          <el-breadcrumb-item
            v-for="item in route.matched"
          >
            <span>{{ item.meta.name }}</span>
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="header-right">
      <el-dropdown trigger="click" @command="handleCommand">
        <span class="el-dropdown-link btn_username_group">
          <span class="btn_username">{{ userInfo.username }}</span>
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="signOut">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <!-- 用户头像 -->
      <!-- <div class="user-avatar">
        <img src="" />
      </div> -->
    </div>
  </div>
</template>
<style lang="scss" scoped>
.header-wrapper{
  width:100%;
  height:100%;
  font-size:18px;
  display:flex;
  justify-content:space-between;
  .header-left{
    display: flex;
    justify-content: space-between;
    align-items: center;
    .collapse-btn{
      margin-right:20px;
    }
  }
  .header-right{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>