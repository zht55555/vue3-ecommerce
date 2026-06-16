import { type ApiResponse, http } from '@/utils/request'

export interface CategoryItem {
  id: string
  name: string
  picture: string
}

export const getCategoryList = () => {
  return http.get<ApiResponse<CategoryItem[]>>('/home/category/head')
}
