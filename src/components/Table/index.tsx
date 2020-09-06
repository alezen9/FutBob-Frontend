import React, { useState, useMemo, useEffect, ReactNode } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import CondexoTableCell from './Cell'
import { uniqueId } from 'lodash'
import { setData, MobileRowCell, TableHeaderData, TableRowData, SetDataOut } from './helpers'
import CondexoLoadingMask from '../ContentLoader/LoadingMask'
import { Typography, useTheme, useMediaQuery } from '@material-ui/core'
import { camelize } from '../../utils/helpers'
import { FutBobPalette } from '../../../palette'

const useStyles = makeStyles(theme => ({
  table: {
    transition: 'background-color .3s ease'
  },
  tableContainer: {
    [theme.breakpoints.down('xs')]: {
      width: '100vw',
      margin: '0 -1em',
      overflowX: 'hidden'
    }
  },
  userRow: {
    backgroundColor: FutBobPalette.userTableRowBackgroundColor
  }
}))

type TableProps = {
  headers: TableHeaderData[],
  data: TableRowData[],
  withActions?: boolean,
  pagination?: ReactNode,
  forceMobile?: boolean
}

const FutBobTable: React.FC<TableProps> = React.memo(props => {
  const { headers = [], data = [], withActions = false, pagination, forceMobile = false } = props
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('xs'))
  const classes = useStyles()
  const [tableId] = useState(uniqueId('table-'))

  const { _headers = [], _data = [], _isUserIndexRow } = useMemo(():SetDataOut => {
    if (!headers.length) {
      return {
        _headers: [],
        _data: [],
        _isUserIndexRow: undefined
      }
    }
    return setData({ headers, data, withActions })
  }, [headers, data, withActions])

  const mainHeaders = useMemo(() => {
    if (!_headers.length) return null
    const main = _headers.find(({ main }) => main)
    return [
      main || _headers[0],
      ...[...withActions ? [{ name: ' ' }] : []]
    ]
  }, [_headers, withActions])

  return (
        <>
          <TableContainer className={classes.tableContainer} component={Paper} elevation={0}>
            <Table className={classes.table} aria-label='table'>
              <TableHead>
                <TableRow>
                  {forceMobile || isSmallScreen
                    ? mainHeaders
                      ? mainHeaders.map((cell, i) => (
                        <CondexoTableCell
                          key={`${tableId}-headerCell-${i}`}
                          align={i !== 0 ? 'right' : 'left'}
                          {...cell} />
                      ))
                      : <></>
                    : _headers.map((cell, i) => (
                      <CondexoTableCell
                        key={`${tableId}-headerCell-${i}`}
                        align={i !== 0 ? 'right' : 'left'}
                        {...cell} />
                    ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {_data.length
                  ? _data.map((row, i) => {
                    return (forceMobile || isSmallScreen) && headers.length > 1
                      ? <MobileRowCell
                        key={`${tableId}-bodyCell-${i}`}
                        row={row}
                        _headers={_headers}
                        mainHeaders={mainHeaders}
                        withActions={withActions}
                      />
                      : <TableRow key={`${tableId}row-${i}`} {..._isUserIndexRow === i && { className: classes.userRow }}>
                        {Object.entries(row).map(([key, value], j) => {
                          const found = key === 'actions'
                            ? undefined
                            : headers.find(({ name, id }) => camelize(id || name) === camelize(key))
                          return <CondexoTableCell
                            {...found && found.style && { headerStyles: found.style }}
                            key={`${tableId}-bodyCell-${i}-${j}`}
                            align={j !== 0 ? 'right' : 'left'}
                            {...key === 'actions'
                              ? { name: value }
                              : { component: value }}
                          />
                        })}
                      </TableRow>
                  })
                  : <TableRow>
                    <CondexoTableCell component={<Typography>Nessun dato</Typography>} />
                  </TableRow>}
              </TableBody>
            </Table>
          </TableContainer>
          {pagination || <></>}
    </>
  )
})

type WrapperProps = TableProps & {
  withMask?: boolean,
  isFetching?: boolean
}

const WrapperTable: React.FC<WrapperProps> = props => {
  const { withMask = false, isFetching = false } = props
  const [isFirstRun, setIsFirstRun] = useState(true)

  useEffect(() => {
    let mounted = true
    if (isFirstRun && !isFetching && mounted) setIsFirstRun(false)
    return () => {
      mounted = false
    }
  }, [isFirstRun, isFetching])

  return withMask
    ? <>
      <CondexoLoadingMask isLoading={isFetching}>
        <FutBobTable {...props} />
      </CondexoLoadingMask>
      </>
    : <FutBobTable {...props} />
}

export default React.memo(WrapperTable)
