import { type ApiResponse, http } from '@/utils/request'

// 1. 所有分类通用基础字段（id、name、picture 统一抽离）
// 1. 所有分类通用基础字段（id、name、picture 统一抽离）
export interface CategoryBase {
  id: string
  name: string
  picture: string
}

// 2. 商品接口
export interface GoodsItem {
  id: string
  name: string
  desc: string
  price: string
  picture: string
  discount: string | null
  orderNum: number
}

// 3. 二级分类：继承基础 + 独有字段
export interface SubCategory extends CategoryBase {
  parentId: string | null
  parentName: string | null
  goods: GoodsItem[]
}

// 4. 一级分类：继承基础 + 独有 children
export interface TopCategory extends CategoryBase {
  children: SubCategory[]
}

export interface SubCategory {
  counts: number
  page: number
  pageSize: number
  pages: number
  items: {
    desc: string
    id: string
    name: string
    orderNum: string
    picture: string
    price: string
  }[]
}
// 5. 全局统一响应结构

export const getCategory = (id: string) => {
  return http.get<ApiResponse<TopCategory>>(`/category`, {
    params: { id },
  })
}

// 获取二级分类

export const getCategoryFilter = (id: string) => {
  return http.get<
    ApiResponse<{
      name: string
      parentId: string
      goods: GoodsItem[]
    }>
  >(`/category/sub/filter`, {
    params: { id },
  })
}

// 获取商品列表

export const getSubCategory = (data: {
  categoryId: string
  page: number
  pageSize: number
  sortField: string
}) => {
  return http.post<ApiResponse<SubCategory>>('/category/goods/temporary', data)
}
