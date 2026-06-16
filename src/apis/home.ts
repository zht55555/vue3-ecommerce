import { type ApiResponse, http } from '@/utils/request'

export const getBanner = (params?: { distributionSite?: string }) => {
  const { distributionSite = '1' } = params || {}
  return http.get<ApiResponse<{ id: string; imgUrl: string }[]>>('/home/banner', {
    params: { distributionSite },
  })
}
