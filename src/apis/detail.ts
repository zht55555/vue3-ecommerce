import { type ApiResponse, http } from '@/utils/request'

export interface GoodsDetail {
  id: string
  name: string
  desc: string
  price: number
  oldPrice: number
  salesCount: number
  commentCount: number
  collectCount: number
  categories: { id: string; name: string }[]
  brand: {
    id: string
    name: string
    logo: string
  }
  mainPictures: string[]
  details: {
    properties: {
      name: string
      value: string
    }[]
    pictures: string[]
  }
}

export type GoodsHot = {
  id: string
  name: string
  desc: string
  price: string
  picture: string
}[]

export const getDetail = (id: string) => {
  return http.get<ApiResponse<GoodsDetail>>(`/goods`, {
    params: { id },
  })
}

export const getHotGoods = (id: string, type: number, limit: number) => {
  return http.get<ApiResponse<GoodsHot>>(`/goods/hot`, {
    params: { id, type, limit: limit || 3 },
  })
}
