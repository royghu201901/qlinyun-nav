import type {
  FC,
} from 'react'
import {
  useState,
} from 'react'
import { useOutletContext } from 'umi'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
} from '@material-ui/core'
import {
  Alert
} from '@material-ui/lab'

import type {
  ContextInterface,
} from '../type'

import {
  deleteWebsiteApi,
} from '@/api/fetch'

export interface DeleteDialogProps {
  id: number
  title: string
  open: boolean
  refresh: () => void
  onClose: () => void
}

const DeleteDialog: FC<DeleteDialogProps>  = ({id,title,open,refresh,onClose}) => {
  // 刷新接口
  const layoutContext = useOutletContext<ContextInterface>()
  const { prop } = layoutContext
  const { handleChangeDeleteStatus } = prop

  // 错误内容
  const [errorMessage, setErrorMessage] = useState('')
  // 显示错误
  const [errorShow, setErrorShow] = useState(false)

   // 确定删除
  const handleSubmit = async () => {
    try {
      await deleteWebsiteApi<number>(id)
      handleChangeDeleteStatus(false)
      onClose()
      refresh()
    } catch (e: any) {
      setErrorMessage(e.message)
      setErrorShow(true)
    }
  }
  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'删除导航'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            是否确定删除 {title} 导航卡片？删除后无法恢复！
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} variant="contained">
            取消
          </Button>
          <Button onClick={handleSubmit} color="secondary" variant="contained" autoFocus>
            删除
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={errorShow} autoHideDuration={3000} onClose={() => setErrorShow(false)}>
        <Alert onClose={() => setErrorShow(false)} severity="error">
          { errorMessage }
        </Alert>
      </Snackbar>
    </>
  )
}

export default DeleteDialog