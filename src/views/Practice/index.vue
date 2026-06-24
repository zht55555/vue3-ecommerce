<script lang="ts" setup>
import { ref, reactive } from 'vue'
defineOptions({
  name: 'PracticePage',
})
const name = ref('张三')
const obj = reactive({
  a: 1,
})
const onChange = () => {
  name.value = '123'
  obj.a = 2
}
</script>
<template>
  <div>{{ name }}</div>
  <div>{{ obj.a }}</div>
  <button @click="onChange">点我试试</button>
</template>
