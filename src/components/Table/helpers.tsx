import React, { useState, useMemo, Fragment, useCallback, ReactNode, ReactElement } from 'react'
import { Button, Grid, Tooltip, IconButton, Menu, MenuItem, makeStyles, TableCell, Collapse, TableRow, useTheme, useMediaQuery } from '@material-ui/core'
import { camelize } from '../../utils/helpers'
import { uniqueId, get } from 'lodash'
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined'
import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded'
import cleanDeep from 'clean-deep'
import TypographyLabel from '../TypographyLabel'

const useStyles = makeStyles(theme => ({
  menu: {
    padding: '.3em'
  },
  mainMobileRow: {
    borderBottom: 'unset',
    width: '100vw',
    '& > *': {
      borderBottom: 'unset'
    }
  },
  collapsableMobileRow: {
    borderBottom: 'unset',
    '& > *': {
      borderBottom: 'unset',
      '& > *': {
        borderBottom: 'unset'
      }
    }
  },
  collapsableMobileRowCell: {
    paddingBottom: 0,
    paddingTop: 0,
    borderBottom: theme.type === 'light'
      ? '1px solid rgba(0, 0, 0, .03)'
      : '1px solid rgba(224, 224, 224, .1)'
  }
}))


export type TableHeaderData = {
  id?: string
  main?: any
  name: string
  style?: any
}

export type TableRowData = {
  [field: string]: any
}

interface TableData {
  headers: TableHeaderData[],
  data: TableRowData[]
}

interface SetDataIn extends TableData {
  withActions: boolean
}



export interface SetDataOut {
  _headers: TableHeaderData[]
  _data: TableRowData[]
  _isUserIndexRow: number|undefined
}

export const setData = <T extends SetDataIn>({ headers, data, withActions }:T):SetDataOut => {
  const headerKeys = headers.map(({ name, id }) => id || camelize(name))
  const res = data.reduce((acc: SetDataOut, _row: TableRowData, i: number) => {
    const { _isUser, ...row } = _row
    acc._data = [
      ...acc._data,
      sortRow({ row, withActions, headerKeys })
    ]
    if (_isUser) acc._isUserIndexRow = i
    return acc
  }, {
    _headers: [...headers, ...[...withActions ? [{ name: ' ' }] : []]],
    _data: [],
    _isUserIndexRow: undefined
  })
  return res as SetDataOut
}

interface SortRowIn { 
  row: TableRowData, 
  withActions?: boolean, 
  headerKeys: string[]
}

type Action = {
  icon: ReactElement
  label: string
  onClick: <T>(param?: T) => any
  color?: string
}

const sortRow = <T extends SortRowIn>({ row, withActions = false, headerKeys }:T):TableRowData => {
  let newRow: TableRowData = {}
  for (const key of headerKeys) newRow[key] = row[key]
  const actions: Action[] = row.actions || []
  return {
    ...newRow,
    ...withActions && { actions: !actions.length
      ? <></>
      : actions.length > 1
        ? <ActionsMenu actions={actions} />
        : <Actions actions={actions} />
    }
  }
}

type ActionProps = {
  actions: Action[]
}

const Actions = React.memo((props: ActionProps) => {
  const { actions } = props
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('xs'))
  return isSmallScreen
    ? <ActionTooltips actions={actions} />
    : <ActionButtons actions={actions} />
})

const ActionButtons = React.memo((props: ActionProps) => {
  const { actions } = props
  return (
    <Grid container spacing={3} justify='flex-end'>
      {actions.map(action => {
        const { onClick, label, icon } = action
        return (
          <Grid item key={`${uniqueId('action-')}`} >
            <Button
              style={{ minWidth: 'max-content' }}
              variant='outlined'
              color='primary'
              onClick={onClick}>
              {icon && React.cloneElement(icon, { style: { marginRight: '1em', fontSize: '1em' } })}
              {label}
            </Button>
          </Grid>
        )
      })}
    </Grid>
  )
})

const ActionTooltips = React.memo((props: ActionProps) => {
  const { actions } = props
  return (
    <Grid container spacing={3} justify='flex-end'>
      {actions.map(action => {
        const { onClick, label, icon } = action
        const handleClick = e => {
          e.stopPropagation()
          onClick()
        }
        return (
          <Grid item key={`${uniqueId('action-')}`} >
            <Tooltip title={label}>
              <IconButton onClick={handleClick} aria-label={label}>
                {icon}
              </IconButton>
            </Tooltip>
          </Grid>
        )
      })}
    </Grid>
  )
})

const ActionsMenu= React.memo((props: ActionProps) => {
  const { actions } = props
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState(null)
  const handleClick = useCallback(
    e => {
      e.stopPropagation()
      setAnchorEl(e.currentTarget)
    }, [])
  const handleClose = useCallback(
    (e?: any) => {
      if (e) e.stopPropagation()
      setAnchorEl(null)
    }, [])

  return (
    <>
      <Tooltip title='Open menu'>
        <IconButton
          onClick={handleClick}
          aria-haspopup='true'
          aria-label='open menu'>
          <MoreVertOutlinedIcon />
        </IconButton>
      </Tooltip>
      <Menu
        classes={{
          list: classes.menu
        }}
        id={uniqueId('actions-menu-')}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={handleClose}
        getContentAnchorEl={null}
      >
        {actions.map(action => {
          const { onClick, label, icon, color } = action
          const handleClickAction = e => {
            e.stopPropagation()
            onClick()
            handleClose()
          }
          return <MenuItem
            {...color && { style: { color } }}
            key={uniqueId('action-')}
            onClick={handleClickAction}>
            {icon && React.cloneElement(icon, { style: { marginRight: '1em', fontSize: '1em' } })}
            {label}
          </MenuItem>
        })}
      </Menu>
        </>
  )
})

type MobileRowCellProps = {
  row: TableRowData
  mainHeaders: TableHeaderData[]
  withActions?: boolean
  _headers: TableHeaderData[]
}

type mainRowType = {
  name?: any
  component?: ReactNode
  style?: any
}

export const MobileRowCell = React.memo((props: MobileRowCellProps) => {
  const { row, mainHeaders, withActions, _headers } = props
  const classes = useStyles()
  const [open, setOpen] = useState(false)

  const toggleOpen = useCallback(
    e => {
      e.stopPropagation()
      setOpen(state => !state)
    }, [])

  const { mainRow, mainName } = useMemo((): { mainRow: mainRowType[], mainName: string } => {
    const first = mainHeaders[0]
    const mainName = camelize(first.id || first.name)
    return {
      mainRow: [
        { name: row[mainName] },
        ...[...withActions
          ? row.actions
            ? [{ component: row.actions }]
              : [{ name: ' ' }]
          : []]
      ],
      mainName
    }
  }, [row, mainHeaders, withActions])

  return (
    <>
      <TableRow className={classes.mainMobileRow} onClick={toggleOpen}>
        {mainRow.map((cell, i) => {
          const { style = {}, name, component } = cell
          return <TableCell
            key={`mobileCell-${i}`}
            style={style}
            align={i === 0 ? 'left' : 'right'}
          >
            {component || <div style={{ display: 'flex', alignItems: 'center' }}>
              <IconButton aria-label='expand row' onClick={toggleOpen}>
                <ExpandMoreRoundedIcon style={{
                  transform: open ? 'rotateZ(180deg)' : 'rotateZ(0)',
                  transition: 'transform .5s ease'
                }} />
              </IconButton>
              {name}
            </div>}
          </TableCell>
        })}
      </TableRow>
      <TableRow className={classes.collapsableMobileRow}>
        <TableCell className={classes.collapsableMobileRowCell} colSpan={withActions ? 2 : 1}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Grid container spacing={2} style={{ marginBottom: '1em', paddingLeft: 16 }}>
              {Object.entries(cleanDeep(row, { cleanValues: ['-', '', ' '] })).filter(([key, val]) => key !== mainName).map(([key, val], i) => {
                const found = _headers.find(({ name, id }) => (id || name) && camelize(id || name) === key)
                return key === 'actions'
                  ? <Fragment key={`el-${key}-${uniqueId()}-${i}`} />
                  : <TypographyLabel key={`el-${key}-${uniqueId()}-${i}`} label={found.name} value={get(val, 'props.stringData', val) || '-'} {...get(val, 'props.typoGraphyLabelPropsForward', {})} sm={6} />
              })}
            </Grid>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )
})
