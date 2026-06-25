import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

interface GoodItem {
  id: string
  name: string
  picture?: string
  price: number
  count: number
  skuId: string
  attrsText: string
  selected: boolean
}

export const useCartStore = defineStore('cart', () => {
  const cartList = ref<GoodItem[]>([])
  const addCart = (goods: GoodItem) => {
    const index = cartList.value.findIndex((item) => item.skuId === goods.skuId)
    if (index !== -1) {
      const item = cartList.value[index]
      if (item) {
        item.count += goods.count
      }
    } else {
      cartList.value.push(goods)
    }
  }
  const deleteCart = (skuId: string) => {
    cartList.value = cartList.value.filter((item) => item.skuId !== skuId)
  }
  const totalCount = computed(() => cartList.value.reduce((total, item) => total + item.count, 0))
  const totalPrice = computed(() =>
    cartList.value.reduce((total, item) => total + item.count * item.price, 0),
  )
  return {
    cartList,
    addCart,
    deleteCart,
    totalPrice,
    totalCount,
  }
})
