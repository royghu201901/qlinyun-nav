import type {
  FC,
} from 'react'
import {
  useState,
  useEffect,
} from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle as MuiDialogTitle,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Box,
  Typography,
  IconButton
} from '@material-ui/core'
import type {
  Theme,
} from '@material-ui/core/styles'
import {
  withStyles,
  makeStyles,
  createStyles
} from '@material-ui/core/styles'
import {
  Search as SearchIcon,
  Close as CloseIcon,
} from '@material-ui/icons'

import DateFnsUtils from '@date-io/dayjs'
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs'
import zhCn from 'dayjs/locale/zh-cn'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers'

import type {
  LogInterface
} from '@/pages/type'

import {
  getLogApi,
} from '@/api/fetch'

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
    },
  }),
)(TableCell)

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }),
)(TableRow)

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    picker: {
      marginRight: theme.spacing(4)
    },
    tableContainer: {
      margin: theme.spacing(2,0),
    },
    table: {
      minHeight: 590,
    },
    actionBar: {
      display: 'flex',
      alignItems: 'center',
    },
    searchBtn: {
      marginLeft: theme.spacing(3)
    },
    closeBtn: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  })
)

export interface LogDialogProps {
  open: boolean
  logList: LogInterface[]
  setLog: (data: LogInterface[]) => void
  onClose: () => void
}

export interface DialogTitleProps {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}

const DialogTitle = (props: DialogTitleProps) => {
  const classes = useStyles()
  const { children, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeBtn} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  )
}

const LogDialog: FC<LogDialogProps>  = ({open,logList,setLog,onClose}) => {
  const classes = useStyles()
  // 起始日期
  const [beforeDate, setBeforeDate] = useState<Dayjs | null>(dayjs())
  // 结束日期
  const [afterDate, setAfterDate] = useState<Dayjs | null>(dayjs())

  // 根据实际获取日志
  const getLogList = async () => {
    try {
      const res = await getLogApi<LogInterface[]>({
        beforeDate: dayjs(beforeDate).format('YYYY-MM-DD'),
        afterDate: dayjs(afterDate).format('YYYY-MM-DD'),
      })
      setLog(res)
    } catch (e: any) {
      console.log(e)
    }
  }

  // // 修改起始日期
  // const handleBeforeDateChange = (date: Dayjs | null) => {
  //   setBeforeDate(date)
  //   console.log('beforeDate===>', dayjs(beforeDate).date())
  //   // getLogList()
  // }
  // // 修改结束日期
  // const handleAfterDateChange = (date: Dayjs | null) => {
  //   setAfterDate(date)
  //   console.log('afterDate===>', dayjs(afterDate).date())
  //   // getLogList()
  // }

  useEffect(() => {
    getLogList()
  },[])

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        fullWidth={true}
        maxWidth="lg"
        scroll="paper"
        aria-labelledby="log-dialog-title"
        aria-describedby="log-dialog-log"
      >
        <DialogTitle id="log-dialog-title" onClose={onClose}>{'操作日志'}</DialogTitle>
        <DialogContent dividers>
          <DialogContentText id="alert-dialog-description">
            请选择日志时间区间
          </DialogContentText>
          <Box className={classes.actionBar}>
            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={zhCn}>
              <KeyboardDatePicker
                className={classes.picker}
                disableToolbar
                margin="normal"
                variant="inline"
                id="date-picker-dialog-beforeDate"
                label="日志起始日期"
                format="YYYY-MM-DD"
                value={beforeDate}
                onChange={(date) => setBeforeDate(date)}
                KeyboardButtonProps={{
                  'aria-label': 'change start date',
                }}
              />
              <KeyboardDatePicker
                disableToolbar
                margin="normal"
                variant="inline"
                id="date-picker-dialog-afterDate"
                label="日志结束时间"
                format="YYYY-MM-DD"
                value={afterDate}
                onChange={(date) => setAfterDate(date)}
                KeyboardButtonProps={{
                  'aria-label': 'change end date',
                }}
              />
            </MuiPickersUtilsProvider>
            <Button
              variant="contained"
              color="primary"
              className={classes.searchBtn}
              startIcon={<SearchIcon />}
              onClick={() => getLogList()}
            >
              查询日志
            </Button>
          </Box>
          <TableContainer className={classes.tableContainer} component={Paper}>
            <Table className={classes.table} aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center" style={{ minWidth: 45 }}>id</StyledTableCell>
                  <StyledTableCell style={{ minWidth: 120 }}>操作</StyledTableCell>
                  <StyledTableCell style={{ minWidth: 160 }}>操作时间</StyledTableCell>
                  <StyledTableCell style={{ minWidth: 200 }}>修改前相关内容</StyledTableCell>
                  <StyledTableCell style={{ minWidth: 200 }}>修改后相关内容</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {logList.map((row) => (
                  <StyledTableRow key={row.id}>
                    <StyledTableCell align="center" component="th" scope="row">
                      {row.id}
                    </StyledTableCell>
                    <StyledTableCell>{row.message}</StyledTableCell>
                    <StyledTableCell>{dayjs(row.changeTime).format('YYYY-MM-DD HH:mm:ss')}</StyledTableCell>
                    <StyledTableCell>{row.beforeMessage}</StyledTableCell>
                    <StyledTableCell>{row.afterMessage}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            关闭
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default LogDialog