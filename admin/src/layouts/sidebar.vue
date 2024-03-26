<script lang="ts" setup>
import { MutationTypes } from "@/store/constants";
import { judgeEquipment } from "@/utils";
// import menuList from '@/router/menu';

const store = useStore();
const route = useRoute();
const collapse = computed<boolean>(() => store.state.collapse);
const activeRoute = computed(() => route.path);
const menuList = computed(() => store.getters.getSidebars);
const isMobile = computed(() => judgeEquipment());
const dynamicWidth = computed(() => {
  return isMobile.value ? "200px" : "200px";
});
console.log(dynamicWidth.value);
</script>
<template>
  <div
    class="sidebar-wrapper"
    :style="{ width: collapse ? (isMobile ? '0px' : '64px') : '200px' }"
  >
    <div class="admin-logo">
      <img src="../assets/images/eye-logo.png" class="logo" />
      <span v-if="!collapse">青牛前端</span>
    </div>
    <el-menu :default-active="activeRoute" :collapse="collapse" router>
      <template v-for="menu in menuList">
        <template v-if="menu?.children?.length">
          <el-sub-menu :key="menu.menuUrl" :index="menu.menuUrl">
            <template #title>
              <el-icon v-if="!isMobile"
                ><span :class="menu.menuIcon"></span
              ></el-icon>
              <span>{{ menu.menuName }}</span>
            </template>
            <template v-for="childMenu in menu.children">
              <el-menu-item :index="childMenu.menuUrl">
                <template #title>
                  <span>{{ childMenu.menuName }}</span>
                </template>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <template v-else>
          <el-menu-item :index="menu.menuUrl">
            <el-icon><span :class="menu.menuIcon"></span></el-icon>
            <template #title>
              <span>{{ menu.menuName }}</span>
            </template>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>
<style lang="scss" scoped>
.sidebar-wrapper {
  height: 100%;
  transition: width 0.3s ease-in-out;
  background-color: var(--ma-sidebar-bg-color);
  overflow: hidden;
  .admin-logo {
    display: flex;
    align-items: center;
    padding: 15px 10px;
    .logo {
      width: 32px;
      flex-shrink: 0;
    }
    span {
      color: var(--ma-font-color);
      white-space: nowrap;
      letter-spacing: 2px;
      margin-left: 12px;
      font-weight: 600;
      font-size: 18px;
    }
  }
  .el-menu {
    border-right: none !important;
    transition: width 0.3s ease-in-out;
    &::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>
