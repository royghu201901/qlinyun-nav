import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import axios from 'axios'
import type { requestKeyType } from './type'

export class RequestError extends Error {
  constructor (message: string) {
    super()
    this.message = message
    this.name = this.constructor.name
  }
}

// 接口请求是否绕过300ms内不可重复请求。开启时，请确认代码的可用性。
axios.defaults.unique = false

// 创建axios实例
const service: AxiosInstance = axios.create({
  baseURL: '/verbCenter/environment',
  // 请求超时时间
  timeout: 10 * 60 * 1000,
})

// 请求缓存
const requestKey: requestKeyType = {}

// 获取请求内容字符串
const generateDataStr = (config: AxiosRequestConfig) => {
  const { method, data, params } = config
  let dataStr = ''
  if (method === 'get' && params) {
    dataStr = typeof params !== 'string' ? JSON.stringify(params) : params
  }
  if (method === 'post' && data) {
    dataStr = typeof data !== 'string' ? JSON.stringify(data) : data
  }
  return dataStr
}

// request拦截器
service.interceptors.request.use(config => {
  // 如果当前网络有问题，直接报错
  if (!window.navigator.onLine) {
    throw new RequestError('请检查您的网络情况')
  }
  // 清除无用的cache
  Object.keys(requestKey).forEach(item => {
    const { isResponse, timestamp } = requestKey[item]
    if (isResponse && Date.now() - timestamp >= 300) {
      delete requestKey[item]
    }
  })
  // 阻止频繁请求和重复请求
  const { method, url, data, unique } = config
  const dataStr = generateDataStr(config)
  const hash = `${method}${url}${dataStr}${unique ? Math.random() : ''}`
  // 重复请求
  if (requestKey[hash]) {
    const { timestamp, isResponse, method, url } = requestKey[hash]
    // 距离上次请求不足300毫秒
    if (Date.now() - timestamp < 300) {
      console.warn('请求过于频繁', method, url)
      throw new RequestError('请求过于频繁')
    }
    // 请求尚未返回
    if (!isResponse) {
      console.warn('请勿重复提交', method, url)
      throw new RequestError('请勿重复提交')
    }
  }
  // 新请求初始化
  requestKey[hash] = {
    method,
    url,
    data,
    isResponse: false,
    timestamp: Date.now(),

  }
  config.headers = {
    ...config.headers,
    // 防止接口请求缓存。https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Cache-Control
    'Cache-Control': 'no-cache, no-store, max-age=0, must-revalidate',
  }
  return config
}, error => {
  throw new RequestError(error)
})

// response拦截器
service.interceptors.response.use(async response => {
  // 如果请求返回，对应的requestKey.isResponse设置为true
  const {
    method,
    url,
    // responseType
  } = response.config
  const dataStr = generateDataStr(response.config)
  const hash = `${method}${url}${dataStr}`
  if (requestKey[hash]) {
    requestKey[hash].isResponse = true
  }

  // 数据处理
  const { status, data, message } = response.data
  if (status === 'success' || status === '00000') {
    // console.log('data==>', data)

    return data
  }

  return Promise.reject(new RequestError(message))
}, error => {
  // 自定义错误类直接抛出
  if (error instanceof RequestError) {
    throw error
  } else {
    // 如果请求返回，无论错误失败，对应的requestKey.isResponse设置为true
    const { config: { method, url }, response: { status } } = error
    const dataStr = generateDataStr(error.config)
    const hash = `${method}${url}${dataStr}`
    if (requestKey[hash]) {
      requestKey[hash].isResponse = true
    }
    // 超时
    if (status === 401) {
      // const currentPath = window.location.href
      // window.location.href = process.env.VUE_APP_ENV !== 'development' ? `/kylinsite/users/cas?redirect=${currentPath}` : `${process.env.VUE_APP_LOGIN_URL}?service = ${currentPath}`
      throw new RequestError('401_UNAUTHORIZED')
    }
    // 处理HTTP 错误 如404
    throw new RequestError(error.message)
  }
})

export default service
