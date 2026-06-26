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
  skuId: string
  id: string
  name: string
  picture: string
  price: number
  count: number
  attrsText: string
  totalPrice: number
  totalPayPrice: number
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

export interface CreateOrderParams {
  deliveryTimeType: number
  payType: number
  payChannel: 1
  buyerMessage: string
  goods: {
    skuId: string
    count: number
  }[]
  addressId: string
}
// 获取结算页数据
export const getCheckout = () => {
  return http.get<ApiResponse<CheckoutParams>>('/member/order/pre')
}

// 提交订单
export const createOrder = (data: CreateOrderParams) => {
  return http.post<ApiResponse<{ id: string }>>('/member/order', data)
}
