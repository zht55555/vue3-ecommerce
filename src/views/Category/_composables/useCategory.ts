import { reactive, onMounted } from 'vue'
import { useRoute, onBeforeRouteUpdate } from 'vue-router'
import { getCategory } from '@/apis/category'
import type { TopCategory } from '@/apis/category'

export const useCategory = () => {
  const route = useRoute()

  // 1. 初始化 reactive，直接用类型定义，不用手写结构
  const categoryData = reactive<TopCategory>({
    id: '',
    name: '',
    picture: null,
    children: [],
  })

  // 2. 封装一个统一的请求方法
  const loadCategoryData = async (id: string) => {
    const res = await getCategory(id)
    // 直接把新数据赋值到响应式对象上，不用 Object.assign
    Object.assign(categoryData, res.result)
  }

  // 3. 组件挂载时初始化
  onMounted(() => {
    const id = route.params.id as string
    loadCategoryData(id)
  })

  // 4. 路由更新时刷新数据
  onBeforeRouteUpdate(async (to) => {
    const id = to.params.id as string
    await loadCategoryData(id)
  })

  return {
    categoryData,
  }
}
