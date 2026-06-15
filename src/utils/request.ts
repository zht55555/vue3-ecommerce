import axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios'

const TOKEN_KEY = 'token'

export interface ApiResponse<T = unknown> {
  code: number
  message: string
  result: T
}

export type RequestConfig<T = unknown> = AxiosRequestConfig<T>

const request: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? '/api',
  timeout: 10000,
})

request.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem(TOKEN_KEY)

    if (token) {
      config.headers.set('Authorization', `Bearer ${token}`)
    }

    return config
  },
  (error: AxiosError) => Promise.reject(error),
)

request.interceptors.response.use(
  <T>(response: AxiosResponse<T>) => response.data,
  (error: AxiosError<ApiResponse>) => {
    const message = error.response?.data?.message ?? error.message ?? '请求失败'
    return Promise.reject(new Error(message))
  },
)

export const http = {
  get<T = unknown>(url: string, config?: RequestConfig): Promise<T> {
    return request.get<T, T>(url, config)
  },

  post<T = unknown, D = unknown>(url: string, data?: D, config?: RequestConfig<D>): Promise<T> {
    return request.post<T, T, D>(url, data, config)
  },

  put<T = unknown, D = unknown>(url: string, data?: D, config?: RequestConfig<D>): Promise<T> {
    return request.put<T, T, D>(url, data, config)
  },

  patch<T = unknown, D = unknown>(url: string, data?: D, config?: RequestConfig<D>): Promise<T> {
    return request.patch<T, T, D>(url, data, config)
  },

  delete<T = unknown>(url: string, config?: RequestConfig): Promise<T> {
    return request.delete<T, T>(url, config)
  },
}

export default request
