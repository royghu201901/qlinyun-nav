import {
  useState,
  useEffect,
} from 'react'
import { useOutletContext, useParams, history } from 'umi'
import type { Theme } from '@material-ui/core/styles'
import {
  alpha,
  makeStyles,
  createStyles
} from '@material-ui/core/styles'
import {
  Box,
  Button,
} from '@material-ui/core'
import {
  Skeleton,
} from '@material-ui/lab'
import {
  Home as HomeIcon,
} from '@material-ui/icons'
import MyCard from './components/MyCard'

import type {
  ContextInterface,
  CardProps,
} from '@/types'

import {
  getNavigationListByIdApi,
} from '@/api/fetch'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    myBoard: {
      padding: theme.spacing(3),
      paddingTop: '77px',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, 345px)',
      gridGap: '1rem',
      justifyContent: 'space-between',
      '&::after': {
        content: '',
        width: 'auto',
      },
      position: 'relative',
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
    cancelDeleteBtn: {
      position: 'absolute',
      top: theme.spacing(3),
      left: '50%',
      transform: 'translate(-50%, 0)',
      color: theme.palette.common.white,
      backgroundColor: alpha(theme.palette.common.black, 0.32),
      '&:hover': {
        backgroundColor: alpha(theme.palette.common.black, 0.25)
      }
    },
    backToHomeBtn: {
      position: 'absolute',
      top: theme.spacing(3),
      left: theme.spacing(3),
      color: theme.palette.common.white,
      backgroundColor: alpha(theme.palette.common.black, 0.32),
      '&:hover': {
        backgroundColor: alpha(theme.palette.common.black, 0.25)
      }
    },
  })
)

const MyBoard = () => {
  const classes = useStyles()

  const layoutContext = useOutletContext<ContextInterface>()
  const { prop } = layoutContext
  const { loading, canDelete, handleChangeDeleteStatus, navigationList, searchList } = prop

  // 返回首页
  const handlePushBackToHome = () => {
    history.push('/')
  }

  // 取消卡片删除
  const handleCancelDelete = () => {
    handleChangeDeleteStatus(false)
  }

  // 关注列表长度
  const favoriteList: CardProps[] = []
  navigationList.map(item => {
    item.cards.map(card => {
      if (card.label === 1) {
          card.environmentId = item.id
          card.environmentName = item.name
          favoriteList.push(card)
        }
    })
  })

  // 根据模块id获取cardList
  const [cardListById, setCardListById] = useState<CardProps[]>([])
  const getNavigationListById = async (id: number | string) => {
    try {
      const res = await getNavigationListByIdApi<CardProps[]>({environmentId: +id})
      setCardListById(res)
    } catch (e) {
      console.log(e)
    }
  }

  const cardList: CardProps[] = []
  const params = useParams()
  if (params.type === 'favorite') {
    cardList.push(...favoriteList)
  } else if (params.type === 'list') {
    if (params.id) {
      cardList.push(...cardListById)
    } else {
      cardList.push(...searchList)
    }
  }

  useEffect(() => {
    if (params.id) {
      getNavigationListById(params.id)
    }
  },[params.id])

  return (
    <div className={loading ? classes.loadingBoard : classes.myBoard}>
      {!loading &&
        <Button
          variant="contained"
          size="small"
          className={classes.backToHomeBtn}
          disableElevation
          startIcon={<HomeIcon />}
          onClick={handlePushBackToHome}
        >
          返回首页
        </Button>
      }
      {canDelete &&
        <Button
          variant="contained"
          size="small"
          className={classes.cancelDeleteBtn}
          disableElevation
          onClick={handleCancelDelete}
        >
          取消删除
        </Button>
      }
      {(loading ? Array.from(new Array(15)) : cardList).map((card: CardProps, index: number) => (
        card ? 
          (
            <MyCard
              id={card.id}
              key={card.id}
              title={card.title}
              image={card.image}
              description={card.description}
              url={card.url}
              label={card.label}
              environmentName={card.environmentName}
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
