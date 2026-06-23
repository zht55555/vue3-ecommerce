import { ref } from 'vue'
import { defineStore } from 'pinia'

import { login, type LoginParams, type User } from '@/apis/user'

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null)
  const getUserInfo = async (params: LoginParams) => {
    const res = await login(params)
    user.value = res.result
  }
  return {
    user,
    getUserInfo,
  }
})
