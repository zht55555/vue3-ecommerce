import { http, type ApiResponse } from '@/utils/request'

interface CartItem {
  id: string
  name: string
  picture?: string
  price: number
  count: number
  skuId: string
  attrsText: string
  selected: boolean
}

export const addCartList = ({ skuId, count }: { skuId: string; count: number }) => {
  return http.post<ApiResponse<CartItem>, { skuId: string; count: number }>('/member/cart', {
    skuId,
    count,
  })
}

export const getCartList = () => {
  return http.get<ApiResponse<CartItem[]>>('/member/cart')
}

export const deleteCartList = (ids: string[]) => {
  return http.delete<ApiResponse>('/member/cart', {
    data: { ids },
  })
}
