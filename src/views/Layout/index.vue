<script setup lang="ts">
import LayoutNav from './_components/LayoutNav.vue'
import LayoutHeader from './_components/LayoutHeader.vue'
import LayoutFooter from './_components/LayoutFooter.vue'
import LayoutFixed from './_components/LayoutFixed.vue'
</script>

<template>
  <LayoutFixed />
  <LayoutNav />
  <LayoutHeader />
  <router-view />
  <LayoutFooter />
</template>
