import { ref } from 'vue'
import { defineStore } from 'pinia'
import { login, type LoginParams, type User } from '@/apis/user'
import { mergeCartList } from '@/apis/cart'
import { useCartStore } from '@/stores/cart'

export const useUserStore = defineStore(
  'user',
  () => {
    const user = ref<User | null>(null)
    const getUserInfo = async (params: LoginParams) => {
      const res = await login(params)
      user.value = res.result
      const cartStore = useCartStore()
      mergeCartList(
        cartStore.cartList.map((item) => ({
          skuId: item.skuId,
          count: item.count,
          selected: item.selected,
        })),
      ).then(() => {
        cartStore.clearCart()
      })
    }
    const clearUserInfo = () => {
      user.value = null
    }
    return {
      user,
      getUserInfo,
      clearUserInfo,
    }
  },
  {
    persist: true,
  },
)
