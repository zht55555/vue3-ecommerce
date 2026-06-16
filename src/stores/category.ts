import { reactive } from 'vue'
import { defineStore } from 'pinia'
import { getCategoryList, type CategoryItem } from '@/apis/layout'

export const useCategoryStore = defineStore('category', () => {
  const categoryList = reactive<CategoryItem[]>([])

  const getCategory = async () => {
    const res = await getCategoryList()
    categoryList.push(...res.result)
  }

  return { categoryList, getCategory }
})
