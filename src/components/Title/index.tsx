import React from 'react'
import Typography from '@material-ui/core/Typography'
import { useConfigStore } from '@_zustand/config'

const Title = () => {
  const { pageTitle } = useConfigStore(state => ({
    pageTitle: state.pageTitle
  }))

  return (
    <Typography component='h2' variant='h6' color='primary' gutterBottom>
      {pageTitle}
    </Typography>
  )
}

export default React.memo(Title)
