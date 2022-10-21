import type {
  FC,
  ChangeEvent
} from 'react'
import {
  useState,
  useEffect,
  useCallback,
} from 'react'
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Switch,
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
  CardProps,
} from '@/pages/type'

import {
  saveWebsiteApi,
} from '@/api/fetch'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      // paddingBottom: theme.spacing(0),
    },
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      minHeight: '275px'
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

export interface QuickAddDialogProps {
  id?: number
  navData?: CardProps
  open: boolean
  moduleList: ModuleProps[]
  refresh: () => void
  onClose: () => void
}

const QuickAddDialog: FC<QuickAddDialogProps> = ({id,navData,open,moduleList,refresh,onClose}) => {
  const classes = useStyles()

  const [navCard, setNavCard] = useState<CardProps>({
    id,
    title: '',
    image: '',
    description: '',
    url: '',
    label: 0,
    environmentId: undefined,
    environmentName: ''
  })

  const [moduleData, setModule] = useState<ModuleProps>({
    id: undefined,
    name: ''
  })

  // 修改导航回填
  const initNavData = useCallback(() => {
    if (navData) {
      setNavCard(navData)
      setModule({
        id: navData.environmentId,
        name: navData.environmentName || ''
      })
    }
  }, [navData])

  // 修改导航表单某一项
  const handleChangeForm = (event: ChangeEvent<HTMLInputElement>) => {
    setNavCard({
      ...navCard,
      [event.target.name]: event.target.value
    })
  }

  // 修改是否添加到关注列表
  const handleChangeLabel = (event: ChangeEvent<HTMLInputElement>) => {
    setNavCard({
      ...navCard,
      [event.target.name]: event.target.checked ? 1 : 0
    })
  }

  // 取消按钮，清空表单
  const handleCancel = (event: any, reason: string) => {
    if (reason && reason === 'backdropClick') {
      return
    }
    setNavCard({
      title: '',
      image: '',
      description: '',
      url: '',
      label: 0,
      environmentId: undefined
    })
    onClose()
  }

  // 错误内容
  const [errorMessage, setErrorMessage] = useState('')
  // 显示错误
  const [errorShow, setErrorShow] = useState(false)

  // 提交表单
  const handleSubmit = async () => {
    try {
      await saveWebsiteApi<CardProps>(navCard)
      setNavCard({
        title: '',
        image: '',
        description: '',
        url: '',
        label: 0,
        environmentId: undefined
      })
      onClose()
      refresh()
    } catch (e: any) {
      setErrorMessage(e.message)
      setErrorShow(true)
    }
  }

  useEffect(() => {
    initNavData()
  },[initNavData])

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
          {id ? '修改导航' : '快速添加'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {id ? '修改' : '快速添加'}导航及其指定模块（所有选项必填）
          </DialogContentText>
          <form className={classes.container}>
            <FormControl required className={classes.formControl}>
              <Autocomplete
                id="quick-dialog-select"
                value={moduleData}
                size="small"
                clearOnBlur={false}
                options={moduleList}
                getOptionLabel={(moduleItem: ModuleProps) => moduleItem.name}
                onChange={(event, value) => {
                  setNavCard({
                    ...navCard,
                    environmentId: value?.id
                  })
                }}
                renderInput={(params: object) => (
                  <TextField
                    {...params}
                    name="environmentId"
                    label="所属模块"
                    size="small"
                    variant="outlined"
                  />
                )}
              />
            </FormControl>
            <FormControl required className={classes.formControl}>
              <TextField
                value={navCard.title}
                margin="dense"
                name="title"
                label="导航名称"
                fullWidth
                size="small"
                variant="outlined"
                InputProps={{
                  endAdornment: 
                    <InputAdornment position="end">
                      {navCard.title &&
                        <IconButton
                          aria-label="toggle close"
                          size="small"
                          onClick={() => setNavCard({
                            ...navCard,
                            title: ''
                          })}
                        >
                          <CloseIcon />
                        </IconButton>
                      }
                    </InputAdornment>,
                }}
                onChange={handleChangeForm}
              />
            </FormControl>
            <FormControl required className={classes.formControl}>
              <TextField
                value={navCard.image}
                margin="dense"
                name="image"
                label="导航封面"
                fullWidth
                size="small"
                variant="outlined"
                InputProps={{
                  endAdornment: 
                    <InputAdornment position="end">
                      {navCard.image &&
                        <IconButton
                          aria-label="toggle close"
                          size="small"
                          onClick={() => setNavCard({
                            ...navCard,
                            image: ''
                          })}
                        >
                          <CloseIcon />
                        </IconButton>
                      }
                    </InputAdornment>,
                }}
                onChange={handleChangeForm}
              />
            </FormControl>
            <FormControl required className={classes.formControl}>
              <TextField
                value={navCard.description}
                margin="dense"
                name="description"
                label="导航描述"
                fullWidth
                size="small"
                variant="outlined"
                InputProps={{
                  endAdornment: 
                    <InputAdornment position="end">
                      {navCard.description &&
                        <IconButton
                          aria-label="toggle close"
                          size="small"
                          onClick={() => setNavCard({
                            ...navCard,
                            description: ''
                          })}
                        >
                          <CloseIcon />
                        </IconButton>
                      }
                    </InputAdornment>,
                }}
                onChange={handleChangeForm}
              />
            </FormControl>
            <FormControl required className={classes.formControl}>
              <TextField
                value={navCard.url}
                margin="dense"
                name="url"
                label="导航链接"
                fullWidth
                size="small"
                variant="outlined"
                InputProps={{
                  endAdornment: 
                    <InputAdornment position="end">
                      {navCard.url &&
                        <IconButton
                          aria-label="toggle close"
                          size="small"
                          onClick={() => setNavCard({
                            ...navCard,
                            url: ''
                          })}
                        >
                          <CloseIcon />
                        </IconButton>
                      }
                    </InputAdornment>,
                }}
                onChange={handleChangeForm}
              />
            </FormControl>
            <FormControl required className={classes.formControl}>
              <FormControlLabel
                control={
                  <Switch
                    checked={!!navCard.label}
                    onChange={handleChangeLabel}
                    name="label"
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                  />
                }
                label="是否添加到关注列表"
              />
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions className={classes.actions}>
          <Button onClick={() => handleCancel({}, 'escapeKeyDown')} variant="contained">
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
  );
}

export default QuickAddDialog
