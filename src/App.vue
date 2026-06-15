<script setup lang="ts"></script>

<template>
  <div class="app-theme page">
    <el-button class="hero-button" type="primary">Primary</el-button>
  </div>
</template>

<style scoped lang="less">
@button-radius: 14px;
@page-padding: 24px;

.page {
  padding: @page-padding;
}

.hero-button {
  border-radius: @button-radius;
}
</style>
