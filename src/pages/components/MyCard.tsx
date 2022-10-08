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
  Share as ShareIcon
} from '@material-ui/icons'

import type {
  CardProps,
} from '../type'

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
  const { title, image, description, url, label } = props

  const [messageShow, setMessageShow] = useState(false)

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
          <IconButton aria-label="add to favorites">
            <FavoriteIcon color={label ? 'secondary' : 'inherit'} />
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
    </>
  )
}
