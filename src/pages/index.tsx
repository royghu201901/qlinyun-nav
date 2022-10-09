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
} from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import {
  Edit as EditIcon
} from '@material-ui/icons'
import MyCard from './components/MyCard'

import type {
  ModuleInterfaces,
  CardListInterface
} from './type'

import {
  getNavigationListApi,
  // saveModuleApi,
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
    }
  })
)

const Module = (props: ModuleInterfaces) => {
  const classes = useStyles()
  const { module } = props
  const { name, cards } = module

  const [editStatus, setEditStatus] = useState<boolean>(false)
  const handleEditModule = () => {
    setEditStatus(!editStatus)
  }

  return (
    <div className={classes.module}>
      {!editStatus
        ?
          <div className={classes.moduleTitle}>
            {name}({cards.length})
            <IconButton
              size="small"
              className="moduleEditBtn"
              aria-label="edit module"
              onClick={handleEditModule}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </div>
        :
          <TextField
            label="模块名称"
            size="small"
            className={classes.moduleInput}
            margin="dense"
          />
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
