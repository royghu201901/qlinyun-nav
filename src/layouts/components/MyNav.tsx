import type {
  FC,
  ChangeEvent,
  MouseEvent,
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
  Paper,
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
} from '@/types'

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
      color: theme.palette.common.white,
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

  // ??????????????????
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  // ???????????????????????????
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null)
  }

  // ??????????????????
  const handleMenuClose = () => {
    setAnchorEl(null)
    handleMobileMenuClose()
  }

  // ???????????????????????????
  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget)
  }

  // ??????????????????
  const handleAppMenuClose = () => {
    setAppAnchorEl(null)
  }

  // ??????????????????
  const handleAppMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAppAnchorEl(event.currentTarget)
  }

  // ??????????????????
  const [quickAddDialogOpen, setQuickAddDialogOpen] = useState(false)
  const handleOpenQuickAddDialog = () => {
    handleMenuClose()
    setQuickAddDialogOpen(true)
  }
  const handleCloseQuickAddDialog = () => {
    handleMenuClose()
    setQuickAddDialogOpen(false)
  }

  // ???????????????????????????
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

  // ??????????????????
  const handleToRepository = () => {
    const link = 'https://github.com/royghu201901/qlinyun-nav'
    window.open(link, '_blank')
    handleMenuClose()
  }

  // ??????????????????
  const favoriteList: object[] = []
  navigationList.map(item => {
    item.cards.map(card => {
      if (card.label === 1) {
          favoriteList.push(card)
        }
    })
  })

  // ????????????
  const [logDialogShow, setLogDialogShow] = useState(false)
  const handleOpenLogDialog = () => {
    setLogDialogShow(true)
  }

  // ?????????
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

  const handlePushRouteWithSearch = (event: MouseEvent, keyword: string) => {
    event.preventDefault()
    handleSubmitSearch(keyword)
    handlePushRoute('list')
  }

  // ????????????
  const menuId = 'help-menu';
  const renderMenu = (
    <Menu
      className={classes.renderMenu}
      anchorEl={anchorEl}
      // anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} // ??? anchorEl={anchorEl} ??????????????????
      id={menuId}
      keepMounted
      // transformOrigin={{ vertical: 'bottom', horizontal: 'right' }} // ??? anchorEl={anchorEl} ??????????????????
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem>
        <List dense>
          <ListItem className={classes.renderMenuAvatar}>
            <ListItemAvatar>
              <Avatar className={classes.userIcon}>GM</Avatar>
            </ListItemAvatar>
            <ListItemText primary="?????????????????????" secondary="?????????????????? ??????????????????" />
          </ListItem>
        </List>
      </MenuItem>
      <Divider className={classes.divider} variant="middle" />
      <MenuItem className={classes.renderMenuItem} onClick={() => handleOpenModuleAddDialog(false)}>????????????</MenuItem>
      <MenuItem className={classes.renderMenuItem} onClick={() => handleOpenModuleAddDialog(true)}>????????????</MenuItem>
      <MenuItem className={classes.renderMenuItem} onClick={handleOpenQuickAddDialog}>??????????????????</MenuItem>
      <MenuItem className={classes.renderMenuItem} onClick={handleSetDeleteStatus}>{canDelete ? '????????????' : '??????????????????'}</MenuItem>
      <MenuItem className={classes.renderMenuItem} onClick={handleSetSpeedDialShow}>{speedDialShow ? '??????????????????' : '??????????????????'}</MenuItem>
      <Divider className={classes.divider} variant="middle" />
      <MenuItem className={classes.renderMenuItem} onClick={handleToRepository}>??????????????????</MenuItem>
    </Menu>
  )

  // ?????????????????????
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
        <p>????????????</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge overlap="rectangular" badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>????????????</p>
      </MenuItem>
    </Menu>
  )

  // ????????????
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
      <MenuItem className={classes.renderMenuItem} onClick={() => handlePushRoute()}>????????????</MenuItem>
      <MenuItem className={classes.renderMenuItem} onClick={() => handlePushRoute('favorite')}>????????????</MenuItem>
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

  // ????????????
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
          <Paper elevation={0} component="form" className={classes.search}>
            <InputBase
              value={searchValue}
              placeholder="??????????????????"
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
              onClick={(event) => handlePushRouteWithSearch(event, searchValue)}
            >
              <SearchIcon />
            </IconButton>
          </Paper>
          <div className={classes.appTitleFlex}>
            <div className={classes.appTitle} onClick={() => handlePushRoute()}>
              ???????????????????????????
            </div>
          </div>
          <div className={classes.sectionDesktop}>
            <Tooltip title="????????????" arrow TransitionComponent={Zoom}>
              <IconButton aria-label="add new nav" color="inherit" className={classes.navBtn} onClick={handleOpenQuickAddDialog}>
                <PlaylistAddIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="????????????" arrow TransitionComponent={Zoom}>
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
            <Tooltip title="????????????" arrow TransitionComponent={Zoom}>
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
      <ModuleAddDialog editFlag={moduleAddDialogFlag} open={moduleAddDialogOpen} moduleList={moduleList} refresh={refresh} onClose={() => handleCloseModuleAddDialog()} />
      <LogDialog open={logDialogShow} logList={logList} setLog={handleSetLogList} onClose={() => setLogDialogShow(false)} />
    </div>
  )
}

export default MyNavigation
