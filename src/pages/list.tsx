// import {
//   useState,
// } from 'react'
import { useOutletContext, useLocation } from 'umi'
import type { Theme } from '@material-ui/core/styles'
import {
  alpha,
  makeStyles,
  createStyles
} from '@material-ui/core/styles'
import {
  Box,
  // IconButton,
  // TextField,
  // Snackbar,
  Button,
} from '@material-ui/core'
import {
  Skeleton,
} from '@material-ui/lab'
import MyCard from './components/MyCard'

import type {
  // ModuleInterfaces,
  // CardListInterface,
  // ModuleProps,
  ContextInterface,
  CardProps,
} from './type'

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
    }
  })
)

const MyBoard = () => {
  const classes = useStyles()

  const layoutContext = useOutletContext<ContextInterface>()
  const { prop } = layoutContext
  const { loading, canDelete, handleChangeDeleteStatus, navigationList } = prop

  // 取消卡片删除
  const handleCancelDelete = () => {
    handleChangeDeleteStatus(false)
  }

  // 关注列表长度
  const favoriteList: CardProps[] = []
  navigationList.map(item => {
    item.cards.map(card => {
      if (card.label === 1) {
          card.environmentName = item.name
          favoriteList.push(card)
        }
    })
  })

  const cardList: CardProps[] = []
  const location = useLocation()
  if (location.pathname === '/favorite') {
    cardList.push(...favoriteList)
  }

  return (
    <div className={loading ? classes.loadingBoard : classes.myBoard}>
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