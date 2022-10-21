
import type {
  FC,
} from 'react'
import { useState } from 'react'
import { generatePath, history } from 'umi'
import type { Theme } from '@material-ui/core/styles'
import {
  makeStyles,
  createStyles
} from '@material-ui/core/styles'
import {
  SpeedDial,
  SpeedDialIcon,
  SpeedDialAction
} from '@material-ui/lab'
import {
  Add as AddIcon,
  Favorite as FavoriteIcon,
  Home as HomeIcon,
  Navigation as NavigationIcon,
} from '@material-ui/icons'
import QuickAddDialog from './QuickAddDialog'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    speedDial: {
      position: 'fixed',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
      '& .MuiFab-root': {
        width: theme.spacing(5),
        height: theme.spacing(5),
      },
    },
  }),
)

export interface SpeedDialsProps {
  open: boolean
  handleChangeSpeedDialStatus: (flag: boolean) => void
  refresh: () => void
}

const SpeedDials: FC<SpeedDialsProps> = ({open, handleChangeSpeedDialStatus, refresh}) => {
  const classes = useStyles()

  const handleSpeedDialClose = () => {
    handleChangeSpeedDialStatus(false)
  }
  const handleSpeedDialOpen = () => {
    handleChangeSpeedDialStatus(true)
  }

  const handlePushRoute = (type?: string) => {
    if (type) {
      const path = generatePath('/:type', { type })
      history.push(path)
      handleSpeedDialClose()
    } else {
      history.push('/')
      handleSpeedDialClose()
    }
  }

  const handleBackToTop = () => {
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
    handleSpeedDialClose()
  }

  // 快速添加弹窗
  const [quickAddDialogOpen, setQuickAddDialogOpen] = useState(false)
  const handleOpenQuickAddDialog = () => {
    setQuickAddDialogOpen(true)
    handleSpeedDialClose()
  }
  const handleCloseQuickAddDialog = () => {
    setQuickAddDialogOpen(false)
    handleSpeedDialClose()
  }

  // 快捷按钮
  const actions = [
    { icon: <AddIcon />, name: '快捷添加', onClick: () => handleOpenQuickAddDialog() },
    { icon: <FavoriteIcon />, name: '关注列表', onClick: () => handlePushRoute('favorite') },
    { icon: <HomeIcon />, name: '返回首页', onClick: () => handlePushRoute() },
    { icon: <NavigationIcon />, name: '回到顶部', onClick: () => handleBackToTop() },
  ]

  return (
    <>
      <SpeedDial
        ariaLabel="SpeedDial"
        className={classes.speedDial}
        // hidden={hidden}
        icon={<SpeedDialIcon />}
        onClose={handleSpeedDialClose}
        onOpen={handleSpeedDialOpen}
        open={open}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.onClick}
          />
        ))}
      </SpeedDial>
      <QuickAddDialog open={quickAddDialogOpen} refresh={refresh} onClose={() => handleCloseQuickAddDialog()} />
    </>
  )
}

export default SpeedDials