import { useState } from 'react'
import copy from 'copy-to-clipboard'
import type { Theme } from '@material-ui/core/styles';
import {
  alpha,
  makeStyles,
  createStyles
} from '@material-ui/core/styles'
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
  Snackbar,
  Link,
} from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import {
  Favorite as FavoriteIcon,
  Share as ShareIcon,
  Edit as EditIcon
} from '@material-ui/icons'
import { teal } from '@material-ui/core/colors'

import type {
  CardProps,
} from '../type'


import QuickAddDialog from '@/layouts/components/QuickAddDialog'

import {
  saveWebsiteApi,
} from '@/api/fetch'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 345,
      marginBottom: theme.spacing(2),
      '&:hover': {
        boxShadow: alpha(theme.palette.common.black, 0.15),
      },
    },
    media: {
      height: 140,
    },
    actions: {
      justifyContent: 'space-evenly'
    }
  })
)

export default function MyCard(props: CardProps) {
  const classes = useStyles()
  const { id, title, image, description, url, label } = props
  const [favorite, setFavorite] = useState(!!label) 

  const [messageShow, setMessageShow] = useState(false)


  // 修改导航弹窗
  const [quickAddDialogOpen, setQuickAddDialogOpen] = useState(false)
  const handleOpenQuickAddDialog = () => {
    setQuickAddDialogOpen(true)
  }
  const handleCloseQuickAddDialog = () => {
    setQuickAddDialogOpen(false)
  }

  // 添加到关注列表
  const handleChangeFavorite = async () => {
    try {
      await saveWebsiteApi<CardProps>({
        ...props,
        label: favorite ? 0 : 1
      })
      setFavorite(!favorite)
    } catch (e: any) {
      console.log(e.message)
    }
  }

  // 分享链接
  const handleShare = () => {
    copy(url)
    setMessageShow(true)
  }

  return (
    <>
      <Card className={classes.root} raised={true}>
        <Link
          component={CardActionArea}
          href={url}
          target="_blank"
          rel="noopener"
          color="inherit"
          underline="none">
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={image}
              title={title}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {title}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {description}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Link>
        <CardActions className={classes.actions}>
          <IconButton aria-label="add to favorites" onClick={() => handleChangeFavorite()}>
            <FavoriteIcon color={favorite ? 'secondary' : 'inherit'} />
          </IconButton>
          <IconButton aria-label="edit card" onClick={handleOpenQuickAddDialog}>
            <EditIcon style={{ color: teal[800] }} />
          </IconButton>
          <IconButton aria-label="share" onClick={() => handleShare()}>
            <ShareIcon color="primary" />
          </IconButton>
        </CardActions>
      </Card>
      <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={messageShow} autoHideDuration={1000} onClose={() => setMessageShow(false)}>
        <Alert onClose={() => setMessageShow(false)} severity="success">
          地址已成功复制到剪贴板！
        </Alert>
      </Snackbar>
      {quickAddDialogOpen &&
        <QuickAddDialog id={id} navData={props} open={quickAddDialogOpen} onClose={() => handleCloseQuickAddDialog()} />
      }
    </>
  )
}
