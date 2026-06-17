import { type ApiResponse, http } from '@/utils/request'

export const getCategory = (id: string) => {
  return http.get<
    ApiResponse<{
      id: string
      name: string
      children: { id: string; name: string }[]
    }>
  >(`/category`, {
    params: { id },
  })
}
