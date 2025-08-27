import React from 'react'
import { Grid, Button } from '@mui/material'
import FormikInput, { FormikEssentials } from '..'
import { get } from 'lodash'
import zenToolbox from '@_utils/toolbox'

const scoreProperties = {
   pace: [
      'speed',
      'stamina'
   ],
   shooting: [
      'finishing',
      'shotPower',
      'longShots'
   ],
   passing: [
      'vision',
      'shortPassing',
      'longPassing'
   ],
   technique: [
      'agility',
      'ballControl',
      'dribbling'
   ],
   defense: [
      'interception',
      'defensiveAwareness',
      'versus'
   ],
   physical: [
      'strength'
   ]
}

type ContentProps = {
   name: string
   formikName: string
   formik: FormikEssentials
}

export const SlidersDialogContent = React.memo((props: ContentProps) => {
   const { name, formikName, formik } = props

   return <Grid container>
      {get(scoreProperties, name, []).map((field, i) => (
         <FormikInput
            sm={12}
            key={`${field}-formik-${i}-${name}`}
            type='slider'
            name={`${formikName}.${name}.${field}`}
            label={zenToolbox.decamelize(field)}
            {...formik}
         />
      ))}
   </Grid>
})

type ActionsProps = {
   cancelChanges: VoidFunction
   confirmChanges: VoidFunction
}

export const SlidersDialogActions = React.memo((props: ActionsProps) => {
   const { cancelChanges, confirmChanges } = props

   return <Grid container justify='flex-end'>
      <Grid item>
         <Button
            style={{ marginRight: '1em' }}
            variant='outlined'
            color='primary'
            onClick={cancelChanges}>
            Cancel
      </Button>
      </Grid>
      <Grid item>
         <Button
            variant='contained'
            color='primary'
            onClick={confirmChanges}>
            Confirm
      </Button>
      </Grid>
   </Grid>
})
