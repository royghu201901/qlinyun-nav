import axios from '@/utils/request';
import type {
  ModuleProps,
  CardProps,
  LogProps,
  SearchProps,
  IdProps,
} from '../pages/type';

/**
 * 获取导航列表
 */
export function getNavigationListApi<T>() {
  return axios.request<T>({
    url: '/environment/list'
  })
}

/**
 * 获取模块下拉
 */
export function getModuleListApi<T>() {
  return axios.request<T>({
    url: '/environment/down_pull'
  })
}

/**
 * 添加/编辑模块
 */
export function saveModuleApi<T>(data: ModuleProps) {
  return axios.request<T>({
    url: '/environment/add_environment',
    method: 'post',
    data
  })
}

/**
 * 删除模块
 */
export function deleteEnvironmentApi<T>(id: number) {
  return axios.request<T>({
    url: `/environment/delete_environment/${id}`
  })
}

/**
 * 添加/编辑导航
 */
export function saveWebsiteApi<T>(data: CardProps) {
  return axios.request<T>({
    url: '/environment/add_website',
    method: 'post',
    data
  })
}

/**
 * 删除导航
 */
export function deleteWebsiteApi<T>(id: number) {
  return axios.request<T>({
    url: `/environment/delete_website/${id}`
  })
}

/**
 * 获取日志
 */
export function getLogApi<T>(params: LogProps) {
  return axios.request<T>({
    url: '/log/list',
    params
  })
}

/**
 * 搜索
 */
export function getSearchListApi<T>(params: SearchProps) {
  return axios.request<T>({
    url: '/environment/search',
    params
  })
}

/**
 * 搜索
 */
export function getNavigationListByIdApi<T>(params: IdProps) {
  return axios.request<T>({
    url: '/environment/website_list_by_environment_id',
    params
  })
}
