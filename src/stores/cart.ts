import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import { useUserStore } from '@/stores/user'
import { addCartList, deleteCartList, getCartList } from '@/apis/cart.ts'

export interface GoodItem {
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
  const userStore = useUserStore()
  const isLogin = computed(() => !!userStore.user?.token)
  const cartList = ref<GoodItem[]>([])

  const updateCartList = async () => {
    if (!isLogin.value) {
      cartList.value = []
      return
    }

    const res = await getCartList()
    cartList.value = res.result
  }

  watch(
    isLogin,
    async (loggedIn) => {
      if (loggedIn) {
        await updateCartList()
      } else {
        cartList.value = []
      }
    },
    { immediate: true },
  )

  const addCart = async (goods: GoodItem) => {
    if (isLogin.value) {
      await addCartList({ skuId: goods.skuId, count: goods.count })
      await updateCartList()
    } else {
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
  }

  const deleteCart = async (skuId: string) => {
    if (isLogin.value) {
      await deleteCartList([skuId])
      await updateCartList()
    } else {
      cartList.value = cartList.value.filter((item) => item.skuId !== skuId)
    }
  }

  const totalCount = computed(() => cartList.value.reduce((total, item) => total + item.count, 0))
  const totalPrice = computed(() =>
    cartList.value.reduce((total, item) => total + item.count * item.price, 0),
  )
  const singleCheck = (item: GoodItem, selected: boolean) => {
    cartList.value = cartList.value.map((i) => (i.skuId === item.skuId ? { ...i, selected } : i))
  }

  const allCheck = (selected: boolean) => {
    cartList.value = cartList.value.map((item) => ({ ...item, selected }))
  }
  const isAll = computed(() => cartList.value.every((item) => item.selected))
  const allCount = computed(() => cartList.value.filter((item) => item.selected).length)
  const allPrice = computed(() =>
    cartList.value.reduce(
      (total, item) => (item.selected ? total + item.count * item.price : total),
      0,
    ),
  )
  const selectedCount = computed(() => cartList.value.filter((item) => item.selected).length)
  const selectedPrice = computed(() =>
    cartList.value.reduce(
      (total, item) => (item.selected ? total + item.count * item.price : total),
      0,
    ),
  )
  return {
    cartList,
    isLogin,
    updateCartList,
    addCart,
    deleteCart,
    totalPrice,
    totalCount,
    singleCheck,
    allCheck,
    isAll,
    allCount,
    allPrice,
    selectedCount,
    selectedPrice,
  }
})
