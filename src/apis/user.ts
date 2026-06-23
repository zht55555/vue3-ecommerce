import { http, type ApiResponse } from '@/utils/request'

export interface User {
  id: string
  account: string
  mobile: string
  token: string
}

export interface LoginParams {
  account: string
  password: string
}

export const login = (data: LoginParams) => {
  return http.post<ApiResponse<User>, LoginParams>('/login', data)
}
