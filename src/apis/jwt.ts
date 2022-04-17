import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

const jwtAxios = axios.create()

export default class JWTManager {
  failedRequestList: AxiosRequestConfig[] = []
  responseList: PromiseSettledResult<AxiosResponse<any>>[] = []
  refreshing = false
  refresh: () => Promise<string>
  readonly interval = 20
  readonly timeout = 10000
  constructor(refresh: () => Promise<string>) {
    this.refresh = refresh
  }

  responseErrorInterceptor = async (e: AxiosError) => {
    if (e.response?.status === 401) {
      if (!e.config.url?.includes('refresh')) {
        this.failedRequestList.push(e.config)
        const id = this.failedRequestList.length - 1
        if (!this.refreshing) {
          this.refreshing = true
          try {
            const authorization = await this.refresh()
            this.refreshing = false
            const requestPromises = this.failedRequestList.map((v) => {
              if (v.headers) {
                v.headers.Authorization = authorization
              }
              return jwtAxios.request(v)
            })
            this.failedRequestList = []
            this.responseList = await Promise.allSettled(requestPromises)
          } catch (refreshError) {
            return Promise.reject(e)
          }
        } else {
          for (let waitingTime = 0; waitingTime < this.timeout; waitingTime += this.interval) {
            await new Promise((resolve) => setTimeout(resolve, this.interval))
            if (!this.refreshing) break
          }
        }
        if (this.responseList[id].status === 'fulfilled') {
          return Promise.resolve((this.responseList[id] as PromiseFulfilledResult<AxiosResponse<any>>).value)
        }
        return Promise.reject(e)
      }
    }
    return Promise.reject(e)
  }
}
