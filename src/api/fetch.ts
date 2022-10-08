import axios from '@/utils/request';
import type {
  ModuleProps,
  CardProps,
} from '../pages/type';

/**
 * 获取导航列表
 */
export function getNavcationListApi<T>() {
  return axios.request<T>({
    url: '/list'
  })
}

/**
 * 获取模块下拉
 */
export function getModuleListApi<T>() {
  return axios.request<T>({
    url: '/down_pull'
  })
}

/**
 * 添加/编辑模块
 */
export function saveModuleApi<T>(data: ModuleProps) {
  return axios.request<T>({
    url: '/add_environment',
    method: 'post',
    data
  })
}

/**
 * 添加/编辑导航
 */
export function saveWebsiteApi<T>(data: CardProps) {
  return axios.request<T>({
    url: '/add_website',
    method: 'post',
    data
  })
}
