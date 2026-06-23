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
  specs: {
    id: string
    name: string
    values: {
      name: string
      picture?: string
      selected?: boolean
      disabled?: boolean
    }[]
  }[]
  skus: {
    id: string
    inventory: number
    price: number
    oldPrice: number
    specs: {
      name: string
      valueName: string
    }[]
  }[]
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
