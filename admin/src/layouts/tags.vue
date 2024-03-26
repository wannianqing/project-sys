<script lang="ts" setup>
import { MutationTypes } from "@/store/constants";
import { Tag } from "@/store/state";
import { BLACK_URLS } from "@/router";
const router = useRouter();
const route = useRoute();
const store = useStore();

const selectPath = ref<string>("");
const tagsList = computed(() => store.state.tagsList);
/** 点击tag标签跳转路由 */
const tagTab = (tag: Tag, type?: String) => {
  selectPath.value = tag.path;
  if (type) {
    router.push({ path: tag.path });
  }
};
/** 判断是否存在，设置tag页签 */
const setTag = (tag: Tag) => {
  const isExist = unref(tagsList).some((item: { path: string }) => {
    return item.path === tag.fullPath;
  });
  if (!isExist) {
    store.commit(MutationTypes.PUSH_TAGSLIST, { ...tag });
    selectPath.value = tag.path;
  }
};
/** 删除页签 */
const closeTag = (idx: number) => {
  const length = unref(tagsList).length;
  const currIdx = unref(tagsList).findIndex(
    (item: { path: string }) => item.path === selectPath.value
  );
  store.commit(MutationTypes.DELETE_TAG, idx);
  // 判断当前删除的项和当前选中的是不是同一个，是同一个，要跳转路由
  if (idx === currIdx && currIdx < length - 1) {
    tagTab(unref(tagsList)[currIdx], "tag");
  }
  if (idx === currIdx && currIdx === length - 1) {
    if (unref(tagsList).length) {
      tagTab(unref(tagsList)[currIdx - 1], "tag");
    } else {
      router.push({ path: "/dashboard/home" });
    }
  }
};
/** 路由守卫，添加tag标签 */
router.beforeEach((to, from) => {
  if (!BLACK_URLS.includes(to.path)) {
    setTag(to);
    tagTab(to);
  }
});
onMounted(() => {
  setTag(route);
  tagTab(route);
});
</script>
<template>
  <div class="tag-wrapper">
    <TransitionGroup name="list" class="tags" tag="div">
      <el-tag
        v-for="(tag, index) in tagsList"
        :key="index"
        :class="selectPath === tag.path ? 'tag-check' : 'tag-null-check'"
        :closable="true"
        @click="tagTab(tag, 'tag')"
        @close="closeTag(index)"
        >{{ tag.meta.name }}</el-tag
      >
    </TransitionGroup>
  </div>
</template>
<style lang="scss" scoped>
.tag-wrapper {
  padding: 0px 12px 6px 8px;
  white-space: nowrap;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--ma-tag-border-color);
  .list-move,
  /* 对移动中的元素应用的过渡 */
  .list-enter-active,
  .list-leave-active {
    transition: all 0.5s ease;
  }

  .list-enter-from,
  .list-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }

  /* 确保将离开的元素从布局流中删除
  以便能够正确地计算移动的动画。 */
  .tags {
    width: calc(100vw - 310px);
    overflow: auto;
  }

  /* 确保将离开的元素从布局流中删除
  以便能够正确地计算移动的动画。 */
  .list-leave-active {
    position: absolute;
  }
  .el-tag {
    cursor: pointer;
    height: 32px;
    margin-right: 8px;
  }
  .tag-check {
    border-radius: 1px;
    background-color: var(--ma-tag-check-color);
    border-color: var(--ma-tag-check-color);
    color: var(--ma-font-color);
    .el-tag__close {
      color: var(--ma-font-color);
    }
  }
  .tag-null-check {
    background-color: var(--ma-tag-nullCheck-color) !important;
    border-color: var(--ma-tag-nullCheck-border-color) !important;
    color: var(--ma-tag-nullCheck-font-color) !important;
    border-radius: 1px;
  }
}
</style>
