import React, { useMemo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Pagination from '@material-ui/lab/Pagination'
import { Typography } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'baseline',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      alignItems: 'flex-end'
    },
    '& > *': {
      marginTop: theme.spacing(2)
    }
  },
  total: {
    marginRight: 'auto',
    width: 'auto',
    [theme.breakpoints.down('xs')]: {
      marginRight: 'unset'
    }
  }
}))

type Props = {
  totalCount: number
  currentPage: number
  onChangePage: (e: any, newPage: number) => void
}

const CondexoPagination = (props: Props) => {
  const { totalCount = 20, currentPage = 1, onChangePage } = props
  const classes = useStyles()

  const count = useMemo(() => Math.ceil(totalCount / 20), [totalCount])

  return (
    <div className={classes.root}>
      <Typography variant='caption' className={classes.total}>Totale elementi: {totalCount}</Typography>
      <Pagination
        count={count}
        siblingCount={1}
        page={currentPage}
        boundaryCount={1}
        onChange={onChangePage}
        shape='rounded'
        variant='outlined'
        color='primary' />
    </div>
  )
}

export default React.memo(CondexoPagination)
