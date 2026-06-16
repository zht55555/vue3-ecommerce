<script setup lang="ts">
import LayoutNav from './_components/LayoutNav.vue'
import LayoutHeader from './_components/LayoutHeader.vue'
import LayoutFooter from './_components/LayoutFooter.vue'
</script>

<template>
  <LayoutNav />
  <LayoutHeader />
  <router-view />
  <LayoutFooter />
</template>
