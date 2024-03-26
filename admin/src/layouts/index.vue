<script lang="ts" setup>
import SideBar from "@/layouts/sidebar.vue";
import Header from "@/layouts/header.vue";
import Tags from "@/layouts/tags.vue";
import { userInfoApi } from "@/apis";
import { ParameterResponse } from "@/utils/types";
import { MutationTypes } from "@/store/constants";
import { ElMessage } from "element-plus";
import { judgeEquipment } from "@/utils";
const isMobile = computed(() => judgeEquipment());
const store = useStore();
const getUserInfo = () => {
  userInfoApi().then((res: ParameterResponse) => {
    if (res.code === 200) {
      store.commit(MutationTypes.SET_USERINFO, res.data);
    } else {
      ElMessage.warning(res.msg);
    }
  });
};
getUserInfo();
const collapse = computed<boolean>(() => store.state.collapse);
const switchCollapse = () => {
  store.commit(MutationTypes.SET_COLLAPSE, !unref(collapse));
};
</script>
<template>
  <div class="main-wrapper mobile">
    <div class="drawer-bg" v-if="isMobile && !collapse" @click="switchCollapse">
      <p class="drawer-btn">取消</p>
    </div>
    <el-container style="height: 100vh">
      <el-aside style="width: auto">
        <side-bar></side-bar>
      </el-aside>
      <el-container>
        <el-header height="64px">
          <Header></Header>
        </el-header>
        <el-main>
          <Tags v-if="!isMobile"></Tags>
          <el-scrollbar class="main-content">
            <router-view v-slot="{ Component }">
              <Transition
                appear
                name="fade"
                appear-active-class="animate__animated animate__fadeInUp"
                enter-active-class="animate__animated animate__fadeInUp"
              >
                <component :is="Component" />
              </Transition>
            </router-view>
          </el-scrollbar>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.list-leave-active {
  position: absolute;
}
.main-content {
  margin: 8px 5px;
  height: calc(100vh - 120px);
}
</style>
