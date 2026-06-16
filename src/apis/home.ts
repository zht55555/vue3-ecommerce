import { type ApiResponse, http } from '@/utils/request'

export interface BannerItem {
  id: string
  imgUrl: string
}

export interface NewItem {
  id: string
  name: string
  price: number
  picture: string
}

export interface GoodsItem {
  id: string
  name: string
  price: number
  picture: string
  desc: string
  saleInfo: string
}

export interface HomeGoodsGroup {
  id: string
  name: string
  price: number
  picture: string
  saleInfo: string
  goods: GoodsItem[]
}

export const getBanner = (params?: { distributionSite?: string }) => {
  const { distributionSite = '1' } = params || {}
  return http.get<ApiResponse<BannerItem[]>>('/home/banner', {
    params: { distributionSite },
  })
}

export const getNew = () => {
  return http.get<ApiResponse<NewItem[]>>('/home/new')
}

export function getGoods() {
  return http.get<ApiResponse<HomeGoodsGroup[]>>('/home/goods')
}
