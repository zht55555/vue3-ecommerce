import { http, type ApiResponse } from '@/utils/request'

export interface CheckoutUserAddress {
  id: string
  receiver: string
  contact: string
  provinceCode: string
  cityCode: string
  countyCode: string
  address: string
  isDefault: 1 | 0
  fullLocation: string
  postalCode: string
  addressTags: string
}

interface CheckoutGoods {
  id: string
  name: string
  picture: string
  price: number
  count: number
}

interface CheckoutSummary {
  goodsCount: number
  totalPrice: number
  totalPayPrice: number
  postFee: number
  discountPrice: number
}

export interface CheckoutParams {
  userAddresses: CheckoutUserAddress[]
  goods: CheckoutGoods[]
  summary: CheckoutSummary
}
export const getCheckout = () => {
  return http.get<ApiResponse<CheckoutParams>>('/member/order/pre')
}
