import { Button, Grid, Typography } from '@material-ui/core'
import { FormikEssentials } from '@_components/FormikInput'
import ZenDialog from '@_components/ZenDialog'
import React, { useCallback, useState } from 'react'
import KeyboardBackspaceRoundedIcon from '@material-ui/icons/KeyboardBackspaceRounded'
import { ZenPalette } from '@_palette'

type ResetStepperBtnProps = {
  onClick?: VoidFunction
  onReset?: VoidFunction
  formik: FormikEssentials
}

const ResetStepperBtn: React.FC<ResetStepperBtnProps> = props=> {
  const { onClick, onReset, formik } = props
  const [openDialog, setOpenDialog] = useState(false)

  const handleClick = useCallback((force?: boolean) => () => {
    if(!force) setOpenDialog(true)
    else {
      if(onReset) onReset()
      if(onClick) onClick()
    }
  }, [onClick, onReset])

  return (
    <>
    <Button disabled={formik.isSubmitting} onClick={handleClick()} startIcon={<KeyboardBackspaceRoundedIcon />} variant='outlined' >
      Cancel
    </Button>
    <ZenDialog
      open={openDialog}
      fullScreen={false}
      title='Attention!'
      content={<Typography>If you continue this player will not be created, proceed and cancel?</Typography>}
      onClose={() => setOpenDialog(false)}
      actions={<Grid container justify='flex-end'>
          <Grid item>
            <Button onClick={handleClick(true)} variant='outlined' style={{ color: ZenPalette.error, borderColor: ZenPalette.error }}>proceed</Button>
          </Grid>
      </Grid>}
    />
    </>
  )
}

export default React.memo(ResetStepperBtn)