import type { ChangeEvent } from 'react'
import { useState, useEffect } from 'react'
import type { Theme } from '@material-ui/core/styles'
import {
  makeStyles,
  createStyles
} from '@material-ui/core/styles'
import {
  Box,
  IconButton,
  TextField,
  Snackbar,
  Button,
} from '@material-ui/core'
import {
  Skeleton,
  Alert,
} from '@material-ui/lab'
import {
  Edit as EditIcon,
  Sync as SyncIcon,
} from '@material-ui/icons'
import MyCard from './components/MyCard'

import type {
  ModuleInterfaces,
  CardListInterface,
  ModuleProps,
} from './type'

import {
  getNavigationListApi,
  saveModuleApi,
} from '@/api/fetch'

// import cardList from './data'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    myBoard: {
      // height: 'calc(100vh - 48px)',
      // overflow: 'auto',
      padding: theme.spacing(3)
    },
    loadingBoard: {
      padding: theme.spacing(3),
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, 345px)',
      gridGap: '1rem',
      justifyContent: 'space-between',
    },
    scrollbar: {
      height: '100%',
    },
    module: {
      marginBottom: theme.spacing(2),
    },
    moduleContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, 345px)',
      gridGap: '1rem',
      justifyContent: 'space-between',
      '&::after': {
        content: '',
        width: 'auto',
      }
    },
    moduleTitle: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: theme.palette.common.black,
      marginBottom: theme.spacing(2),
      width: '100%',
      height: '45px',
      display: 'flex',
      alignItems: 'center',
      '&:hover .moduleEditBtn': {
        display: 'inline-block',
        marginLeft: theme.spacing(1)
      },
      '& .moduleEditBtn': {
        display: 'none'
      }
    },
    moduleInput: {
      margin: theme.spacing(1),
      marginBottom: theme.spacing(2),
    },
    moduleSyncBtn: {
      marginLeft: theme.spacing(1)
    }
  })
)

const Module = (props: ModuleInterfaces) => {
  const classes = useStyles()
  const { module } = props
  const { id, name, cards } = module

  // 显示修改模块名称的输入框
  const [editStatus, setEditStatus] = useState(false)
  const handleShowTextField = () => {
    setEditStatus(true)
  }

  // 修改模块名称
  const [moduleData, setModuleData] = useState<ModuleProps>({
    id,
    name,
  })
  const handleEditModule = (event: ChangeEvent<HTMLInputElement>) => {
    setModuleData({
      ...moduleData,
      name: event.target.value
    })
  }

  // 错误内容
  const [errorMessage, setErrorMessage] = useState('')
  // 显示错误
  const [errorShow, setErrorShow] = useState(false)

  // 同步模块名称
  const handleSyncModule = async () => {
    try {
      await saveModuleApi<ModuleProps>(moduleData)
      setEditStatus(false)
    } catch (e: any) {
      setErrorMessage(e.message)
      setErrorShow(true)
      // console.log(e.message)
    }
  }

  return (
    <>
      <div className={classes.module}>
        {!editStatus
          ?
            <div className={classes.moduleTitle}>
              {name}({cards.length})
              <IconButton
                size="small"
                className="moduleEditBtn"
                aria-label="edit module"
                onClick={handleShowTextField}
              >
                <EditIcon fontSize="small" />
              </IconButton>
            </div>
          :
            <>
              <TextField
                value={moduleData.name}
                label="模块名称"
                size="small"
                className={classes.moduleInput}
                margin="dense"
                onChange={handleEditModule}
              />
              <Button
                variant="contained"
                size="small"
                color="primary"
                className={classes.moduleSyncBtn}
                disableElevation
                startIcon={<SyncIcon />}
                onClick={handleSyncModule}
              >
                同步模块名称
              </Button>
            </>
        }
        <div className={classes.moduleContainer}>
          {cards.map((card) => (
            <MyCard
              id={card.id}
              key={card.id}
              title={card.title}
              image={card.image}
              description={card.description}
              url={card.url}
              label={card.label}
              environmentName={name}
            />
          ))}
        </div>
      </div>
      <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={errorShow} autoHideDuration={3000} onClose={() => setErrorShow(false)}>
        <Alert onClose={() => setErrorShow(false)} severity="error">
          { errorMessage }
        </Alert>
      </Snackbar>
    </>
  )
}

const MyBoard = () => {
  const classes = useStyles()

  const [loading, setLoading] = useState<boolean>(false)

  const [navigationList, setNavigationList] = useState<object[]>([])

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

  useEffect(() => {
    getNavigationList()
  },[])

  return (
    <div className={loading ? classes.loadingBoard : classes.myBoard}>
      {(loading ? Array.from(new Array(15)) : navigationList).map((module: CardListInterface, index: number) => (
        module ? 
          (
            <Module
              index={index}
              key={module.id}
              module={module}
            />
          ) :
          (
            <Box pt={0.5} key={index}>
              <Skeleton variant="rect" width={345} height={140} />
              <Skeleton />
              <Skeleton width="60%" />
            </Box>
          )
      ))}
    </div>
  )
}

export default MyBoard
