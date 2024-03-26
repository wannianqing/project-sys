<script lang="ts" setup></script>
<template>
  <router-view v-slot="{ Component }">
    <component :is="Component"></component>
  </router-view>
</template>
<style lang="scss">
@use "@/assets/style/font.css";
@use "@/assets/style/common.scss";
@use "@/assets/style/element.scss";
</style>
