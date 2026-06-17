<script setup lang="ts">
import { getHot, type HotItem } from '@/apis/home'
import { reactive, onMounted } from 'vue'
import HomePanel from './HomePanel.vue'

const hotItems = reactive({
  list: [] as HotItem[],
})

const getHotList = async () => {
  const res = await getHot()
  hotItems.list = res.result
}

onMounted(() => {
  getHotList()
})
</script>

<template>
  <HomePanel title="人气推荐" sub-title="人气爆款 不容错过">
    <!-- 下面是插槽主体内容模版 -->
    <ul class="goods-list">
      <li v-for="item in hotItems.list" :key="item.id">
        <RouterLink to="/">
          <img v-img-lazy="item.picture" :alt="item.alt" />
          <p class="name">{{ item.title }}</p>
        </RouterLink>
      </li>
    </ul>
  </HomePanel>
</template>

<style scoped lang="less">
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 406px;

  li {
    width: 306px;
    height: 406px;

    background: #f0f9f4;
    transition: all 0.5s;

    &:hover {
      transform: translate3d(0, -3px, 0);
      box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
    }

    img {
      width: 306px;
      height: 306px;
    }

    p {
      font-size: 22px;
      padding-top: 12px;
      text-align: center;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }

    .price {
      color: @priceColor;
    }
  }
}
</style>
