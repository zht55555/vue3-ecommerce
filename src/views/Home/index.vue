<script setup lang="ts">
import HomeBanner from './_components/HomeBanner.vue'
import HomeProduct from './_components/HomeProduct.vue'
import HomeNew from './_components/HomeNew.vue'
import HomeCategory from './_components/HomeCategory.vue'
import HomeHot from './_components/HomeHot.vue'

defineOptions({
  name: 'HomePage',
})
</script>
<template>
  <div>
    <div class="container">
      <HomeCategory />
      <HomeBanner />
    </div>
    <HomeNew />
    <HomeHot />
    <HomeProduct />
  </div>
</template>
