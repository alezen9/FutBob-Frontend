import React from 'react'
import { Grid, Button } from '@material-ui/core'
import FormikInput, { FormikEssentials } from '..'
import { get } from 'lodash'
import { zenToolboxInstance } from '@_utils/Toolbox'

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
  formik: FormikEssentials
}

export const SlidersDialogContent = React.memo((props: ContentProps) => {
  const { name, formik } = props

  return <Grid container>
    {get(scoreProperties, name, []).map((field, i) => (
      <FormikInput
        sm={12}
        key={`${field}-formik-${i}-${name}`}
        type='slider'
        name={`score.${name}.${field}`}
        label={zenToolboxInstance.decamelize(field)}
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
