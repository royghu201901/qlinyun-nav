import type {
  FC,
  ChangeEvent,
} from 'react'
import React, { useState } from 'react'
import { generatePath, history } from 'umi'
import {
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  Badge,
  MenuItem,
  Menu,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  Tooltip,
  Zoom,
} from '@material-ui/core'
import {
  Apps as AppsIcon,
  Search as SearchIcon,
  // AccountCircle,
  Favorite as FavoriteIcon,
  Notifications as NotificationsIcon,
  MoreVert as MoreIcon,
  PlaylistAdd as PlaylistAddIcon,
} from '@material-ui/icons'
import type { Theme } from '@material-ui/core/styles';
import {
  alpha,
  makeStyles,
  createStyles
} from '@material-ui/core/styles'
import QuickAddDialog from './QuickAddDialog'
import ModuleAddDialog from './ModuleAddDialog'
import LogDialog from './LogDialog'
import type {
  CardListInterface,
  LogInterface,
  ModuleProps,
} from '@/pages/type'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    myNav: {
      flexGrow: 1,
      height: theme.spacing(6),
    },
    menuButton: {
      marginRight: theme.spacing(0),
      borderRadius: '3px',
      backgroundColor: alpha(theme.palette.common.white, 0.15),
      margin: '5px',
      padding: '5px 7px',
      '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25)
      }
    },
    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    },
    searchIcon: {
      color: 'inherit',
      padding: theme.spacing(0, 1),
      height: '100%',
      position: 'absolute',
      top: 0,
      right: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
      fontSize: '14px'
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 2),
      // vertical padding + font size from searchIcon
      paddingRight: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
    transparentDark: {
      color: '#FFF',
      backgroundColor: 'rgba(0, 0, 0, 0.32)'
    },
    // orange: {
    //   color: theme.palette.getContrastText(deepOrange[500]),
    //   backgroundColor: deepOrange[500],
    // },
    userIcon: {
      fontSize: 8,
      fontWeight: 600,
      color: '#172B4D',
    },
    smallUserIcon: {
      width: theme.spacing(3),
      height: theme.spacing(3),
      fontSize: 8,
      fontWeight: 600,
      color: '#172B4D',
      backgroundColor: '#dfe1e6',
    },
    navBtn: {
      borderRadius: '3px',
      backgroundColor: alpha(theme.palette.common.white, 0.15),
      margin: '5px',
      padding: '5px 7px',
      '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
      },
    },
    renderMenu: {
      marginTop: '32px',
    },
    renderMenuAvatar: {
      paddingLeft: '0',
    },
    renderMenuItem: {
      fontSize: '14px'
    },
    divider: {
      marginTop: '10px',
      marginBottom: '10px',
    },
    appTitleFlex: {
      flexGrow: 1,
    },
    appTitle: {
      cursor: 'pointer',
      opacity: '0.5',
      position: 'absolute',
      left: '50%',
      top: '25%',
      transform: 'translate(-50%, 0)',
      fontWeight: 600,
      fontSize: '20px',
      transition: 'all 300ms ease-in-out',
      '&:hover': {
        opacity: '0.75',
      },
    },
  }),
)

export interface MyNavigationProps {
  canDelete: boolean
  handleChangeDeleteStatus: (flag: boolean) => void
  speedDialShow: boolean
  handleChangeSpeedDialShow: (flag: boolean) => void
  navigationList: CardListInterface[]
  moduleList: ModuleProps[]
  handleSubmitSearch: (keyword: string) => void
  refresh: () => void
}

const MyNavigation: FC<MyNavigationProps> = (props) => {
  const classes = useStyles()
  const {
    canDelete,
    handleChangeDeleteStatus,
    speedDialShow,
    handleChangeSpeedDialShow,
    navigationList,
    moduleList,
    handleSubmitSearch,
    refresh,
  } = props
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState<null | HTMLElement>(null)
  const [appAnchorEl, setAppAnchorEl] = useState<null | HTMLElement>(null)

  const isMenuOpen = Boolean(anchorEl)
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)
  const isAppMenuOpen = Boolean(appAnchorEl)

  // 右侧菜单开启
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  // 手机端右侧菜单关闭
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null)
  }

  // 右侧菜单关闭
  const handleMenuClose = () => {
    setAnchorEl(null)
    handleMobileMenuClose()
  }

  // 手机端右侧菜单开启
  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget)
  }

  // 左侧菜单关闭
  const handleAppMenuClose = () => {
    setAppAnchorEl(null)
  }

  // 左侧菜单开启
  const handleAppMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAppAnchorEl(event.currentTarget)
  }

  // 快速添加弹窗
  const [quickAddDialogOpen, setQuickAddDialogOpen] = useState(false)
  const handleOpenQuickAddDialog = () => {
    handleMenuClose()
    setQuickAddDialogOpen(true)
  }
  const handleCloseQuickAddDialog = () => {
    handleMenuClose()
    setQuickAddDialogOpen(false)
  }

  // 模块添加、修改弹窗
  const [moduleAddDialogOpen, setModuleAddDialogOpen] = useState(false)
  const [moduleAddDialogFlag, setModuleAddDialogFlag] = useState(false)
  const handleOpenModuleAddDialog = (flag: boolean) => {
    setModuleAddDialogFlag(flag)
    setModuleAddDialogOpen(true)
    handleMenuClose()
  }
  const handleCloseModuleAddDialog = () => {
    setModuleAddDialogOpen(false)
    handleMenuClose()
  }

  const handleSetDeleteStatus = () => {
    handleChangeDeleteStatus(!canDelete)
    handleMenuClose()
  }

  const handleSetSpeedDialShow= () => {
    handleChangeSpeedDialShow(!speedDialShow)
    handleMenuClose()
  }

  // 代码仓库地址
  const handleToRepository = () => {
    const link = 'https://github.com/royghu201901/qlinyun-nav'
    window.open(link, '_blank')
    handleMenuClose()
  }

  // 关注列表长度
  const favoriteList: object[] = []
  navigationList.map(item => {
    item.cards.map(card => {
      if (card.label === 1) {
          favoriteList.push(card)
        }
    })
  })

  // 日志弹窗
  const [logDialogShow, setLogDialogShow] = useState(false)
  const handleOpenLogDialog = () => {
    setLogDialogShow(true)
  }

  // 搜索框
  const [searchValue, setSearchValue] = useState('')
  const handleChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value)
  }

  const handlePushRoute = (type?: string, id?: string) => {
    if (type) {
      const path = id
        ? generatePath('/:type/:id', { type, id })
        : generatePath('/:type', { type })
      history.push(path)
      handleAppMenuClose()
    } else {
      history.push('/')
      handleAppMenuClose()
    }
  }

  const handlePushRouteWithSearch = (keyword: string) => {
    handleSubmitSearch(keyword)
    handlePushRoute('list')
  }

  // 右侧菜单
  const menuId = 'help-menu';
  const renderMenu = (
    <Menu
      className={classes.renderMenu}
      anchorEl={anchorEl}
      // anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} // 和 anchorEl={anchorEl} 只需要留一个
      id={menuId}
      keepMounted
      // transformOrigin={{ vertical: 'bottom', horizontal: 'right' }} // 和 anchorEl={anchorEl} 只需要留一个
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem>
        <List dense>
          <ListItem className={classes.renderMenuAvatar}>
            <ListItemAvatar>
              <Avatar className={classes.userIcon}>GM</Avatar>
            </ListItemAvatar>
            <ListItemText primary="国贸数字研发部" secondary="助力品牌出海 聚力品牌腾飞" />
          </ListItem>
        </List>
      </MenuItem>
      <Divider className={classes.divider} variant="middle" />
      <MenuItem className={classes.renderMenuItem} onClick={() => handleOpenModuleAddDialog(false)}>添加模块</MenuItem>
      <MenuItem className={classes.renderMenuItem} onClick={() => handleOpenModuleAddDialog(true)}>编辑模块</MenuItem>
      <MenuItem className={classes.renderMenuItem} onClick={handleOpenQuickAddDialog}>添加导航地址</MenuItem>
      <MenuItem className={classes.renderMenuItem} onClick={handleSetDeleteStatus}>{canDelete ? '取消删除' : '删除导航地址'}</MenuItem>
      <MenuItem className={classes.renderMenuItem} onClick={handleSetSpeedDialShow}>{speedDialShow ? '关闭快速拨号' : '开启快速拨号'}</MenuItem>
      <Divider className={classes.divider} variant="middle" />
      <MenuItem className={classes.renderMenuItem} onClick={handleToRepository}>代码仓库地址</MenuItem>
    </Menu>
  )

  // 手机端右侧菜单
  const mobileMenuId = 'help-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show more favorite" color="inherit">
          <Badge overlap="rectangular" badgeContent={favoriteList.length} color="secondary">
            <FavoriteIcon />
          </Badge>
        </IconButton>
        <p>关注列表</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge overlap="rectangular" badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>操作日志</p>
      </MenuItem>
    </Menu>
  )

  // 左侧菜单
  const appMenuId = 'app-menu'
  const appMenu = (
    <Menu
      className={classes.renderMenu}
      anchorEl={appAnchorEl}
      id={appMenuId}
      keepMounted
      open={isAppMenuOpen}
      onClose={handleAppMenuClose}
    >
      <MenuItem className={classes.renderMenuItem} onClick={() => handlePushRoute()}>全部导航</MenuItem>
      <MenuItem className={classes.renderMenuItem} onClick={() => handlePushRoute('favorite')}>关注列表</MenuItem>
      <Divider className={classes.divider} variant="middle" />
      {navigationList.map((nav) => {
        return (
          <MenuItem
            className={classes.renderMenuItem}
            key={nav.id}
            value={nav.id}
            onClick={() => handlePushRoute('list', (nav.id).toString())}
          >
            {nav.name}
          </MenuItem>
        )
      })}
    </Menu>
  )

  // 日志列表
  const [logList, setLogList] = useState<LogInterface[]>([])
  const handleSetLogList = (data: LogInterface[]) => {
    setLogList(data)
  }

  return (
    <div className={classes.myNav}>
      <AppBar position="relative" color="transparent" elevation={0}>
        <Toolbar variant="dense" className={classes.transparentDark}>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={handleAppMenuOpen}
          >
            <AppsIcon />
          </IconButton>
          <div className={classes.search}>
            {/* <div className={classes.searchIcon}>
              <SearchIcon />
            </div> */}
            <InputBase
              value={searchValue}
              placeholder="搜索关键词…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              onChange={handleChangeSearch}
            />
            <IconButton
              type="submit"
              size="small"
              className={classes.searchIcon}
              aria-label="search"
              onClick={() => handlePushRouteWithSearch(searchValue)}
            >
              <SearchIcon />
            </IconButton>
          </div>
          <div className={classes.appTitleFlex}>
            <div className={classes.appTitle} onClick={() => handlePushRoute()}>
              国贸数字研发部导航
            </div>
          </div>
          <div className={classes.sectionDesktop}>
            <Tooltip title="快速添加" arrow TransitionComponent={Zoom}>
              <IconButton aria-label="add new nav" color="inherit" className={classes.navBtn} onClick={handleOpenQuickAddDialog}>
                <PlaylistAddIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="关注列表" arrow TransitionComponent={Zoom}>
              <IconButton
                aria-label="show more favorite"
                color="inherit"
                className={classes.navBtn}
                onClick={() => handlePushRoute('favorite')}
              >
                <Badge overlap="rectangular" badgeContent={favoriteList.length} color="secondary">
                  <FavoriteIcon />
                </Badge>
              </IconButton>
            </Tooltip>
            <Tooltip title="操作日志" arrow TransitionComponent={Zoom}>
              <IconButton
                aria-label="show more notifications"
                color="inherit"
                className={classes.navBtn}
                onClick={handleOpenLogDialog}
              >
                <Badge overlap="rectangular" badgeContent={logList.length} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Tooltip>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <Avatar className={classes.smallUserIcon}>GM</Avatar>
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {appMenu}
      {renderMobileMenu}
      {renderMenu}
      <QuickAddDialog open={quickAddDialogOpen} moduleList={moduleList} refresh={refresh} onClose={() => handleCloseQuickAddDialog()} />
      <ModuleAddDialog editFlag={moduleAddDialogFlag} open={moduleAddDialogOpen} moduleList={moduleList} onClose={() => handleCloseModuleAddDialog()} />
      <LogDialog open={logDialogShow} logList={logList} setLog={handleSetLogList} onClose={() => setLogDialogShow(false)} />
    </div>
  )
}

export default MyNavigation
