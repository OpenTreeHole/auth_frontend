import axios, { AxiosError } from 'axios'
import Cookies from 'js-cookie'
import config from '@/config'
import { camelCase } from 'lodash-es'

const camelizeKeys = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map((v) => camelizeKeys(v))
  } else if (obj != null && obj.constructor === Object) {
    return Object.keys(obj).reduce(
      (result, key) => ({
        ...result,
        [camelCase(key)]: camelizeKeys(obj[key])
      }),
      {}
    )
  }
  return obj
}

/**
 * Error caused by axios (or other api interaction)
 */
export class ApiError extends Error {
  originalError: AxiosError

  constructor(originalError: AxiosError, message?: string) {
    super(message)
    this.originalError = originalError
  }
}

const errorInterceptor = async (error: AxiosError) => {
  if (error.response) {
    if (error.response.data.message) {
      return Promise.reject(new ApiError(error, `${error.response.status}: ${error.response.data.message}`))
    } else {
      console.log(error.response)
      return Promise.reject(new ApiError(error, `${error.response.status}: 未知错误，请按F12查看控制台以获得错误信息并发至站务分区`))
    }
  } else {
    console.log(error)
    return Promise.reject(new ApiError(error, '未知axios错误，请按F12查看控制台以获得错误信息并发至站务分区，'))
  }
}

axios.defaults.baseURL = config.authUrl
axios.interceptors.response.use((response) => response, errorInterceptor)

export const login = async (email: string, password: string): Promise<{ message: string; access?: string; refresh?: string }> => {
  const response = await axios.post('/login', {
    email: email,
    password: password
  })
  Cookies.set('access', response.data.access, { domain: config.cookieDomain })
  Cookies.set('refresh', response.data.refresh, { domain: config.cookieDomain })
  return camelizeKeys(response.data)
}

export const logout = async (): Promise<{ message: string }> => {
  const response = await axios.get('/logout')
  Cookies.remove('access', { domain: config.cookieDomain })
  Cookies.remove('refresh', { domain: config.cookieDomain })
  return camelizeKeys(response.data)
}

export const verifyWithEmail = async (email: string): Promise<{ message: string; scope: string }> => {
  const response = await axios.get('/verify/email', {
    params: {
      email: email
    }
  })
  return camelizeKeys(response.data)
}

export const register = async (password: string, email: string, verification: string): Promise<{ message: string; access?: string; refresh?: string }> => {
  const response = await axios.post('/register', {
    password: password,
    email: email,
    verification: verification
  })
  Cookies.set('access', response.data.access, { domain: config.cookieDomain })
  Cookies.set('refresh', response.data.refresh, { domain: config.cookieDomain })
  return camelizeKeys(response.data)
}

export const changePassword = async (password: string, email: string, verification: string): Promise<{ message: string; access?: string; refresh?: string }> => {
  const response = await axios.put('/register', {
    password: password,
    email: email,
    verification: verification
  })
  Cookies.set('access', response.data.access, { domain: config.cookieDomain })
  Cookies.set('refresh', response.data.refresh, { domain: config.cookieDomain })
  return camelizeKeys(response.data)
}
