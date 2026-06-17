import { reactive, onMounted } from 'vue'
import { useRoute, onBeforeRouteUpdate } from 'vue-router'
import { getCategory } from '@/apis/category'

interface CategoryData {
  id: string
  name: string
  children: { id: string; name: string; picture: string }[]
}

export const useCategory = () => {
  const route = useRoute()
  let categoryData = reactive<CategoryData>({
    id: route.params.id as string,
    name: '',
    children: [] as { id: string; name: string; picture: string }[],
  })
  onMounted(async () => {
    const res = await getCategory(categoryData.id)
    console.log(res)
    categoryData = Object.assign(categoryData, {
      ...res.result,
    })
  })
  onBeforeRouteUpdate(async (to) => {
    // 路由变化重新请求数据
    const res = await getCategory(to.params.id as string)
    categoryData = Object.assign(categoryData, {
      ...res.result,
    })
  })
  return { categoryData }
}
