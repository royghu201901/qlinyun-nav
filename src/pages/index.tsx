import { useState, useEffect } from 'react'
import type { Theme } from '@material-ui/core/styles'
import {
  makeStyles,
  createStyles
} from '@material-ui/core/styles'
import { Box } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import MyCard from './components/MyCard'

import type {
  ModuleInterfaces,
  CardListInterface
} from './type'

import {
  getNavcationListApi,
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
    },
  })
)

const Module = (props: ModuleInterfaces) => {
  const classes = useStyles()
  const { module } = props
  const { name, cards } = module

  return (
    <div className={classes.module}>
      <div className={classes.moduleTitle}>
        {name}({cards.length})
      </div>
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
          />
        ))}
      </div>
    </div>
  )
}

const MyBoard = () => {
  const classes = useStyles()

  const [loading, setLoading] = useState<boolean>(false)

  const [navcationList, setNavcationList] = useState<object[]>([])

  const getNavcationList = async () => {
    try {
      setLoading(true)
      const data = await getNavcationListApi<CardListInterface[]>()
      setNavcationList(data)
    } catch (e: any) {
      console.log(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getNavcationList()
  },[])

  return (
    <div className={loading ? classes.loadingBoard : classes.myBoard}>
      {(loading ? Array.from(new Array(15)) : navcationList).map((module: CardListInterface, index: number) => (
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