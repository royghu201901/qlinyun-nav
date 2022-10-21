import { Outlet } from 'umi';
import { useState, useEffect } from 'react'
import {
  Backdrop,
} from '@material-ui/core'

import styles from './index.less';
import MyNav from './components/MyNav'
import SpeedDials from './components/SpeedDials'

import type {
  CardListInterface,
  CardProps,
} from '@/pages/type'

import {
  getNavigationListApi,
  getSearchListApi,
} from '@/api/fetch'

export default function Layout() {
  // loading状态
  const [loading, setLoading] = useState(false)

  // 是否允许删除
  const [canDelete, setCanDelete] = useState(false)
  const handleChangeDeleteStatus = (flag: boolean) => {
    setCanDelete(flag)
  }

  // 导航列表
  const [navigationList, setNavigationList] = useState<CardListInterface[]>([])
  const getNavigationList = async () => {
    try {
      setLoading(true)
      const data = await getNavigationListApi<CardListInterface[]>()
      setNavigationList(data)
    } catch (e: any) {
      console.log(e)
    } finally {
      setLoading(false)
    }
  }

  // 搜索列表
  const [searchList, setSearchList] = useState<CardProps[]>([])
  const handleSubmitSearch = async (keyword: string) => {
    try {
      setLoading(true)
      const data = await getSearchListApi<CardProps[]>({ keyword })
      setSearchList(data)
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false)
    }
  }

  // 开启关闭快速拨号功能
  const [speedDialShow, setSpeedDialShow] = useState(true)
  const handleChangeSpeedDialShow = (flag: boolean) => {
    setSpeedDialShow(flag)
  }
  // 快速拨号显示
  const [speedDialOpen, setSpeedDialOpen] = useState(false)
  const handleChangeSpeedDialStatus = (flag: boolean) => {
    setSpeedDialOpen(flag)
  }

  useEffect(() => {
    getNavigationList()
  },[])

  return (
    <div>
      <img src="https://i.loli.net/2021/06/25/GzfZAoDdp89MQNY.jpg" alt="bg.jpg" className={styles.bg} draggable="false" />
      <MyNav
        navigationList={navigationList}
        canDelete={canDelete}
        handleChangeDeleteStatus={handleChangeDeleteStatus}
        speedDialShow={speedDialShow}
        handleChangeSpeedDialShow={handleChangeSpeedDialShow}
        handleSubmitSearch={handleSubmitSearch}
        refresh={getNavigationList}
      />
      <Outlet
        context={{ prop: {
          loading,
          canDelete,
          handleChangeDeleteStatus,
          navigationList,
          getNavigationList,
          searchList,
        }}}
      />
      {speedDialShow &&
        <SpeedDials
          open={speedDialOpen}
          handleChangeSpeedDialStatus={handleChangeSpeedDialStatus}
          refresh={getNavigationList} 
        />
      }
      <Backdrop open={speedDialOpen} style={{ zIndex: 999 }} />
    </div>
  );
}
