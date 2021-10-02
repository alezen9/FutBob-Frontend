import { Button, Grid, Typography } from '@mui/material'
import { FormikEssentials } from '@_components/FormikInput'
import ZenDialog from '@_components/ZenDialog'
import React, { useCallback, useState } from 'react'
import KeyboardBackspaceRoundedIcon from '@mui/icons-material/KeyboardBackspaceRounded'
import { ZenPalette } from '@_MUITheme'
import ClearRoundedIcon from '@mui/icons-material/ClearRounded'
import DetailsRoundedIcon from '@mui/icons-material/DetailsRounded'
import { routesPaths } from '@_utils/routes'
import { ZenRouteID } from '@_utils/routes/types'
import { useRouter } from 'next/router'

type ResetStepperBtnProps = {
   reset?: VoidFunction
   onReset?: VoidFunction
   onBack?: VoidFunction
   formik: FormikEssentials
   playerID: string | null
}

const resetStyle = {
   color: ZenPalette.error,
   borderColor: ZenPalette.error
}

const ResetStepperBtn: React.FC<ResetStepperBtnProps> = props => {
   const { reset, onReset, onBack, formik, playerID } = props
   const [openDialog, setOpenDialog] = useState(false)
   const router = useRouter()

   const handleClick = useCallback((force?: boolean) => () => {
      if (force || playerID) {
         if (onReset) onReset()
         if (reset) reset()
      } else {
         setOpenDialog(true)
      }
   }, [reset, onReset, playerID])

   const goToPlayerDetail = useCallback(() => {
      router.push(routesPaths[ZenRouteID.PLAYER_DETAIL].path, routesPaths[ZenRouteID.PLAYER_DETAIL].as({ _id: playerID }))
   }, [playerID])

   return (
      <>
         {onBack && !playerID && <Button disabled={formik.isSubmitting} onClick={onBack} startIcon={<KeyboardBackspaceRoundedIcon />} variant='outlined' >
            Back
         </Button>}
         {playerID && <Button onClick={goToPlayerDetail} startIcon={<DetailsRoundedIcon />} variant='contained' color='primary' >
            Detail
         </Button>}
         <Button disabled={formik.isSubmitting} onClick={handleClick()} startIcon={<ClearRoundedIcon />} variant='outlined' style={{ marginLeft: '1em', ...onBack && !playerID && resetStyle }} >
            {playerID ? 'New player' : 'Cancel'}
         </Button>
         <ZenDialog
            open={openDialog}
            fullScreen={false}
            title='Attention!'
            content={<Typography>If you continue this player will not be created, proceed and cancel?</Typography>}
            onClose={() => setOpenDialog(false)}
            actions={<Grid container justify='flex-end'>
               <Grid item>
                  <Button onClick={handleClick(true)} variant='outlined' style={{ color: ZenPalette.error, borderColor: ZenPalette.error }}>Proceed</Button>
               </Grid>
            </Grid>}
         />
      </>
   )
}

export default React.memo(ResetStepperBtn)