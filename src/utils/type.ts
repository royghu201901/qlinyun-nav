// import { AxiosDefaults, AxiosRequestConfig } from 'axios'

export interface requestKeyItem {
  timestamp: number
  isResponse: boolean
  data: object
  method: string | undefined
  url: string | undefined
}

export type requestKeyType = Record<string, requestKeyItem>