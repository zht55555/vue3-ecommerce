<script setup lang="ts">
import { onMounted } from 'vue'
import { useCategoryStore } from '@/stores/category'

import LayoutNav from './_components/LayoutNav.vue'
import LayoutHeader from './_components/LayoutHeader.vue'
import LayoutFooter from './_components/LayoutFooter.vue'
import LayoutFixed from './_components/LayoutFixed.vue'

defineOptions({
  name: 'LayoutPage',
})

const categoryStore = useCategoryStore()
onMounted(() => {
  if (!categoryStore.categoryList.length) {
    categoryStore.getCategory()
  }
})
</script>

<template>
  <LayoutFixed />
  <LayoutNav />
  <LayoutHeader />
  <router-view />
  <LayoutFooter />
</template>
