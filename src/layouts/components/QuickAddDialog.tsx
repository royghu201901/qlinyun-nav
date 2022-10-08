import type {
  FC,
  ChangeEvent
} from 'react'
import {
  useState,
  useEffect
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

import type {
  ModuleProps,
  CardProps
} from '@/pages/type'

import {
  getModuleListApi,
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
    },
  }),
)

export interface QuickAddDialogProps {
  open: boolean
  onClose: () => void
}

const QuickAddDialog: FC<QuickAddDialogProps> = ({open,onClose}) => {
  const classes = useStyles()

  const [navCard, setNavCard] = useState<CardProps>({
    title: '',
    image: '',
    description: '',
    url: '',
    label: false,
    environmentId: undefined
  })

  // const handleSelectModule = (event: ChangeEvent<{ value: unknown }>) => {
  //   setModule(event.target.value as string)
  // }
  // const handleClearModule = () => {
  //   setModule('')
  // }

  // 修改导航表单
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
      [event.target.name]: event.target.checked
    })
  }

  const [moduleList, setModuleList] = useState<ModuleProps[]>([])
  const getModuleList = async () => {
    try {
      const data = await getModuleListApi<ModuleProps[]>()
      setModuleList(data)
    } catch (e: any) {
      console.log(e)
    }
  }

  // 取消清空
  const handleCancel = (event: any, reason: string) => {
    if (reason && reason === 'backdropClick') {
      return
    }
    setNavCard({
      title: '',
      image: '',
      description: '',
      url: '',
      label: false,
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
      onClose()
    } catch (e: any) {
      setErrorMessage(e.message)
      setErrorShow(true)
      // console.log(e.message)
    }
  }


  useEffect(() => {
    getModuleList()
  },[])

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleCancel}
        fullWidth={true}
        maxWidth='xs'
        scroll='paper'
        aria-labelledby="quick-dialog-title"
      >
        <DialogTitle id="quick-dialog-title" className={classes.title}>快速添加</DialogTitle>
        <DialogContent>
          <DialogContentText>
            快速添加导航及其指定模块（所有选项必填）
          </DialogContentText>
          <form className={classes.container}>
            <FormControl required className={classes.formControl}>
              <Autocomplete
                id="quick-dialog-select"
                size="small"
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
                onChange={handleChangeForm}
              />
            </FormControl>
            <FormControl required className={classes.formControl}>
              <FormControlLabel
                control={
                  <Switch
                    checked={navCard.label}
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
        <DialogActions>
          <Button onClick={() => handleCancel({}, 'escapeKeyDown')} color="primary">
            取消
          </Button>
          <Button onClick={handleSubmit} color="primary">
            确定
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={errorShow} autoHideDuration={3000} onClose={() => setErrorShow(false)}>
        <Alert onClose={() => setErrorShow(false)} severity="error">
          { errorMessage }
        </Alert>
      </Snackbar>
    </div>
  );
}

export default QuickAddDialog