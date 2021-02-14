import React, { useCallback } from 'react'
import Typography from '@material-ui/core/Typography'
import { useConfigStore } from '@_zustand/config'
import { Button } from '@material-ui/core'
import { useRouter } from 'next/router'
import NavigateBeforeRoundedIcon from '@material-ui/icons/NavigateBeforeRounded'
import { ZenPalette } from '@_palette'

const Title = () => {
  const { pageTitle, activeRoute } = useConfigStore(state => ({
    pageTitle: state.pageTitle,
    activeRoute: state.activeRoute
  }))
  const router = useRouter()

  const goBack = useCallback(() => {
    router.back()
  }, [])

  return (
    <Typography component='h2' variant='h6' color='primary' gutterBottom>
      {activeRoute.displayBack && <Button
        style={{ color: ZenPalette.typographyGrey, minWidth: 30, marginRight: '.5em' }}
        variant='text'
        onClick={goBack} >
        <NavigateBeforeRoundedIcon style={{ color: ZenPalette.typographyGrey, fontSize: '1.2em' }} />
      </Button>}
      {pageTitle}
    </Typography>
  )
}

export default React.memo(Title)
