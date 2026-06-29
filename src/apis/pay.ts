import { http, type ApiResponse } from '@/utils/request'

export interface Order {
  id: string
  createTime: string
  payType: number
  orderState: number
  payMoney: number
  countdown: number
}
export const getOrder = (id: string) => {
  return http.get<ApiResponse<Order>>(`/member/order/${id}`)
}
