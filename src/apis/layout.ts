import { type ApiResponse, http } from '@/utils/request'

export interface CategoryItem {
  id: string
  name: string
  picture: string
  children: { id: string; name: string }[]
  goods: { id: string; name: string; desc: string; price: number; picture: string }[]
}

export const getCategoryList = () => {
  return http.get<ApiResponse<CategoryItem[]>>('/home/category/head')
}
