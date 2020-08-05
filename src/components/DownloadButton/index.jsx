import React from 'react'
import GetAppRoundedIcon from '@material-ui/icons/GetAppRounded'
import { Button, IconButton, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  btn: {
    color: '#fff',
    borderColor: '#fff',
    marginLeft: '1em'
  },
  iconBtn: {
    color: '#fff',
    marginLeft: '1em',
    fontSize: '.9em'
  }
}))

const DownloadButton = props => {
  const { variant = 'standard', fileName = 'backoffice-file.pdf', url } = props
  const classes = useStyles()
  return <>
    <a
      style={{ all: 'unset' }}
      href={url}
      download={fileName}>
      {variant === 'standard'
        ? <Button className={classes.btn} variant='outlined' size='small' >Scarica</Button>
        : <IconButton size='small' className={classes.iconBtn}>
          <GetAppRoundedIcon />
        </IconButton>}
    </a>
    </>
}

export default React.memo(DownloadButton)
