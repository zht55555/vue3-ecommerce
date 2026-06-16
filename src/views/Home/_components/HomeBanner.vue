<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import { getBanner } from '@/apis/home'
const state = reactive({
  bannerList: [] as { id: string; imgUrl: string }[],
})

onMounted(async () => {
  const res = await getBanner()
  state.bannerList = res.result
})
</script>

<template>
  <div class="home-banner">
    <el-carousel height="500px">
      <el-carousel-item v-for="item in state.bannerList" :key="item.id">
        <img :src="item.imgUrl" alt="" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<style scoped lang="less">
.home-banner {
  width: 1240px;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98;

  img {
    width: 100%;
    height: 500px;
  }
}
</style>
