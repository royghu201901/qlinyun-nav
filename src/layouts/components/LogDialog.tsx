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
} from '@/types'

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
  // ????????????
  const [beforeDate, setBeforeDate] = useState<Dayjs | null>(dayjs())
  // ????????????
  const [afterDate, setAfterDate] = useState<Dayjs | null>(dayjs())

  // ????????????????????????
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

  // ??????????????????
  const handleBeforeDateChange = (date: Dayjs | null) => {
    setBeforeDate(date)
    if (date && afterDate && date > afterDate) {
      setAfterDate(date)
    }
  }
  // ??????????????????
  const handleAfterDateChange = (date: Dayjs | null) => {
    setAfterDate(date)
    if (date && beforeDate && date < beforeDate) {
      setBeforeDate(date)
    }
  }

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
        <DialogTitle id="log-dialog-title" onClose={onClose}>{'????????????'}</DialogTitle>
        <DialogContent dividers>
          <DialogContentText id="alert-dialog-description">
            ???????????????????????????
          </DialogContentText>
          <Box className={classes.actionBar}>
            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={zhCn}>
              <KeyboardDatePicker
                className={classes.picker}
                disableToolbar
                margin="normal"
                variant="inline"
                id="date-picker-dialog-beforeDate"
                label="??????????????????"
                format="YYYY-MM-DD"
                value={beforeDate}
                onChange={handleBeforeDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change start date',
                }}
              />
              <KeyboardDatePicker
                disableToolbar
                margin="normal"
                variant="inline"
                id="date-picker-dialog-afterDate"
                label="??????????????????"
                format="YYYY-MM-DD"
                value={afterDate}
                onChange={handleAfterDateChange}
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
              ????????????
            </Button>
          </Box>
          <TableContainer className={classes.tableContainer} component={Paper}>
            <Table className={classes.table} aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center" style={{ minWidth: 45 }}>id</StyledTableCell>
                  <StyledTableCell style={{ minWidth: 120 }}>??????</StyledTableCell>
                  <StyledTableCell style={{ minWidth: 160 }}>????????????</StyledTableCell>
                  <StyledTableCell style={{ minWidth: 200 }}>?????????????????????</StyledTableCell>
                  <StyledTableCell style={{ minWidth: 200 }}>?????????????????????</StyledTableCell>
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
            ??????
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default LogDialog
