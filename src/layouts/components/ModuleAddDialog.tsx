import type {
  FC,
  ChangeEvent,
} from 'react'
import {
  useState,
} from 'react'
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Snackbar,
  InputAdornment,
  IconButton,
} from '@material-ui/core'
import {
  Autocomplete,
  Alert
} from '@material-ui/lab'
import type { Theme } from '@material-ui/core/styles'
import {
  makeStyles,
  createStyles
} from '@material-ui/core/styles'
import {
  Close as CloseIcon
} from '@material-ui/icons';

import type {
  ModuleProps,
} from '@/types'

import {
  // getModuleListApi,
  saveModuleApi,
} from '@/api/fetch'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      // paddingBottom: theme.spacing(0),
    },
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      margin: theme.spacing(1, 0)
    },
    contentWrap: {
      overflow: 'hidden',
    },
    formControl: {
      width: '100%',
      marginBottom: theme.spacing(2),
      '& .MuiOutlinedInput-adornedEnd': {
        paddingRight: '6px !important'
      },
    },
    actions: {
      marginRight: theme.spacing(2),
      marginBottom: theme.spacing(1),
    }
  }),
)

export interface ModuleAddDialogProps {
  editFlag: boolean
  open: boolean
  moduleList: ModuleProps[]
  refresh: () => void
  onClose: () => void
}

const ModuleAddDialog: FC<ModuleAddDialogProps> = ({editFlag,open,moduleList,refresh,onClose}) => {
  const classes = useStyles()

  // 选择模块
  const [selectedData, setSelectedeData] = useState<ModuleProps | null>({
    id: undefined,
    name: ''
  })

  // 提交的数据
  const [moduleData, setModuleData] = useState<ModuleProps>({
    id: undefined,
    name: ''
  })

  const [moduleName, setModuleName] = useState('')

  const handleChangeSelectedeData = (value: ModuleProps | null) => {
    setSelectedeData(value)
    if (value) {
      setModuleData({
        ...moduleData,
        id: value.id
      })
    }
  }

  const handleChangeModuleName = (event: ChangeEvent<HTMLInputElement>) => {
    setModuleName(event.target.value)
    setModuleData({
      ...selectedData,
      name: event.target.value
    })
  }

  const handleClearModuleName = () => {
    setModuleName('')
    setModuleData({
      ...moduleData,
      name: ''
    })
  }

  // 错误内容
  const [errorMessage, setErrorMessage] = useState('')
  // 显示错误
  const [errorShow, setErrorShow] = useState(false)

  const handleCancel = () => {
    setModuleName('')
    setModuleData({
      id: undefined,
      name: ''
    })
    setSelectedeData({
      id: undefined,
      name: ''
    })
    onClose()
  }

  // 提交表单
  const handleSubmit = async () => {
    try {
      await saveModuleApi<ModuleProps>(moduleData)
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
        onClose={handleCancel}
        fullWidth={true}
        maxWidth='xs'
        scroll='paper'
        aria-labelledby="quick-dialog-title"
      >
        <DialogTitle id="quick-dialog-title" className={classes.title}>
          {editFlag ? '修改模块' : '添加模块'}
        </DialogTitle>
        <DialogContent className={classes.contentWrap}>
          <form className={classes.container}>
            {editFlag &&
              <FormControl required className={classes.formControl}>
                <Autocomplete
                  id="module-dialog-select"
                  value={selectedData}
                  size="small"
                  options={moduleList}
                  getOptionLabel={(moduleItem: ModuleProps) => moduleItem.name}
                  getOptionSelected={(option, value) =>
                    option.id === value.id
                  }
                  onChange={(event, value: ModuleProps | null) => {
                    handleChangeSelectedeData(value)
                  }}
                  renderInput={(params: object) => (
                    <TextField
                      {...params}
                      name="environmentId"
                      label="旧的模块名称"
                      size="small"
                      variant="outlined"
                    />
                  )}
                />
              </FormControl>
            }
            <FormControl required className={classes.formControl}>
              <TextField
                value={moduleName}
                margin="dense"
                name="title"
                label="新的模块名称"
                fullWidth
                size="small"
                variant="outlined"
                InputProps={{
                  endAdornment: 
                    <InputAdornment position="end">
                      {moduleName &&
                        <IconButton
                          aria-label="toggle close"
                          size="small"
                          onClick={handleClearModuleName}
                        >
                          <CloseIcon />
                        </IconButton>
                      }
                    </InputAdornment>,
                }}
                onChange={handleChangeModuleName}
              />
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions className={classes.actions}>
          <Button onClick={handleCancel} variant="contained">
            取消
          </Button>
          <Button onClick={handleSubmit} color="primary" variant="contained">
            确定
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

export default ModuleAddDialog
